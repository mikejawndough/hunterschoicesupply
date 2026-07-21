// api/generate-welcome-discount.js
// Serverless Function Handler for Shopify Admin API Discount Code Generation & Customer Metafield Setup
// Includes 2-Step Split Execution Flow to eliminate Shopify Flow Welcome Email race conditions.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { email, firstName, lastName, birthday } = req.body || {};
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Valid email address required.' });
  }

  const shopDomain = process.env.SHOPIFY_STORE_DOMAIN || 'hunterschoicesupply.myshopify.com';
  const adminApiToken = process.env.SHOPIFY_ADMIN_API_SECRET_TOKEN || process.env.SHOPIFY_ADMIN_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION || '2023-10';

  if (!adminApiToken) {
    return res.status(500).json({ success: false, error: 'SHOPIFY_ADMIN_API_SECRET_TOKEN environment variable is missing.' });
  }

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function shopifyAdminGql(query, variables = {}) {
    const response = await fetch(`https://${shopDomain}/admin/api/${apiVersion}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminApiToken
      },
      body: JSON.stringify({ query, variables })
    });
    return response.json();
  }

  try {
    // Generate Supernatural lore-themed discount codes (e.g. IMPALA-7K9P, BUNKER-4M8T, WAYWARD-3X9L)
    const prefixes = ["IMPALA", "HUNTER", "BUNKER", "WAYWARD", "DEVILSTRAP"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
    const discountCode = `${randomPrefix}-${randomChars}`;

    // STEP A: Create 10% Off Basic Discount Code (combines with product & shipping discounts)
    const discountMutation = `
      mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
        discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
          codeDiscountNode {
            id
            codeDiscount {
              ... on DiscountCodeBasic {
                title
                codes(first: 1) {
                  nodes {
                    code
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const discountVariables = {
      basicCodeDiscount: {
        title: `Welcome 10% Off - ${discountCode}`,
        code: discountCode,
        startsAt: new Date().toISOString(),
        customerSelection: {
          all: true
        },
        customerGets: {
          value: {
            percentage: 0.10
          },
          items: {
            all: true
          }
        },
        appliesOncePerCustomer: true,
        combinesWith: {
          productDiscounts: true,
          shippingDiscounts: true,
          orderDiscounts: false
        }
      }
    };

    const discountRes = await shopifyAdminGql(discountMutation, discountVariables);
    if (discountRes.errors) {
      console.warn("Shopify Admin Discount warning:", discountRes.errors);
    }

    // Compile tags & metafields for customer input
    const tags = ["newsletter", "welcome_discount"];
    if (birthday) {
      tags.push(`birthday:${birthday}`);
    }

    const metafields = [
      {
        namespace: "custom",
        key: "welcome_discount_code",
        type: "single_line_text_field",
        value: discountCode
      }
    ];

    if (birthday) {
      metafields.push({
        namespace: "custom",
        key: "birthday",
        type: "date",
        value: birthday
      });
    }

    // STEP 1: FIRST API CALL - Create or Update Customer Profile with Metafields and NOT_SUBSCRIBED consent
    const customerMutation = `
      mutation customerCreate($input: CustomerInput!) {
        customerCreate(input: $input) {
          customer {
            id
            email
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    const customerVariables = {
      input: {
        email: email.trim().toLowerCase(),
        firstName: firstName ? firstName.trim() : undefined,
        lastName: lastName ? lastName.trim() : undefined,
        emailMarketingConsent: {
          marketingState: "NOT_SUBSCRIBED"
        },
        tags: tags,
        metafields: metafields
      }
    };

    let customerGid = null;
    const customerRes = await shopifyAdminGql(customerMutation, customerVariables);

    if (customerRes.data?.customerCreate?.customer?.id) {
      customerGid = customerRes.data.customerCreate.customer.id;
    } else {
      // Fallback: If customer profile already exists in Shopify, query ID by email and update
      const findCustomerQuery = `
        query findCustomer($query: String!) {
          customers(first: 1, query: $query) {
            edges {
              node {
                id
              }
            }
          }
        }
      `;
      const findRes = await shopifyAdminGql(findCustomerQuery, { query: `email:${email.trim().toLowerCase()}` });
      customerGid = findRes.data?.customers?.edges[0]?.node?.id || null;

      if (customerGid) {
        // Update first name, last name, and tags on existing profile
        const customerUpdateMutation = `
          mutation customerUpdate($input: CustomerInput!) {
            customerUpdate(input: $input) {
              customer {
                id
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        const updateCustomerVars = {
          input: {
            id: customerGid,
            firstName: firstName ? firstName.trim() : undefined,
            lastName: lastName ? lastName.trim() : undefined,
            tags: tags
          }
        };
        await shopifyAdminGql(customerUpdateMutation, updateCustomerVars);

        // Update metafields (code + birthday)
        const metafieldsMutation = `
          mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
              metafields {
                id
              }
            }
          }
        `;

        const metafieldsPayload = [
          {
            ownerId: customerGid,
            namespace: "custom",
            key: "welcome_discount_code",
            type: "single_line_text_field",
            value: discountCode
          }
        ];

        if (birthday) {
          metafieldsPayload.push({
            ownerId: customerGid,
            namespace: "custom",
            key: "birthday",
            type: "date",
            value: birthday
          });
        }

        await shopifyAdminGql(metafieldsMutation, { metafields: metafieldsPayload });
      }
    }

    // STEP 2: DELAY - Pause for 1000ms to allow Shopify to index the metafields
    await delay(1000);

    // STEP 3: SECOND API CALL - Trigger Subscription by updating marketing state to SUBSCRIBED
    if (customerGid) {
      const updateConsentMutation = `
        mutation customerEmailMarketingConsentUpdate($input: CustomerEmailMarketingConsentUpdateInput!) {
          customerEmailMarketingConsentUpdate(input: $input) {
            customer {
              id
              emailMarketingConsent {
                marketingState
                consentUpdatedAt
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const updateConsentVariables = {
        input: {
          customerId: customerGid,
          emailMarketingConsent: {
            marketingState: "SUBSCRIBED",
            marketingOptInLevel: "SINGLE_OPT_IN",
            consentUpdatedAt: new Date().toISOString()
          }
        }
      };

      await shopifyAdminGql(updateConsentMutation, updateConsentVariables);
    }

    return res.status(200).json({
      success: true,
      discountCode: discountCode
    });

  } catch (error) {
    console.error("API generate-welcome-discount error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to generate welcome discount code."
    });
  }
}

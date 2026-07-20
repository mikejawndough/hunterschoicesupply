// api/generate-welcome-discount.js
// Serverless Function Handler for Shopify Admin API Discount Code Generation & Customer Metafield Setup
// Includes 2-Step Split Execution Flow to eliminate Shopify Flow Welcome Email race conditions.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { email } = req.body || {};
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
    // Generate unique short discount code (e.g. WELCOME-A8B9C)
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    const discountCode = `WELCOME-${randomChars}`;

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

    // STEP 1: FIRST API CALL - Create or Update Customer Profile with Metafield and NOT_SUBSCRIBED consent
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
        emailMarketingConsent: {
          marketingState: "NOT_SUBSCRIBED"
        },
        tags: ["newsletter", "welcome_discount"],
        metafields: [
          {
            namespace: "custom",
            key: "welcome_discount_code",
            type: "single_line_text_field",
            value: discountCode
          }
        ]
      }
    };

    let customerGid = null;
    const customerRes = await shopifyAdminGql(customerMutation, customerVariables);

    if (customerRes.data?.customerCreate?.customer?.id) {
      customerGid = customerRes.data.customerCreate.customer.id;
    } else {
      // Fallback: If customer profile already exists in Shopify, query ID by email and update Metafield
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
        const metafieldsMutation = `
          mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
            metafieldsSet(metafields: $metafields) {
              metafields {
                id
              }
            }
          }
        `;
        await shopifyAdminGql(metafieldsMutation, {
          metafields: [
            {
              ownerId: customerGid,
              namespace: "custom",
              key: "welcome_discount_code",
              type: "single_line_text_field",
              value: discountCode
            }
          ]
        });
      }
    }

    // STEP 2: DELAY - Pause for 1000ms to allow Shopify to index the metafield
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

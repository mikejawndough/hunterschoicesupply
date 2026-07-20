// api/generate-welcome-discount.js
// Serverless Function Handler for Shopify Admin API Discount Code Generation & Customer Metafield Setup

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
    // Generate unique random code (e.g. HUNTER-A8B9C2)
    const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
    const discountCode = `HUNTER-${randomChars}`;

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

    // STEP B: Create or find Customer Profile with acceptsMarketing: true
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
        acceptsMarketing: true,
        tags: ["newsletter", "welcome_discount"]
      }
    };

    let customerGid = null;
    const customerRes = await shopifyAdminGql(customerMutation, customerVariables);

    if (customerRes.data?.customerCreate?.customer?.id) {
      customerGid = customerRes.data.customerCreate.customer.id;
    } else {
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
    }

    // STEP C: Set Metafield on Customer Profile (custom.welcome_discount_code)
    if (customerGid) {
      const metafieldsMutation = `
        mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
          metafieldsSet(metafields: $metafields) {
            metafields {
              id
              namespace
              key
              value
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const metafieldsVariables = {
        metafields: [
          {
            ownerId: customerGid,
            namespace: "custom",
            key: "welcome_discount_code",
            type: "single_line_text_field",
            value: discountCode
          }
        ]
      };

      await shopifyAdminGql(metafieldsMutation, metafieldsVariables);
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

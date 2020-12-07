import { authenticateShopifyAPI } from "@bluebeela/nextjs-shopify-auth";

const GRAPHQL_PATH_PREFIX = '/admin/api';

export default authenticateShopifyAPI(async function handler(req, res) {
  const {
    query,
    shopOrigin,
    shopifyToken,
  } = req;

  if (!shopOrigin || !shopifyToken) {
    res.statusCode = 403;
    res.end("Unauthorized");
    return;
  }

  const response = await fetch(`https://${shopOrigin}${GRAPHQL_PATH_PREFIX}/${query.version}/graphql.json`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyToken
    },
    body: JSON.stringify(req.body),
    redirect: 'follow'
  })
  const data = await response.json()
  res.json(data)
});

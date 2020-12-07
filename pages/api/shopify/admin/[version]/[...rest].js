import { authenticateShopifyAPI } from "@bluebeela/nextjs-shopify-auth";

const REST_PATH_PREFIX = '/admin/api';

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

  const search = new URL(`${process.env.HOST}${req.url}`).search

  const options = {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': shopifyToken
    },
    redirect: 'follow'
  }
  if (req.body) {
    options.body = JSON.stringify(req.body)
  }

  const response = await fetch(`https://${shopOrigin}${REST_PATH_PREFIX}/${query.version}/${query.rest.join("/")}.json?${search}`, options)
  const data = await response.json()
  res.json(data)
});

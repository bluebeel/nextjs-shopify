import { authenticateShopifyAPI } from "@bluebeela/nextjs-shopify-auth";
import { registerWebhook } from "../../../lib/shopify";

export default authenticateShopifyAPI(async function handler(req, res) {
  const { shopOrigin, shopifyToken } = req;
  const callbackUrlPathPrefix = "/api/shopify/webhook";

  await registerWebhook(
    shopOrigin,
    shopifyToken,
    "app/uninstalled",
    callbackUrlPathPrefix
  );

  await registerWebhook(
    shopOrigin,
    shopifyToken,
    "carts/create",
    callbackUrlPathPrefix
  );

  await registerWebhook(
    shopOrigin,
    shopifyToken,
    "carts/update",
    callbackUrlPathPrefix
  );

  await registerWebhook(
    shopOrigin,
    shopifyToken,
    "checkouts/create",
    callbackUrlPathPrefix
  );

  await registerWebhook(
    shopOrigin,
    shopifyToken,
    "checkouts/update",
    callbackUrlPathPrefix
  );

  await registerWebhook(
    shopOrigin,
    shopifyToken,
    "orders/paid",
    callbackUrlPathPrefix
  );

  res.status(200).end();
});

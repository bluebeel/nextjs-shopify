import { authenticateShopifyAPI } from "@bluebeela/nextjs-shopify-auth";

export default authenticateShopifyAPI(async function helloWorld(req, res) {
  console.log("running main function: log in")
  return await res.json({ hello: "world" });
});

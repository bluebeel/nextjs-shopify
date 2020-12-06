import {
  verifyRequest
} from "@bluebeela/nextjs-shopify-auth";

export default async function helloWorld(req, res) {
  const authRoute = "/api/shopify/auth";
  const fallbackRoute = "/login";
  const verifyTokenUrl = `${process.env.HOST}/api/shopify/verify-token`;

  await verifyRequest({ query: req.query, cookies: req.cookies, res, options: { authRoute, fallbackRoute, verifyTokenUrl } });
}

import shopify from "../../../../lib/shopify";

export default async function shopifyAuthInline(req, res) {
  const { oAuthStart } = shopify;

  await oAuthStart(req, res);
}

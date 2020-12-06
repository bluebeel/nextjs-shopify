import shopify from "../../../../lib/shopify";

export default async function shopifyAuthCallback(req, res) {
	const { oAuthCallback } = shopify;

	await oAuthCallback(req, res);
}
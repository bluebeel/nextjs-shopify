import shopify from "../../../../lib/shopify";

export default async function shopifyAuthEnableCookies(req, res) {
	const { enableCookies } = shopify;

	await enableCookies(req, res);
}
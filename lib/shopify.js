import createShopifyAuth from "@bluebeela/nextjs-shopify-auth";
import { serialize } from 'cookie';

const shopifyAuthOptions = {
    // your shopify app api key
	apiKey: process.env.SHOPIFY_API_KEY,
    // your shopify app secret
	secret: process.env.SHOPIFY_API_SECRET,
    // your app url
	appUrl: process.env.HOST,
    // if specified, mounts the routes off of the given path
    // eg. /api/shopify/auth, /api/shopify/auth/callback
    // defaults to ""
	prefix: "/api/shopify",
    // scopes to request on the merchants store
	scopes: ["read_products", "write_products"],
    // set access mode, default is "online"
    accessMode: "online",
    // callback for when auth is completed
	async afterAuth({ shopOrigin, shopifyToken, shopifyAssociatedUser, res }) {
		console.log(`We're authenticated on shop ${shopOrigin}: ${shopifyToken} with user ${JSON.stringify(shopifyAssociatedUser)}`);

		res.setHeader('Set-Cookie', serialize("shopOrigin", shopOrigin, {
			httpOnly: false,
			secure: true,
			sameSite: "none",
			path: "/"
		}));
		res.writeHead(302, { Location: `/` });
		res.end();
	},
};

const shopify = createShopifyAuth(shopifyAuthOptions);

export default shopify;

import createShopifyAuth from "@bluebeela/nextjs-shopify-auth";

export const ApiVersion = {
  July19: "2019-07",
  October19: "2019-10",
  January20: "2020-01",
  April20: "2020-04",
  July20: "2020-07",
  October20: "2020-10",
  January21: "2021-01",
  April21: "2021-04",
  Unstable: "unstable",
  Unversioned: "unversioned",
};

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
  async afterAuth({
    shopOrigin,
    shopifyToken,
    shopifyAssociatedUser,
    req,
    res,
  }) {
    console.log(
      `We're authenticated on shop ${shopOrigin}: ${shopifyToken} with user ${JSON.stringify(
        shopifyAssociatedUser
      )}`
    );
    res.writeHead(302, { Location: `/` });
    res.end();
  },
};

const shopify = createShopifyAuth(shopifyAuthOptions);

export default shopify;

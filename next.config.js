const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  env: {
    API_KEY: process.env.SHOPIFY_API_KEY,
    HOST: process.env.HOST,
  },
});

module.exports = {
  env: {
    API_KEY: process.env.SHOPIFY_API_KEY,
    HOST: process.env.HOST,
  },

  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/api/shopify/auth",

        // Set this to true if you're sure you'll never use the /auth page (beware, permanent redirects as they are difficult to invalidate in clients)
        permanent: false,
      },
    ];
  },
};

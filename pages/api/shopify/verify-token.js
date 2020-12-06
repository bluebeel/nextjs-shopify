export default async function verifyToken(req, res) {
  const { shopOrigin, shopifyToken } = req.cookies;

  const response = await fetch(
      `https://${shopOrigin}/admin/metafields.json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": shopifyToken,
        },
      },
  );
  res.status(response.status).end();
}

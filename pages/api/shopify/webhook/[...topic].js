import crypto from "crypto";

const isVerifiedWebhookRequest = (req) => {
  const expectedHash = req.headers["x-shopify-hmac-sha256"];
  const actualHash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(JSON.stringify(req.body))
    .digest("base64");

  return expectedHash === actualHash;
};

export default async function webhooks(req, res) {
  const { query } = req;
  const topic = query.topic.join("/");

  if (!isVerifiedWebhookRequest(req)) {
    console.log(`Ignoring UNVERIFIED Shopify webhook ${topic}`);
    res.status(400).end();
    return;
  }

  console.log(`Received Shopify webhook ${topic}`, req.body);
  res.status(200).end();
}

import crypto from "crypto";

// Disable default NextJS parsing of JSON body so we can calculate HMAC from
// raw body bytes for verification.
// See https://nextjs.org/docs/api-routes/api-middlewares#custom-config
export const config = {
  api: {
    bodyParser: false,
  },
};

const isVerifiedWebhookRequest = (req) => {
  const expectedHash = req.headers["x-shopify-hmac-sha256"];

  // A request without the expected HMAC header cannot be verified
  if (!expectedHash) {
    return false;
  }

  const actualHash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(req.rawBody)
    .digest("base64");

  return expectedHash === actualHash;
};

export default async function webhooks(req, res) {
  const { query } = req;
  const topic = query.topic.join("/");

  // Read raw bytes to a Buffer `rawBody` property for hash verification
  const chunks = [];
  for await (let chunk of req) {
    chunks.push(chunk);
  }
  req.rawBody = Buffer.concat(chunks);

  // Manually parse raw body data to JSON, to behave like a standard NextJS req
  req.body = JSON.parse(req.rawBody);

  if (!isVerifiedWebhookRequest(req)) {
    console.log(`Ignoring UNVERIFIED Shopify webhook ${topic}`);
    res.status(400).end();
    return;
  }

  console.log(`Received Shopify webhook ${topic}`, req.body);
  res.status(200).end();
}

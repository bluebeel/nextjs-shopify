import {
  hasCookieAccess,
  shouldPerformInlineOAuth,
  grantedStorageAccess,
} from "@bluebeela/nextjs-shopify-auth";
import shopify from "../../../../lib/shopify";

export default async function shopifyAuthIndex(req, res) {
  const {
    enableCookiesRedirect,
    oAuthStart,
    topLevelOAuthRedirect,
    requestStorageAccess,
  } = shopify;

  if (!hasCookieAccess(req.cookies)) {
    console.log("enabling cookie redirect");
    await enableCookiesRedirect(req, res);
    return;
  }

  if (!grantedStorageAccess(req.cookies)) {
    console.log("asking storage access");
    await requestStorageAccess(req, res);
    return;
  }

  if (shouldPerformInlineOAuth(req.cookies)) {
    console.log("performing inline oauth");
    await oAuthStart(req, res);
    return;
  }

  console.log("doing topLevelOauthRedirect");
  await topLevelOAuthRedirect(req, res);
}

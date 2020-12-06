import React from "react";
import { Heading, Page } from "@shopify/polaris";
import {parseCookies} from "nookies";
import {verifyRequest} from "@bluebeela/nextjs-shopify-auth";


const Index = () => (
  <Page>
    <Heading>Shopify app with Node and React 🎉</Heading>
  </Page>
);

export async function getServerSideProps(ctx) {
  const authRoute = "/api/shopify/auth";
  const fallbackRoute = "/login";
  const verifyTokenUrl = `${process.env.HOST}/api/shopify/verify-token`;
  const cookies = parseCookies(ctx);
  const shopOrigin = ctx.query.shop ?? cookies.shopOrigin;

  if (ctx.req.url.pathname !== fallbackRoute) {
    console.log("in")
    await verifyRequest({
      query: ctx.query,
      cookies,
      res: ctx.res,
      options: { authRoute, fallbackRoute, verifyTokenUrl },
    });
  }

  console.log("here")

  return {
    props: {
      shopOrigin
    }, // will be passed to the page component as props
  }
}

export default Index;

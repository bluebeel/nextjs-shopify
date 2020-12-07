import React, { useEffect, useState } from "react";
import { Page, Layout, EmptyState } from "@shopify/polaris";
import { authenticateShopifyPage } from "@bluebeela/nextjs-shopify-auth";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourceList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

const Index = () => {
  const [open, setOpen] = useState(false);

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id);
    setOpen(false)
    store.set('ids', idsFromResources);
  };

  // test protected api route with shopify
  useEffect(() => {
    const api = async () => {
      const res = await fetch("/api/hello-world");
      console.log(res);
    };
    api();
  }, []);

  // test protected api route with shopify and proxy of Shopify Admin API Rest
  useEffect(() => {
    const api = async () => {
      const res = await fetch("/api/shopify/admin/2020-10/products?limit=5");
      const data = await res.json()
      console.log(data);
    };
    api();
  }, []);

  const emptyState = !store.get('ids');

  return (
    <Page>
      <TitleBar
          title="NextJS Example App"
          primaryAction={{
          content: 'Select products',
          onAction: () => setOpen(true),
        }} />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => setOpen(false)}
        />
      {emptyState ? (
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: 'Select products',
                onAction: () => setOpen(true),
              }}
              image={img}
            >
              <p>Select products to change their price temporarily.</p>
            </EmptyState>
          </Layout>
        ) : (
            <ResourceListWithProducts />
          )}
    </Page>
  );
};

export const getServerSideProps = authenticateShopifyPage();

export default Index;

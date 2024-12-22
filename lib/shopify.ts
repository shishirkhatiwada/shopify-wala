import { GraphQLClient } from 'graphql-request';

// Types for Shopify API responses
export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
}

interface ProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
      cursor: string;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

const endpoint = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL || '';
const accessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': accessToken,
  },
});

const productsQuery = `
  query GetProducts($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export async function getProducts(first: number = 10, after?: string) {
  try {
    const data = await graphQLClient.request<ProductsResponse>(productsQuery, {
      first,
      after,
    });
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
# Shopify Storefront API Integration Challenge

This project involves integrating Shopify's Storefront API to fetch store data in a paginated form. The task assumes a Shopify store with 100 products, and the objective is to retrieve all these products in batches of 10 per API call.

## Live Demo
[Shopify Storefront App](https://shopify-wala.vercel.app/)

---

## Task Overview

1. **Setup Shopify Store:**
   - Create a Shopify store.
   - Log in to the Shopify admin dashboard.
   - Add products to the store (bulk create mock products using online tools and Shopify’s bulk upload feature).
   - Enable Storefront API for the store.

2. **Fetch Products:**
   - Use Shopify's Storefront API to retrieve products in a paginated manner.
   - Fetch 10 products per API call until all 100 products are retrieved.

3. **Build the Application:**
   - Create a TypeScript/JavaScript project using **Node.js**, **React**, or **Next.js**.
   - Implement the API calls and pagination logic.

---

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/shopify-api-integration.git
cd shopify-api-integration
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
SHOPIFY_STORE_URL="your-shopify-store.myshopify.com"
SHOPIFY_STOREFRONT_API_KEY="your-storefront-access-token"
```

> Replace `your-shopify-store.myshopify.com` with your Shopify store URL and `your-storefront-access-token` with the API key from your Shopify admin dashboard.

### Step 4: Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

---

## Implementation Details

1. **Enable Storefront API:**
   - In your Shopify admin dashboard, navigate to **Apps** > **Develop apps**.
   - Create a new app and configure the permissions to include access to the Storefront API.
   - Generate the Storefront API access token.

2. **Paginated API Calls:**
   - Use the following query to fetch products:

   ```graphql
   query getProducts($cursor: String) {
     products(first: 10, after: $cursor) {
       edges {
         cursor
         node {
           id
           title
           description
           images(first: 1) {
             edges {
               node {
                 src
               }
             }
           }
         }
       }
       pageInfo {
         hasNextPage
       }
     }
   }
   ```

   - Implement logic to handle pagination using the `pageInfo.hasNextPage` and `edges.cursor` values.

3. **Frontend Integration:**
   - Display the fetched products in a paginated UI.
   - Allow users to navigate through pages or scroll to load more products dynamically.

---

## Technologies Used

- **React/Next.js**: Frontend framework for building the UI.
- **TypeScript**: Strongly typed JavaScript for safer code.
- **GraphQL**: API query language used with the Storefront API.
- **Tailwind CSS**: Utility-first CSS framework for styling.

---

## Deployment

1. Push your code to a GitHub repository.
2. Deploy the application on [Vercel](https://vercel.com/) or a similar hosting platform.
3. Configure environment variables in the hosting platform.
4. Deploy and test the application.

---


# Ecommerce Insights

Ecommerce Insights is a backend analytics system built with Node.js, TypeScript, MongoDB, and GraphQL. It provides APIs for customer insights, sales analytics, and order history.

---

## Setup Instructions

1. Clone the project:

   `git clone https://github.com/Althaf0511/ecommerce-insights.git`  
   `cd ecommerce-insights`

2. Install dependencies:

   `npm install`

3. Create a `.env` file at the root of the project:

   cp .env.example .env

4. Edit the `.env` file with your MongoDB connection string.

---

## Run Commands

To start the server in development mode (auto-restarts with file changes):

   `npm run dev`

To run in production mode:

   `npm run start`

GraphQL playground will be available at:

   `http://localhost:4000/graphql`

---

## Data Import Guidelines

When importing JSON data for `customers`, `products`, or `orders`, follow these guidelines:

1. All `_id` values should be strings (not ObjectIds or numbers).

   Example for customers:

   {
     "_id": "cust-001",
     "name": "Alice",
     "email": "alice@example.com",
     "age": 28,
     "location": "NYC",
     "gender": "female"
   }

   Example for products:

   {
     "_id": "prod-001",
     "name": "Laptop",
     "category": "Electronics",
     "price": 799.99,
     "stock": 50
   }

2. For orders, the `products` field should be a proper JSON array, not a stringified JSON array.

   Incorrect:
   "products": "[{\"productId\": \"prod-001\", \"quantity\": 1}]"

   Correct:
   "products": [
     {
       "productId": "prod-001",
       "quantity": 1,
       "priceAtPurchase": 799.99
     }
   ]

---

## Environment Variables

These must be defined in your `.env` file:

   MONGO_URI=mongodb://localhost:27017/ecommerce  
   PORT=4000 (optional, defaults to 8080)

---

## Project Structure

src/  
├── config/              # Database connection  
├── models/              # Mongoose models  
├── resolvers/           # GraphQL resolvers  
├── mutations/           # GraphQL mutations  
├── schemas/             # GraphQL type definitions  
└── index.ts             # App entry point

---

## Notes

- Make sure MongoDB is running before starting the server.

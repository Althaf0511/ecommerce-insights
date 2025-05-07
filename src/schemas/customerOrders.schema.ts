import { gql } from "graphql-tag";

export default gql`
  type OrderProduct {
    productId: ID!
    quantity: Int!
    priceAtPurchase: Float!
  }

  type Order {
    _id: ID!
    customerId: ID!
    products: [OrderProduct!]!
    totalAmount: Float!
    orderDate: String!
    status: String!
  }

  extend type Query {
    getCustomerOrders(customerId: ID!, page: Int = 1, limit: Int = 10): [Order]
  }
`;

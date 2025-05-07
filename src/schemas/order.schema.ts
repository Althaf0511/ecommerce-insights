import { gql } from 'graphql-tag'

const orderSchema = gql`
  input OrderProductInput {
    productId: ID!
    quantity: Int!
  }

  input PlaceOrderInput {
    customerId: ID!
    products: [OrderProductInput!]!
  }

  type Order {
    _id: ID!
    customerId: ID!
    products: [OrderProduct!]!
    totalAmount: Float!
    orderDate: String!
    status: String!
  }

  type OrderProduct {
    productId: ID!
    quantity: Int!
    priceAtPurchase: Float!
  }

  extend type Mutation {
    placeOrder(input: PlaceOrderInput!): Order
  }
`;

export default orderSchema;

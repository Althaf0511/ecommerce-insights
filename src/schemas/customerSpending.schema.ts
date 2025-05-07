import { gql } from 'graphql-tag'

export default gql`
  type CustomerSpending {
    customerId: ID!
    totalSpent: Float!
    averageOrderValue: Float!
    lastOrderDate: String
  }

  extend type Query {
    getCustomerSpending(customerId: ID!): CustomerSpending
  }
`;

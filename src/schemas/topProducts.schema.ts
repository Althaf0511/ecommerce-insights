import { gql } from 'graphql-tag'

const topProductsSchema = gql`
  type TopProduct {
    productId: ID!
    name: String!
    totalSold: Int!
  }

  extend type Query {
    getTopSellingProducts(limit: Int!): [TopProduct]
  }
`;

export default topProductsSchema;

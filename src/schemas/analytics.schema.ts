import { gql } from 'graphql-tag'


export default gql`
  type CategoryRevenue {
    category: String
    revenue: Float!
  }

  type SalesAnalytics {
    totalRevenue: Float!
    completedOrders: Int!
    categoryBreakdown: [CategoryRevenue!]!
  }

  extend type Query {
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
  }
`;

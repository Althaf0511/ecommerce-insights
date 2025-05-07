import { gql } from 'graphql-tag'
import customerSpendingSchema from './customerSpending.schema';
import topProductsSchema from './topProducts.schema';
import analyticsSchema from './analytics.schema';
import orderSchema from './order.schema';
import customerOrdersSchema from './customerOrders.schema';

const baseTypeDefs = gql`
  type Query
  type Mutation
`;

const typeDefs = [
  baseTypeDefs,
  customerSpendingSchema,
  topProductsSchema,
  orderSchema,
  analyticsSchema,
  customerOrdersSchema
];

export default typeDefs;

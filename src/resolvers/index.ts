import customerSpendingResolver from './customerSpending.resolver';
import topProductsResolver from './topProducts.resolver';
import analyticsResolver from './analytics.resolver';
import customerOrdersResolver from './customerOrders.resolver';
import placeOrder from '../mutations/placeOrder.mutation';

const resolvers = {
  Query: {
    ...customerSpendingResolver.Query,
    ...topProductsResolver.Query,
    ...analyticsResolver.Query,
    ...customerOrdersResolver.Query,
  },
  Mutation: {
    placeOrder,
  },
};

export default resolvers;

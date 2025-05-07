import { IResolvers } from '@graphql-tools/utils';
import Order, { IOrder } from '../models/order.model';

interface GetCustomerOrdersArgs {
  customerId: string;
  page?: number;
  limit?: number;
}

const customerOrdersResolver: IResolvers = {
  Query: {
    getCustomerOrders: async (
      _: unknown,
      { customerId, page = 1, limit = 10 }: GetCustomerOrdersArgs
    ): Promise<IOrder[]> => {
      try {
        const skip = (page - 1) * limit;

        const orders: IOrder[] = await Order.find({ customerId })
          .sort({ orderDate: -1 })
          .skip(skip)
          .limit(limit);

        return orders;
      } catch (error) {
        console.error('Error fetching customer orders:', error);
        throw new Error('Failed to fetch customer orders');
      }
    },
  },
};

export default customerOrdersResolver;

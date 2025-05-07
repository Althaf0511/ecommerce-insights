import { IResolvers } from '@graphql-tools/utils';
import Order from '../models/order.model';

interface GetCustomerSpendingArgs {
  customerId: string;
}

interface CustomerSpendingResult {
  customerId: string;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: Date;
}

const customerSpendingResolver: IResolvers = {
  Query: {
    getCustomerSpending: async (
      _: unknown,
      { customerId }: GetCustomerSpendingArgs
    ): Promise<CustomerSpendingResult | null> => {
      console.log('Resolver hit: getCustomerSpending', customerId);

      const result = await Order.aggregate([
        { $match: { customerId, status: 'completed' } },
        {
          $group: {
            _id: '$customerId',
            totalSpent: { $sum: '$totalAmount' },
            averageOrderValue: { $avg: '$totalAmount' },
            lastOrderDate: { $max: '$orderDate' },
          },
        },
        {
          $project: {
            _id: 0,
            customerId: '$_id',
            totalSpent: 1,
            averageOrderValue: 1,
            lastOrderDate: 1,
          },
        },
      ]);

      return result[0] || null;
    },
  },
};

export default customerSpendingResolver;

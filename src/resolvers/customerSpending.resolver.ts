import { IResolvers } from "@graphql-tools/utils";
import Order from "../models/order.model";

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
      const result = await Order.aggregate([
        { $match: { customerId, status: "completed" } },
        {
          $group: {
            _id: "$customerId",
            totalSpent: { $sum: "$totalAmount" },
            averageOrderValue: { $avg: "$totalAmount" },
            lastOrderDate: { $max: "$orderDate" },
          },
        },
        {
          $project: {
            _id: 0,
            customerId: "$_id",
            totalSpent: 1,
            averageOrderValue: 1,
            lastOrderDate: 1,
          },
        },
      ]);

      //fallback object if no data found
      if (result.length === 0) {
        return {
          customerId,
          totalSpent: 0,
          averageOrderValue: 0,
          lastOrderDate: new Date(0),
        };
      }

      const data = result[0];
      return {
        customerId: data.customerId,
        totalSpent: parseFloat(data.totalSpent.toFixed(2)),
        averageOrderValue: parseFloat(data.averageOrderValue.toFixed(2)),
        lastOrderDate: data.lastOrderDate,
      };

    },
  },
};

export default customerSpendingResolver;

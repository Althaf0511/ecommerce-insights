import { IResolvers } from "@graphql-tools/utils";
import Order, { IOrder } from "../models/order.model";

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
        // Validate page and limit
        const safePage = Number.isInteger(page) && page > 0 ? page : 1;
        const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 10;

        const skip = (safePage - 1) * safeLimit;

        const orders: IOrder[] = await Order.find({ customerId })
          .sort({ orderDate: -1 })
          .skip(skip)
          .limit(safeLimit);

        // Format totalAmount to 2 decimal places
        const formattedOrders = orders.map((order) => ({
          ...order.toObject(),
          totalAmount: parseFloat(order.totalAmount.toFixed(2)),
        }));

        return formattedOrders;
      } catch (error) {
        console.error("Error fetching customer orders:", error);
        throw new Error("Failed to fetch customer orders");
      }
    },
  },
};

export default customerOrdersResolver;

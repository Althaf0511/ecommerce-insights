import { IResolvers } from "@graphql-tools/utils";
import Order from "../models/order.model";

//Input argument types
interface SalesAnalyticsArgs {
  startDate: string;
  endDate: string;
}

interface SalesAnalyticsResult {
  totalRevenue: number;
  completedOrders: number;
  categoryBreakdown: {
    category: string;
    revenue: number;
  }[];
  orderDate?: Date;
}

const analyticsResolver: IResolvers = {
  Query: {
    getSalesAnalytics: async (
      _: unknown,
      { startDate, endDate }: SalesAnalyticsArgs
    ): Promise<SalesAnalyticsResult> => {
      const start = new Date(startDate).toISOString();
      const end = new Date(endDate).toISOString();

      const salesData = await Order.aggregate([
        {
          $match: {
            orderDate: { $gte: start, $lte: end },
            status: "completed",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
            completedOrders: { $sum: 1 },
            orderDate: { $max: "$orderDate" },
          },
        },
      ]);

      const categoryBreakdown = await Order.aggregate([
        {
          $match: {
            orderDate: { $gte: start, $lte: end },
            status: "completed",
          },
        },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "products",
            localField: "products.productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $group: {
            _id: "$product.category",
            revenue: {
              $sum: {
                $multiply: ["$products.quantity", "$products.priceAtPurchase"],
              },
            },
          },
        },
      ]);

      if (salesData.length === 0) {
        return {
          totalRevenue: 0,
          completedOrders: 0,
          categoryBreakdown: [],
        };
      }

      const { totalRevenue, completedOrders, orderDate } = salesData[0];

      return {
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        completedOrders,
        orderDate,
        categoryBreakdown: categoryBreakdown.map((item) => ({
          category: item._id,
          revenue: parseFloat(item.revenue.toFixed(2)),
        })),
      };
    },
  },
};

export default analyticsResolver;

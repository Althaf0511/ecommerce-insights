import { IResolvers } from '@graphql-tools/utils';
import Order from '../models/order.model';

interface GetTopSellingProductsArgs {
  limit: number;
}

interface TopSellingProduct {
  productId: string;
  name: string;
  totalSold: number;
}

const topProductsResolver: IResolvers = {
  Query: {
    getTopSellingProducts: async (
      _: unknown,
      { limit }: GetTopSellingProductsArgs
    ): Promise<TopSellingProduct[]> => {
      const productsSold = await Order.aggregate([
        { $unwind: '$products' },
        {
          $group: {
            _id: '$products.productId',
            totalSold: { $sum: '$products.quantity' },
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: '_id',
            as: 'product',
          },
        },
        { $unwind: '$product' },
        {
          $project: {
            productId: '$_id',
            name: '$product.name',
            totalSold: 1,
          },
        },
      ]);

      return productsSold.map((item: any) => ({
        productId: item.productId,
        name: item.name,
        totalSold: item.totalSold,
      }));
    },
  },
};

export default topProductsResolver;

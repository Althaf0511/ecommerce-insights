import { v4 as uuidv4 } from 'uuid';
import Order, { IOrder } from '../models/order.model';
import Product, { IProduct } from '../models/product.model';

interface OrderInputProduct {
  productId: string;
  quantity: number;
}

interface PlaceOrderInput {
  customerId: string;
  products: OrderInputProduct[];
}

const placeOrder = async (
  _: unknown,
  { input }: { input: PlaceOrderInput }
): Promise<IOrder> => {
  const { customerId, products } = input;

  const populatedProducts = await Promise.all(
    products.map(async ({ productId, quantity }) => {
      const product: IProduct | null = await Product.findById(productId);
      if (!product) throw new Error(`Product ${productId} not found`);

      return {
        productId,
        quantity,
        priceAtPurchase: product.price,
      };
    })
  );

  const totalAmount = populatedProducts.reduce(
    (sum, p) => sum + p.quantity * p.priceAtPurchase,
    0
  );

  const newOrder = new Order({
    _id: uuidv4(),
    customerId,
    products: populatedProducts,
    totalAmount,
    orderDate: new Date(),
    status: 'completed',
  });

  await newOrder.save();
  return newOrder;
};

export default placeOrder;

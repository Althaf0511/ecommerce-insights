import mongoose, { Document, Schema, Model } from "mongoose";

interface IOrderProduct {
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface IOrder extends Document {
  _id: string;
  customerId: string;
  products: IOrderProduct[];
  totalAmount: number;
  orderDate: Date;
  status: "pending" | "completed" | "canceled"; // Added "canceled" status
}

const orderSchema: Schema<IOrder> = new Schema({
  _id: { type: String, required: true },
  customerId: {
    type: String,
    index: true,
    required: true,
  },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  orderDate: {
    type: Date,
    default: Date.now,
    index: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "pending",
  },
});

// Index for customerId, orderDate, and totalAmount for sorting and querying
orderSchema.index({ customerId: 1, orderDate: -1, totalAmount: 1 });

const Order: Model<IOrder> = mongoose.model<IOrder>("Order", orderSchema);
export default Order;

import mongoose, { Document, Schema, Model } from "mongoose";

export interface IProduct extends Document {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const productSchema: Schema<IProduct> = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

// Index category for sorting and querying
productSchema.index({ category: 1 });
const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  productSchema
);
export default Product;

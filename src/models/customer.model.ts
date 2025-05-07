import mongoose, { Document, Schema, Model } from "mongoose";

export enum Gender {
  Female = "Female",
  Male = "Male",
  Other = "Other",
}

// Interface for the Customer
export interface ICustomer extends Document {
  _id: string;
  name: string;
  email: string;
  age: number;
  location: string;
  gender: Gender;
}

const customerSchema: Schema<ICustomer> = new Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true,
  },
});

const Customer: Model<ICustomer> = mongoose.model<ICustomer>(
  "Customer",
  customerSchema
);
export default Customer;

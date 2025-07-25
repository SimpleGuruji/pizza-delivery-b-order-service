import { Address, Customer } from "./customerTypes";
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema<Address>(
  {
    text: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { _id: false },
);

const customerSchema = new mongoose.Schema<Customer>(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    addresses: {
      type: [addressSchema],
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model<Customer>("Customer", customerSchema);

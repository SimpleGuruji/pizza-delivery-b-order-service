import mongoose from "mongoose";
import { ToppingCache } from "../types";

const toppingCacheSchema = new mongoose.Schema<ToppingCache>({
  toppingId: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  tenantId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ToppingCache>(
  "ToppingCache",
  toppingCacheSchema,
  "toppingCache",
);

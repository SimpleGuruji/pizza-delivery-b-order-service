import mongoose from "mongoose";
import { ProductPricingCache, PriceConfiguration } from "../types";

const priceSchema = new mongoose.Schema<PriceConfiguration>({
  priceType: {
    type: String,
    enum: ["base", "aditional"],
  },

  availableOptions: {
    type: Object,
    of: Number,
  },
});

const productCacheSchema = new mongoose.Schema<ProductPricingCache>({
  productId: {
    type: String,
    required: true,
  },

  priceConfiguration: {
    type: Object,
    of: priceSchema,
  },
});

export default mongoose.model<ProductPricingCache>(
  "ProductPricingCache",
  productCacheSchema,
  "productCache",
);

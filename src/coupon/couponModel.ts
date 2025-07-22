import { Coupon } from "./couponTypes";
import mongoose from "mongoose";

const couponSchema = new mongoose.Schema<Coupon>(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    validUpto: {
      type: Date,
      required: true,
    },
    tenantId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

couponSchema.index({ tenantId: 1, code: 1 }, { unique: true });

export default mongoose.model<Coupon>("Coupon", couponSchema);

import couponModel from "./couponModel";
import { Coupon } from "./couponTypes";

export class CouponService {
  create = async (coupon: Coupon) => {
    return await couponModel.create(coupon);
  };

  update = async (coupon: Coupon, id: string) => {
    return await couponModel.findByIdAndUpdate(id, coupon, { new: true });
  };

  delete = async (id: string) => {
    return await couponModel.deleteOne({ _id: id });
  };

  findOne = async (id: string) => {
    return await couponModel.findOne({ _id: id });
  };

  findAll = async () => {
    return await couponModel.find();
  };

  findOneByCodeAndTenantId = async (code: string, tenantId: string) => {
    return await couponModel.findOne({ code, tenantId });
  };
}

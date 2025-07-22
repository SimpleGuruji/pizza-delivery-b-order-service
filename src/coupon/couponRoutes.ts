import { Router } from "express";
import { CouponController } from "./couponController";
import { asyncWrapper } from "../utils";
import authenticate from "../common/middleware/authenticate";
const router = Router();
import { CouponService } from "./couponService";
import { canAccessAdminOrManager } from "../common/middleware/canAccessAdminOrManager";
import logger from "../config/logger";
import createCouponValidator from "./createCouponValidator";
import updateCouponValidator from "./updateCouponValidator";

const couponService = new CouponService();
const couponController = new CouponController(couponService, logger);

router.get(
  "/:couponId",
  authenticate,
  asyncWrapper(couponController.getCoupon),
);

router.post(
  "/",
  authenticate,
  canAccessAdminOrManager,
  createCouponValidator,
  asyncWrapper(couponController.createCoupon),
);

router.put(
  "/:couponId",
  authenticate,
  canAccessAdminOrManager,
  updateCouponValidator,
  asyncWrapper(couponController.updateCoupon),
);

router.delete(
  "/:couponId",
  authenticate,
  canAccessAdminOrManager,
  asyncWrapper(couponController.deleteCoupon),
);

router.get("/", authenticate, asyncWrapper(couponController.getAllCoupons));

router.post(
  "/verify",
  authenticate,
  asyncWrapper(couponController.verifyCoupon),
);

export default router;

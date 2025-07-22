import { CouponService } from "./couponService";
import { NextFunction, Request, Response } from "express";
import {
  CreateCouponBody,
  CreateCouponRequest,
  UpdateCouponBody,
  UpdateCouponRequest,
} from "./couponTypes";
import { Coupon } from "./couponTypes";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { Logger } from "winston";
import { validationResult } from "express-validator";

export class CouponController {
  constructor(
    private couponService: CouponService,
    private logger: Logger,
  ) {}

  createCoupon = async (
    req: CreateCouponRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return next(
        createHttpError(400, validationErrors.array()[0].msg as string),
      );
    }
    const { title, code, discount, validUpto, tenantId }: CreateCouponBody =
      req.body;

    if (req.auth.role !== "admin") {
      const tenant = req.auth.tenant;

      if (tenant !== tenantId) {
        return next(
          createHttpError(403, "You are not allowed to create this coupon"),
        );
      }
    }

    const coupon = {
      title,
      code,
      discount,
      validUpto,
      tenantId,
    };

    const newCoupon = await this.couponService.create(coupon as Coupon);

    this.logger.info("Coupon created", newCoupon);

    return res.status(201).json({ id: newCoupon._id });
  };

  updateCoupon = async (
    req: UpdateCouponRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return next(
        createHttpError(400, validationErrors.array()[0].msg as string),
      );
    }

    const { couponId } = req.params;

    const coupon = await this.couponService.findOne(couponId);

    if (!coupon) {
      return next(createHttpError(404, "Coupon not found"));
    }

    if (req.auth.role !== "admin") {
      const tenant = req.auth.tenant;

      if (coupon.tenantId !== tenant) {
        return next(
          createHttpError(403, "You are not allowed to update this coupon"),
        );
      }
    }

    const { title, code, discount, validUpto }: UpdateCouponBody = req.body;

    const updatedCoupon = {
      title,
      code,
      discount,
      validUpto,
    };

    const newUpdatedCoupon = await this.couponService.update(
      updatedCoupon as Coupon,
      couponId,
    );

    this.logger.info("Coupon updated", newUpdatedCoupon);
    return res.json(newUpdatedCoupon);
  };

  deleteCoupon = async (req: Request, res: Response, next: NextFunction) => {
    const { couponId } = req.params;

    if (!couponId) {
      return next(createHttpError(400, "couponId is required"));
    }

    if (!isValidObjectId(couponId)) {
      return next(createHttpError(400, "Invalid couponId"));
    }

    const coupon = await this.couponService.findOne(couponId);

    if (!coupon) {
      return next(createHttpError(404, "Coupon not found"));
    }
    await this.couponService.delete(couponId);

    this.logger.info("Coupon deleted", couponId);

    res.json({ id: couponId });
  };

  getCoupon = async (req: Request, res: Response, next: NextFunction) => {
    const { couponId } = req.params;

    if (!couponId) {
      return next(createHttpError(400, "couponId is required"));
    }

    if (!isValidObjectId(couponId)) {
      return next(createHttpError(400, "Invalid couponId"));
    }

    const coupon = await this.couponService.findOne(couponId);

    if (!coupon) {
      return next(createHttpError(404, "Coupon not found"));
    }

    this.logger.info("Coupon found", coupon);
    return res.json(coupon);
  };

  getAllCoupons = async (req: Request, res: Response, next: NextFunction) => {
    const coupons = await this.couponService.findAll();

    this.logger.info("Coupons found", coupons);
    return res.json(coupons);
  };

  verifyCoupon = async (req: Request, res: Response, next: NextFunction) => {
    const { code, tenantId } = req.body;

    if (!code || !tenantId) {
      return next(createHttpError(400, "code and tenantId are required"));
    }

    const coupon = await this.couponService.findOneByCodeAndTenantId(
      code,
      tenantId,
    );

    if (!coupon) {
      return next(createHttpError(404, "Coupon not found"));
    }

    const currentDate = new Date();
    const couponDate = new Date(coupon.validUpto);

    if (currentDate <= couponDate) {
      return res.json({
        valid: true,
        discount: coupon.discount,
      });
    }

    return res.json({
      valid: false,
      discount: 0,
    });
  };
}

import { Request } from "express";

export interface Coupon {
  title: string;
  code: string;
  discount: number;
  validUpto: Date;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCouponBody {
  title: string;
  code: string;
  discount: number;
  validUpto: Date;
  tenantId: string;
}

export interface CreateCouponRequest extends Request {
  body: CreateCouponBody;
  auth: {
    sub: string;
    role: string;
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    tenant: string;
  };
}

export interface UpdateCouponBody {
  title: string;
  code: string;
  discount: number;
  validUpto: Date;
  tenantId: string;
}

// Update Coupon Request interface extending Express Request
export interface UpdateCouponRequest extends Request {
  body: UpdateCouponBody;
  params: {
    couponId: string; // MongoDB ObjectId
  };
  auth: {
    sub: string;
    role: string;
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    tenant: string;
  };
}

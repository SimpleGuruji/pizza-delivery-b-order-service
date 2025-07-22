import { NextFunction, Response } from "express";
import { CustomerService } from "./customerService";
import { AuthRequest } from "../types";
import { Customer } from "./customerTypes";
import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";
import { Logger } from "winston";

export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private logger: Logger,
  ) {}

  getCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { sub: userId, firstName, lastName, email } = req.auth;

    const existingCustomer = await this.customerService.findOne(userId);

    if (!existingCustomer) {
      const customer = await this.customerService.create({
        userId,
        firstName,
        lastName,
        email,
        addresses: [],
      } as Customer);

      this.logger.info("Customer created", customer);
      return res.status(201).json(customer);
    }

    this.logger.info("Customer found", existingCustomer);
    res.json(existingCustomer);
  };

  addAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { sub: userId } = req.auth;

    if (!userId) {
      return next(createHttpError(401, "Unauthorized"));
    }

    const { customerId } = req.params;

    if (!customerId) {
      return next(createHttpError(400, "customerId is required"));
    }

    if (!isValidObjectId(customerId)) {
      return next(createHttpError(400, "Invalid customerId"));
    }

    const { address } = req.body;

    if (!address) {
      return next(createHttpError(400, "address is required"));
    }

    const updatedCustomer = await this.customerService.addAddress(
      customerId,
      userId,
      address,
    );

    this.logger.info("Address added", updatedCustomer);
    res.json(updatedCustomer);
  };
}

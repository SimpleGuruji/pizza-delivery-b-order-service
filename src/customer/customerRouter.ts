import { Router } from "express";
import { CustomerController } from "./customerController";
import { asyncWrapper } from "../utils";
import authenticate from "../common/middleware/authenticate";
const router = Router();
import { CustomerService } from "./customerService";
import logger from "../config/logger";

const customerService = new CustomerService();
const customerController = new CustomerController(customerService, logger);

router.get("/", authenticate, asyncWrapper(customerController.getCustomer));

router.patch(
  "/addresses/:customerId",
  authenticate,
  asyncWrapper(customerController.addAddress),
);

export default router;

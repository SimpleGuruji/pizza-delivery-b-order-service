import express, { Request, Response } from "express";
import { globalErrorHandler } from "./common/middleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import customerRouter from "./customer/customerRouter";
import couponRouter from "./coupon/couponRoutes";
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/customer", customerRouter);
app.use("/coupons", couponRouter);

app.use(globalErrorHandler);

export default app;

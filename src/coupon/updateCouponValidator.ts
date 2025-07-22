import { body, param } from "express-validator";

// Validation middleware for Update Coupon (PUT route)
export default [
  // Validate couponId in URL params (must be valid MongoDB ObjectId)
  param("couponId")
    .notEmpty()
    .withMessage("Coupon ID is required in URL")
    .isMongoId()
    .withMessage("Coupon ID must be a valid MongoDB ObjectId")
    .trim(),

  // Validate title (required for PUT)
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters")
    .trim()
    .escape(),

  // Validate code (required for PUT)
  body("code")
    .notEmpty()
    .withMessage("Coupon code is required")
    .isString()
    .withMessage("Coupon code must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Coupon code must be between 3 and 20 characters")
    .matches(/^[A-Z0-9_-]+$/)
    .withMessage(
      "Coupon code can only contain uppercase letters, numbers, hyphens and underscores",
    )
    .trim(),

  // Validate discount (required for PUT)
  body("discount")
    .notEmpty()
    .withMessage("Discount is required")
    .isNumeric()
    .withMessage("Discount must be a number")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100")
    .custom((value) => {
      const decimalPlaces = (value.toString().split(".")[1] || []).length;
      if (decimalPlaces > 2) {
        throw new Error("Discount can have at most 2 decimal places");
      }
      return true;
    }),

  // Validate validUpto (required for PUT)
  body("validUpto")
    .notEmpty()
    .withMessage("Valid up to date is required")
    .isISO8601()
    .withMessage("Valid up to must be a valid ISO 8601 date")
    .custom((value) => {
      const date = new Date(value);
      const now = new Date();

      if (date <= now) {
        throw new Error("Valid up to date must be in the future");
      }

      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() + 5);
      if (date > maxDate) {
        throw new Error(
          "Valid up to date cannot be more than 5 years in the future",
        );
      }

      return true;
    })
    .toDate(),

  // Validate tenantId (required for PUT)
  body("tenantId")
    .notEmpty()
    .withMessage("Tenant ID is required")
    .isString()
    .withMessage("Tenant ID must be a string")
    .trim(),
];

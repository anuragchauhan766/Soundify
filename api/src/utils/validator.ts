import { NextFunction, Request, Response } from "express";
import { Schema, ValidationChain, validationResult } from "express-validator";

export const registrationSchema: Schema = {
  name: {
    notEmpty: true,
    errorMessage: "Name must be Provided",
  },
  email: {
    notEmpty: true,
    isEmail: true,
    normalizeEmail: true,
    errorMessage: "Invalid Email",
  },
  password: {
    notEmpty: true,
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      },
    },
    errorMessage:
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one symbol",
  },
  dob: {
    notEmpty: true,
    errorMessage: "Date of Birth required",
  },
  gender: {
    notEmpty: true,
    custom: {
      options: (value: string) => {
        return ["Male", "Female", "Others"].includes(value);
      },
    },
  },
};

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  };
};

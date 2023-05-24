import { NextFunction, Response, Request } from "express";
import ErrorResponse from "../utils/ErrorResponse.js";
const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.log(error);
  if (error instanceof ErrorResponse) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
  } else {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
export default errorHandler;

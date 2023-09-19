import { NextFunction, Request, Response } from "express"
import AppError from "../types/errors"
import HttpStatus from "../constants/status_code"

function ExceptionHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // log error stack
  console.log("error-stack-trace", err.stack, err.message, err.name)
  if (!(err instanceof AppError)) {
    // critical error
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" })
  }
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal server error",
  })
}

export default ExceptionHandler

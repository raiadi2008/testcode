import { NextFunction, Request, Response } from "express"
import HttpStatus from "../constants/status_code"
import { STATUS_CODES } from "http"
import { ErrorResponseInterface } from "../types/responses"

function RouteNotFound(req: Request, res: Response, next: NextFunction) {
  res
    .status(HttpStatus.NOT_FOUND)
    .json({ error: "route not found" } as ErrorResponseInterface)
}

export default RouteNotFound

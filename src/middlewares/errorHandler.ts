// src/middlewares/errorHandler.ts
import type { Request, Response, NextFunction } from 'express'
import ApiResponse from '@/helpers/response'

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // if (err.name === "ValidationError") {
  //   return ApiResponse.validationError(res, err.errors || err.message)
  // }

  if (err.code === "E_ROUTE_NOT_FOUND") {
    return ApiResponse.notFound(res, err.message)
  }

  if (err.code === "E_ROW_NOT_FOUND") {
    return ApiResponse.notFound(res, err.message)
  }

  if (err.code === "E_INVALID_API_TOKEN") {
    return ApiResponse.unauthorized(res, err.message)
  }

  if (err.code === "E_UNAUTHORIZED_ACCESS") {
    return ApiResponse.unauthorized(res, err.message)
  }

  // fallback → Internal Server Error
  return ApiResponse.internalServerError(res, err.message, err.stack)
}

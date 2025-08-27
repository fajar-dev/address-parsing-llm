import type { Response } from 'express'

/**
 * Utility class for sending standardized JSON responses in Express.
 *
 * Each helper returns the `res` instance so you can keep chaining if needed.
 */
export default class ApiResponse {
  /**
   * Send a successful JSON response
   */
  public static sendSuccess(
    res: Response,
    statusCode: number,
    data: unknown,
    message?: string
  ) {
    const responseData = {
      success: true,
      message,
      data,
    }

    return res.status(statusCode).json(responseData)
  }

  /** Shorthand for **200 OK** */
  public static ok(res: Response, data: unknown, message?: string) {
    return this.sendSuccess(res, 200, data, message)
  }

  /** Shorthand for **201 Created** */
  public static created(res: Response, data: unknown, message?: string) {
    return this.sendSuccess(res, 201, data, message)
  }

  /** Shorthand for **204 No Content** */
  public static noContent(res: Response) {
    return this.sendSuccess(res, 204, null)
  }

  /**
   * Send an error JSON response
   */
  public static sendError(
    res: Response,
    statusCode: number,
    message: string,
    errors?: unknown,
    data?: unknown
  ) {
    const errorResponse: {
      success: boolean
      message: string
      error: {
        code: number
        errors: unknown
      }
      data?: unknown
    } = {
      success: false,
      message,
      error: {
        code: statusCode,
        errors: errors ?? null,
      },
    }

    if (data !== undefined) {
      errorResponse.data = data
    }

    return res.status(statusCode).json(errorResponse)
  }

  // ---------- Convenience helpers for common HTTP errors ---------- //

  public static internalServerError(res: Response, message = "Internal Server Error", errors?: unknown) {
    const isProduction = process.env.NODE_ENV === "production"
    if (isProduction) {
      return this.sendError(res, 500, "Internal Server Error")
    }
    return this.sendError(res, 500, message, errors)
  }

  public static notFound(res: Response, message = "Not Found") {
    return this.sendError(res, 404, message)
  }

  public static badRequest(res: Response, message = "Bad Request") {
    return this.sendError(res, 400, message)
  }

  public static unauthorized(res: Response, message = "Unauthorized") {
    return this.sendError(res, 401, message)
  }

  public static forbidden(res: Response, message = "Forbidden") {
    return this.sendError(res, 403, message)
  }

  public static conflict(res: Response, message = "Conflict") {
    return this.sendError(res, 409, message)
  }

  public static validationError(res: Response, errors: unknown) {
    return this.sendError(res, 422, "Validation Error", errors)
  }

  public static methodNotAllowed(res: Response, message = "Method Not Allowed") {
    return this.sendError(res, 405, message)
  }

  public static gone(res: Response, message = "Gone") {
    return this.sendError(res, 410, message)
  }

  public static preconditionFailed(res: Response, message = "Precondition Failed") {
    return this.sendError(res, 412, message)
  }

  public static tooManyRequests(res: Response, message = "Too Many Requests") {
    return this.sendError(res, 429, message)
  }
}

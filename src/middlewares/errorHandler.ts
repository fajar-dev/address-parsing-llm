import { Request, Response, NextFunction } from 'express';
import ApiResponse from '@/helpers/response.helper';

class ErrorHandler {
  public handle = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    const isProduction = process.env.NODE_ENV === 'production';
    const message = isProduction ? 'Internal Server Error' : err.message;
    const stack = isProduction ? undefined : err.stack;
    ApiResponse.internalServerError(res, message, stack);
  };
}

export const errorHandler = new ErrorHandler();

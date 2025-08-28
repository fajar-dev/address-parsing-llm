import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import ApiResponse from "@/helpers/response.helper";

export class Validator {
  public validate(schema: ZodObject) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        schema.parse({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        next();
      } catch (error) {
          if (error instanceof ZodError) {
          const formattedErrors = error.issues.map((issue) => ({
            path: issue.path.join("."), // ex: body.address
            message: issue.message,
          }));
          ApiResponse.validationError(res, formattedErrors);
        }
      }
    };
  }
}

export const validator = new Validator()

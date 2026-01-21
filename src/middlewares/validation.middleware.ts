import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

/**
 * Middleware to validate request body against a Zod schema
 * @param schema - Zod schema to validate against
 * @returns Express middleware function
 */
export const validateBody = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      // Validate and parse the request body
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Format Zod errors into a user-friendly response
        const errors = error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json({
          success: false,
          error: 'Validation Error',
          message: 'Request body validation failed',
          details: errors,
          status: 400,
        });
        return;
      }

      // Pass unexpected errors to error handler
      next(error);
    }
  };
};

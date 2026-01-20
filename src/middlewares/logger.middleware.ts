import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.path} ${res.statusCode} - ${duration}ms`;

    if (process.env.NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.log(logMessage);
    }
  });

  next();
};

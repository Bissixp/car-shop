import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import ErrorHttp from '../errors/errorHandler';

const errorHandlerMiddleware = (
  err: ErrorHttp,
  _req: Request, 
  res: Response, 
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({ error: err.issues });
  }
  const { message, http } = err;
  res.status(http || 500).json({ error: message });
};

export default errorHandlerMiddleware;
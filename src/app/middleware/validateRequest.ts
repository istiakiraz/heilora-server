import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (zodObject: z.ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validateRequest = zodObject.safeParse(req.body);

    if (!validateRequest.success) {
      next(validateRequest.error);
    }

    // sanitizing the data
    req.body = validateRequest.data;

    next();
  };
};

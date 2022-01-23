import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`${500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(500).json({ msg: err.message });
}
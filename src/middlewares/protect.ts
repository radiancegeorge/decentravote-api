import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userProtect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization)
    throw { message: "authorization header not found", status: 401 };
  if (!authorization.includes("Bearer"))
    throw { message: "missing Bearer", status: 401 };
  const token = authorization.split("Bearer ")[1];
  if (!token) throw { message: "token not found", status: 401 };

  // token found
  (req as any).user = jwt.verify(token, process.env.JWT as string) as any;
  next();
};
export const partialUserProtect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (authorization) {
    if (!authorization.includes("Bearer"))
      throw { message: "missing Bearer", status: 401 };
    const token = authorization.split("Bearer ")[1];
    if (!token) throw { message: "token not found", status: 401 };

    // token found
    (req as any).user = jwt.verify(token, process.env.JWT as string) as any;
  }
  next();
};

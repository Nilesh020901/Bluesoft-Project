import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
  id: string;
  role: "employee" | "hr";
}

export const authenticate = (
  req: Request & { user?: AuthPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (role: "employee" | "hr") => {
  return (
    req: Request & { user?: AuthPayload },
    res: Response,
    next: NextFunction
  ) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    return next();
  };
};

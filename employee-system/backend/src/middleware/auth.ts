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
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
    return;
  }
};

export const authorize = (role: "employee" | "hr") => {
  return (
    req: Request & { user?: AuthPayload },
    res: Response,
    next: NextFunction
  ) => {
    if (req.user?.role !== role) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};

// controllers/authController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken"; 
import User from "../models/User";

export const checkAuth = async (req: Request, res: Response) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

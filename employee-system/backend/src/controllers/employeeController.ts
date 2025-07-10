import { Request, Response } from "express";
import User from "../models/User";

export const getMyProfile = async (
  req: Request & { user?: any },
  res: Response
) => {
  const user = await User.findById(req.user!.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

export const updateEmployeeStatus = async (
  req: Request & { user?: any },
  res: Response
) => {
  const { status } = req.body;

  if (!["Login", "Logout"].includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const updateFields: any = {
    status,
  };

  if (status === "Login") {
    updateFields.loginTime = new Date();
  } else {
    updateFields.logoutTime = new Date();
  }

  const updated = await User.findByIdAndUpdate(req.user!.id, updateFields, {
    new: true,
  }).select("-password");

  res.json(updated);
};
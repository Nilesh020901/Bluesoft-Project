import { Request, Response } from "express";
import User from "../models/User";

export const getAllEmployees = async (req: Request, res: Response) => {
  const employees = await User.find({ role: "employee" }).select("-password");
  res.json(employees);
};

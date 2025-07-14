import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendPasswordEmail } from "../utils/mail";

// ----------------------
// Utility Functions
// ----------------------

const toPascalCase = (name: string) => {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");
};

const generateCompanyPassword = (name: string) => {
  const pascalName = toPascalCase(name);
  const number = Math.floor(1000 + Math.random() * 9000);
  const specialChars = "!@#$%^&*";
  const specialChar =
    specialChars[Math.floor(Math.random() * specialChars.length)];

  return `${pascalName}${specialChar}${number}`;
};

// ----------------------
// 👤 Employee Signup
// ----------------------

export const employeeSignup = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const password = generateCompanyPassword(name);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmp = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "employee",
    });

    await sendPasswordEmail(email, password, name);

    res.status(201).json({
      message: "Employee created and password sent to email.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// 🔐 Login
// ----------------------

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // ✅ Localhost पर false रखें
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 दिन
    });

    res.status(200).json({ user }); // ✅ user object वापस भेजें
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// 🧑‍💼 Create Initial HR
// ----------------------

export const createInitialHR = async (_req: Request, res: Response) => {
  try {
    const exists = await User.findOne({ role: "hr" });
    if (exists) return res.status(400).json({ message: "HR already exists" });

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const hr = new User({
      name: "Admin HR",
      email: "hr@example.com",
      password: hashedPassword,
      role: "hr",
    });

    await hr.save();

    return res.status(201).json({ message: "HR created", hr });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ----------------------
// 🚪 Logout
// ----------------------

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/", // ✅ ज़रूरी है - ताकि सही cookie clear हो
  });

  res.json({ message: "Logged out successfully" });
};

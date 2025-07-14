import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import hrRoutes from "./routes/hrRoutes";
import employeeRoutes from "./routes/employeeRoutes";


connectDB();

const app = express();

app.use(
  cors({
    origin: "https://bluesoft-project.vercel.app", // ✅ Frontend origin
    credentials: true, // ✅ ताकि cookies काम करें
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/employee", employeeRoutes);

export default app;

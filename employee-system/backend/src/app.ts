import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import hrRoutes from "./routes/hrRoutes";
import employeeRoutes from "./routes/employeeRoutes";


connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/employee", employeeRoutes);

export default app;

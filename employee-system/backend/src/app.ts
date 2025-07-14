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

const allowedOrigins = [
  "https://bluesoft-project.vercel.app", // ✅ Frontend origin
  "http://localhost:5173", // ✅ Local development
];

app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Allow cookies to be sent
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hr", hrRoutes);
app.use("/api/employee", employeeRoutes);

export default app;

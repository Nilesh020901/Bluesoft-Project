import express from "express";
import { getAllEmployees } from "../controllers/hrController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/employees", authenticate, authorize("hr"), getAllEmployees);

export default router;

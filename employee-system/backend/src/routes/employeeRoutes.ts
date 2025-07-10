import express from "express";
import {
  updateEmployeeStatus,
  getMyProfile,
} from "../controllers/employeeController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

router.get("/me", authenticate, authorize("employee"), getMyProfile);
router.post(
  "/status",
  authenticate,
  authorize("employee"),
  updateEmployeeStatus
);

export default router;

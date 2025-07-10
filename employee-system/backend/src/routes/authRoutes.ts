import { Router } from "express";
import {
  employeeSignup,
  login,
  createInitialHR,
} from "../controllers/authController";

const router = Router();

router.post("/signup", employeeSignup);
router.post("/login", login);
router.get("/create-hr", createInitialHR);

export default router;

import { Router } from "express";
import {
  employeeSignup,
  login,
  createInitialHR,
  logout
} from "../controllers/authController";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/signup", employeeSignup);
router.post("/login", login);
router.get("/create-hr", createInitialHR);
router.post("/logout", logout);
router.get("/check", checkAuth);

export default router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post("/signup", authController_1.employeeSignup);
router.post("/login", authController_1.login);
router.get("/create-hr", authController_1.createInitialHR);
exports.default = router;

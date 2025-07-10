"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get("/me", auth_1.authenticate, (0, auth_1.authorize)("employee"), employeeController_1.getMyProfile);
router.post("/status", auth_1.authenticate, (0, auth_1.authorize)("employee"), employeeController_1.updateEmployeeStatus);
exports.default = router;

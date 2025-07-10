"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
router.get("/", todoController_1.getTodos);
router.post("/", todoController_1.createTodos);
router.put("/:id", todoController_1.updateTodos);
router.delete("/:id", todoController_1.deleteTodo);
exports.default = router;

import express from "express";
import { getTodos, createTodos, updateTodos, deleteTodo } from "../controllers/todoController";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodos);
router.put("/:id", updateTodos);
router.delete("/:id", deleteTodo);

export default router;
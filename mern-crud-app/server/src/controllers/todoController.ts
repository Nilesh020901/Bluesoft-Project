import { Request, Response } from "express";
import Todo from "../models/Todos";

export const getTodos = async (_req: Request, res: Response) => {
    const todos = await Todo.find();
    res.json(todos);
};

export const createTodos = async (req: Request, res: Response) => {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
}

export const updateTodos = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const todo = await Todo.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true }
    );

    if (!todo) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }

    res.json(todo);
};

export const deleteTodo = async ( req: Request, res:Response ) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
        res.status(404).json({ message: "Todo not found" });
        return;
    }
    res.json({ message: "Todo deleted" });
};


import API from "./axios";
import type { Todo } from "../types/todo";

export const fetchTodos = async (): Promise<Todo[]> => {
    const res = await API.get("/todos");
    return res.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
    const res = await API.post("/todos", { title });
    return res.data;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const res = await API.put(`/todos/${todo._id}`, todo);
    return res.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await API.delete(`/todos/${id}`);
};
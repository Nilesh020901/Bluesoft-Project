import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api/todoApi";
import type { Todo } from "./types/todo";
import { useState } from "react";

function App() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState("");

  const { data: todos = [], isLoading} = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
  });

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
  });

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    createMutation.mutate(newTitle);
    setNewTitle("");
  };

  const handleToggle = ( todo: Todo) => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="New todo"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center mb-2 p-2 border"
          >
            <span
              onClick={() => handleToggle(todo)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {todo.title}
            </span>
            <button
              className="text-red-500"
              onClick={() => handleDelete(todo._id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as todoApi from "./api/todoApi";
import userEvent from "@testing-library/user-event";
import type { Todo } from "./types/todo";

const mockTodos: Todo[] = [
  {
    _id: "1",
    title: "Mock Todo",
    completed: false,
    createdAt: "",
    updatedAt: "",
  },
];

vi.mock("./api/todoApi");

const setup = () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

describe("App Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders todo list", async () => {
    (todoApi.fetchTodos as vi.Mock).mockResolvedValue(mockTodos);

    setup();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Mock Todo")).toBeInTheDocument();
    });
  });

  it("adds a new todo", async () => {
    const newTodo: Todo = {
      _id: "2",
      title: "New Todo",
      completed: false,
      createdAt: "",
      updatedAt: "",
    };

    (todoApi.fetchTodos as vi.Mock).mockResolvedValue([]);
    (todoApi.createTodo as vi.Mock).mockResolvedValue(newTodo);
    setup();

    const input = screen.getByPlaceholderText("New todo");
    const button = screen.getByText("Add");

    await userEvent.type(input, "New Todo");
    await userEvent.click(button);

    await waitFor(() =>
      expect(todoApi.createTodo).toHaveBeenCalledWith("New Todo")
    );
  });

  it("toggles todo completion", async () => {
    (todoApi.fetchTodos as vi.Mock).mockResolvedValue(mockTodos);
    (todoApi.updateTodo as vi.Mock).mockResolvedValue({
      ...mockTodos[0],
      completed: true,
    });

    setup();

    await waitFor(() =>
      expect(screen.getByText("Mock Todo")).toBeInTheDocument()
    );

    const todoText = screen.getByText("Mock Todo");
    fireEvent.click(todoText);

    await waitFor(() =>
      expect(todoApi.updateTodo).toHaveBeenCalledWith({
        ...mockTodos[0],
        completed: true,
      })
    );
  });

  it("deletes a todo", async () => {
    (todoApi.fetchTodos as vi.Mock).mockResolvedValue(mockTodos);
    (todoApi.deleteTodo as vi.Mock).mockResolvedValue(undefined);

    setup();

    await waitFor(() =>
      expect(screen.getByText("Mock Todo")).toBeInTheDocument()
    );

    const deleteButton = screen.getByText("✕");
    await userEvent.click(deleteButton);

    await waitFor(() => expect(todoApi.deleteTodo).toHaveBeenCalledWith("1"));
  });
});

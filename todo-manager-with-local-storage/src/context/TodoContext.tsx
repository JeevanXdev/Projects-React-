import  { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
  editTodo: (id: number, text: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleComplete, removeTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodos must be used within a TodoProvider");
  return context;
};

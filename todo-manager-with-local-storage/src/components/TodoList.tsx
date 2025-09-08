import React from "react";
import { useTodos } from "../context";
import TodoItem from "./TodoItem";

const TodoList: React.FC = () => {
  const { todos } = useTodos();

  return (
    <div>
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      )}
    </div>
  );
};

export default TodoList;

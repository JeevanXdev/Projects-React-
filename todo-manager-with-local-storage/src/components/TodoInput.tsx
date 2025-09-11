import React, { useState } from "react";
import { useTodos } from "../context";

const TodoInput: React.FC = () => {
  const { addTodo } = useTodos();
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded-lg"
        placeholder="Add a new task..."
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Add
      </button>
    </form>
  );
};

export default TodoInput;

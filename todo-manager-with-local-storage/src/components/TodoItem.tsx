import React, { useState } from "react";
import { useTodos } from "../context";
import type { Todo } from "../context";
import { Pencil, Save, Trash2 } from "lucide-react";

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const { toggleComplete, removeTodo, editTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEditSave = () => {
    if (isEditing) {
      editTodo(todo.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-xl shadow mb-3 transition ${
        todo.completed ? "bg-green-200" : "bg-purple-100"
      }`}
    >
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
          className="w-5 h-5 accent-purple-600"
        />
        {isEditing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 p-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleEditSave}
          className="text-yellow-600 hover:text-yellow-800"
        >
          {isEditing ? <Save size={20} /> : <Pencil size={20} />}
        </button>
        <button
          onClick={() => removeTodo(todo.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

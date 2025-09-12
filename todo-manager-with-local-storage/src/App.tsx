import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-200 to-violet-300 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Todo Manager
        </h1>
        <TodoInput />
        <TodoList />
      </div>
    </div>
  );
};

export default App;

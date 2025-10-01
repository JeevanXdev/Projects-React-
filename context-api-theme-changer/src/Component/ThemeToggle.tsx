import React from "react";
import { useTheme } from "../Context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-end p-4">
      <button
        onClick={toggleTheme}
        className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default ThemeToggle;

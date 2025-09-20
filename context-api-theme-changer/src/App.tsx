import React from "react";
import ThemeToggle from "./Component/ThemeToggle";
import InfoCard from "./Component/InfoCard";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <ThemeToggle />
      <InfoCard />
    </div>
  );
};

export default App;

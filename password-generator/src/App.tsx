import React, { useState, useRef } from "react";

const App: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  const passwordRef = useRef<HTMLInputElement>(null);

  // Function to generate password
  const generatePassword = () => {
    let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+{}[]<>?.,";
    let generated = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generated += chars[randomIndex];
    }
    setPassword(generated);
  };

  
  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select(); 
      navigator.clipboard.writeText(password);
    }
  };

  
  const getStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score++;

    if (score <= 2) return { label: "Weak", color: "text-red-500", bar: "bg-red-500 w-1/3" };
    if (score === 3 || score === 4) return { label: "Medium", color: "text-yellow-500", bar: "bg-yellow-500 w-2/3" };
    return { label: "Strong", color: "text-green-500", bar: "bg-green-500 w-full" };
  };

  const strength = getStrength(password);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          🔐 Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex gap-2 mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            className="flex-1 border rounded-lg px-3 py-2 text-gray-700 focus:outline-none"
            placeholder="Click Generate..."
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Copy
          </button>
        </div>

        {/* Password Strength Meter */}
        {password && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className={`font-medium ${strength.color}`}>
                Strength: {strength.label}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className={`h-2 rounded-full ${strength.bar}`}></div>
            </div>
          </div>
        )}

        {/* Slider for Length */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Password Length: {length}
          </label>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full cursor-pointer accent-blue-500"
          />
        </div>

        {/* Options */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Include Symbols
          </label>
        </div>

        {/* Generate Button */}
        <button
          onClick={generatePassword}
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import "./Home.css";
function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const handleSearch = () => {
    if (file) {
      console.log("Searching by file:", file.name);
      setResult(`Searching by file: ${file.name}`);
    } else {
      console.log("Searching by text input");
      setResult("Searching by text input...");
    }
  };
  const handleClear = () => {
    setFile(null);
    setResult("");
  };
  return (
    <div className="app">
      <h1 className="title">MedcoSearch</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="enter your query as text"
          className="input"
        />
        <div className="btn-search-row">
          <button className="hunt-button" onClick={handleSearch}>
            search
          </button>
          <button className="hunt-button" onClick={handleClear}>
            clear
          </button>
        </div>
      </div>
      <div className="output-container">
        <p>{result}</p>
      </div>
    </div>
  );
}

export default App;

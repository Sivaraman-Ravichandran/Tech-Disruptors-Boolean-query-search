import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReverseImageSearch from "./Pages/ReverseImageSearch";
import Navbar from "./Components/Navbar";
import Symptom from "./Pages/Symptom";
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/search-by-image" element={<ReverseImageSearch />} />
          <Route path="/symptom-analyser" element={<Symptom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

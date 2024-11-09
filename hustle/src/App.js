import React from "react";
import './Pages/Home.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReverseImageSearch from "./Pages/ReverseImageSearch";
import Navbar from "./Components/Navbar";
import Symptom from "./Pages/Symptom";
import Text from "./Pages/Text";
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Text />} />
          
          <Route path="/search-by-image" element={<ReverseImageSearch />} />
          <Route path="/symptom-analyser" element={<Symptom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

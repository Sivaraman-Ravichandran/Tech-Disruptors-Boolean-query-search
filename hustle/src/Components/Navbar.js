import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MedcoSearch</div>
      <ul className="navbar-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/search-by-image">Research</a>
        </li>
        <li>
          <a href="/symptom-analyser">Symptoms-Analyser</a>
        </li>
        <li>
          <a href="#summarize">Summarize</a>
        </li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Navbar;

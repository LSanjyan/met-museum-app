import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleSidebar}>
        &times;
      </button>
      <h3>Menu</h3>
      <ul>
        <li>
          <Link to="/" onClick={toggleSidebar}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={toggleSidebar}>
            About
          </Link>
        </li>
        <li>
          <Link to="contact" onClick={toggleSidebar}>
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

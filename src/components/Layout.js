import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Layout.css";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?query=${query}`); // Use 'query' instead of 'q'
      setQuery(""); // Clear input after search
    }
  };

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="header d-flex justify-content-between align-items-center p-3">
        <div>
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            &#9776;
          </button>
          <h1 className="d-inline ms-3">Metropolitan Museum Art</h1>
        </div>

        {/* Bootstrap Search Bar */}
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search Artworks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </header>

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

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
      navigate(`/?query=${query}`);
      setQuery(""); // Clear input after search
    }
  };

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="header">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          &#9776;
        </button>

        {/* Search Bar in Center */}
        <form className="search-bar d-flex" onSubmit={handleSearch}>
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

        {/* Title to the Right */}
        <h1 className="site-title">Metropolitan Museum Art</h1>
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

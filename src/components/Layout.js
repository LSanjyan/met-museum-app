import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout-container">
      {/*Header*/}
      <header className="header">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          &#9776;
        </button>
        <h1>Metropolitan Museum Art</h1>
      </header>

      {/*Sidebar*/}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      {/*Main Content*/}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

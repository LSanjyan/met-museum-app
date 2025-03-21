import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Artwork from "./pages/Artwork";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="my-4">Metropolitan Museum Art Explorer</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artwork/:id" element={<Artwork />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <h2 className="about-title">About Us</h2>
      <div className="about-content">
        <div className="about-text">
          <p>Welcome to the Metropolitan Museum Art Gallery!</p>
          <p>
            Our gallery features a wide range of artworks, including paintings,
            sculptures, and decorative arts from various cultures and time
            periods.
          </p>
          <p>
            We strive to provide an enriching experience for all art
            enthusiasts, scholars, and casual visitors alike.
          </p>
          <p>
            You can see Museum Map and explore the different sections of the
            museum
          </p>
        </div>
        <div className="about-image">
          <img src="met_map.png" alt="Met Museum Map" />
        </div>
      </div>
      <button className="home-btn" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}

export default About;

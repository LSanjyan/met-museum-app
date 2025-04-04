import React from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();
  return (
    <div className="about-container">
      <h2 className="about-title">Contact</h2>
      <div className="about-content">
        <div className="about-text">
          <p>Contact Us Via Email: mail@mail.com </p>
          <p>Phone: 123-456-7890</p>
          <p>Address: 100 Avenue, Arctica </p>
        </div>
      </div>
      <button className="home-btn" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}

export default Contact;

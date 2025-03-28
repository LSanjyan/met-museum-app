import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
//import Footer from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Artwork.css";

const Artwork = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );
        const data = await response.json();
        setArtwork(data);
      } catch (error) {
        console.error("Error fetching artwork details:", error);
      }
    };

    fetchArtwork();
  }, [id]);

  if (!artwork) return <p>Loading...</p>;

  return (
    <div className="artwork-container">
      <h2>{artwork.title}</h2>
      <img
        src={artwork.primaryImage || "https://via.placeholder.com/400"}
        alt={artwork.title}
      />
      <p>
        <strong>Artist:</strong> {artwork.artistDisplayName || "Unknown"}
      </p>
      <p>
        <strong>Year:</strong> {artwork.objectDate || "Unknown"}
      </p>
      <p>
        <strong>Medium:</strong> {artwork.medium || "Unknown"}
      </p>
      <p>
        <strong>Dimensions:</strong> {artwork.dimensions || "Unknown"}
      </p>
      {/* Home Button */}
      <button className="home-btn" onClick={() => navigate("/")}>
        Home
      </button>
      {/* <Footer />*/}
    </div>
  );
};

export default Artwork;

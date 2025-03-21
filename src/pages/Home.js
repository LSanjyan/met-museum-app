import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(
          "https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting"
        );
        const data = await response.json();

        if (data.objectIDs) {
          // Pick the first 20 artworks
          const artworkIds = data.objectIDs.slice(801, 821);

          // Fetch artwork details for each ID
          const artworkPromises = artworkIds.map((id) =>
            fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            ).then((res) => res.json())
          );

          const artworkDetails = await Promise.all(artworkPromises);
          setArtworks(artworkDetails);
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="home-container">
      <h2>Explore Artworks</h2>
      <div className="art-grid">
        {artworks.map((art) => (
          <div key={art.objectID} className="art-card">
            <Link to={`/artwork/${art.objectID}`}>
              <img
                src={art.primaryImageSmall || "https://via.placeholder.com/200"}
                alt={art.title}
              />
              <h3>{art.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

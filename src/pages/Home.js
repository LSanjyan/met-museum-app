import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Match 'query' from Layout.js

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        let url =
          "https://collectionapi.metmuseum.org/public/collection/v1/search?q=painting";
        if (query) {
          url = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${query}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        if (data.objectIDs && data.objectIDs.length > 0) {
          // Instead of slicing at 806, just get the first 20 IDs
          const artworkIds = data.objectIDs.slice(0, 20);

          // Fetch artwork details for each ID
          const artworkPromises = artworkIds.map((id) =>
            fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            ).then((res) => res.json())
          );

          const artworkDetails = await Promise.all(artworkPromises);

          // Filter out artworks without images
          const filteredArtworks = artworkDetails.filter(
            (art) => art.primaryImageSmall
          );
          setArtworks(filteredArtworks);
        } else {
          setArtworks([]); // No results found
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, [query]); // Re-fetch artworks when query changes

  return (
    <div className="home-container">
      <h2 className="mt-4">
        {query ? `Results for "${query}"` : "Explore Artworks"}
      </h2>
      <div className="art-grid">
        {artworks.length > 0 ? (
          artworks.map((art) => (
            <div key={art.objectID} className="art-card">
              <Link to={`/artwork/${art.objectID}`}>
                <img
                  src={
                    art.primaryImageSmall || "https://via.placeholder.com/200"
                  }
                  alt={art.title}
                />
                <h3>{art.title}</h3>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">No artworks found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
// This code defines a Home component that fetches and displays artworks from the Metropolitan Museum of Art's API.
// It uses React hooks to manage state and side effects, and it utilizes React Router for navigation.

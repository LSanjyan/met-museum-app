import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import "./Home.css";

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Match 'query' from Layout.js

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of artworks per page
  const [totalItems, setTotalItems] = useState(0);

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
          setTotalItems(data.objectIDs.length); // Store total results

          const startIndex = (currentPage - 1) * itemsPerPage;
          const artworkIds = data.objectIDs.slice(
            startIndex,
            startIndex + itemsPerPage
          );

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
  }, [query, currentPage]); // Re-fetch artworks when query or page changes

  // Pagination Controls
  const nextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

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

      {/* Pagination Buttons */}
      <div className="pagination">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="btn btn-secondary"
        >
          Previous
        </button>
        <span className="page-number">Page {currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(totalItems / itemsPerPage)}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

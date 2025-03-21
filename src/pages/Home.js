import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
      .then((res) => res.json())
      .then((data) => {
        const objectIDs = data.objectIDs.slice(7980, 8000);
        return Promise.all(
          objectIDs.map((id) =>
            fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            ).then((res) => res.json())
          )
        );
      })
      .then(setArtworks);
  }, []);

  return (
    <div>
      <h2>Artworks</h2>
      <ul className="list-group">
        {artworks.map((art) => (
          <li key={art.objectID} className="list-group-item">
            <Link to={`/artwork/${art.objectID}`}>
              {art.title || "Untitled"}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

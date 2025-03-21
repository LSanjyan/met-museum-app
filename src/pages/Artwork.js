import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Artwork = () => {
  const { id } = useParams();
  const [art, setArt] = useState(null);

  useEffect(() => {
    fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
    )
      .then((res) => res.json())
      .then(setArt);
  }, [id]);

  if (!art) return <h2>Loading...</h2>;

  const imageUrl =
    art.primaryImage ||
    art.primaryImageSmall ||
    "https://via.placeholder.com/400"; // Placeholder if no image

  return (
    <div>
      <h2>{art.title || "Untitled"}</h2>
      <img src={imageUrl} alt={art.title} className="img-fluid" />
      <p>
        <strong>Artist:</strong> {art.artistDisplayName || "Unknown"}
      </p>
      <p>
        <strong>Department:</strong> {art.department}
      </p>
      <p>
        <strong>Medium:</strong> {art.medium}
      </p>
    </div>
  );
};
export default Artwork;

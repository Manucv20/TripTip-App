import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";
import SearchResultsComponent from "../SearchResultsComponent";
import SearchComponent from "../SearchComponent";

const SenderismoCard = () => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const categoria = "Senderismo"; // Cambia la categoría de búsqueda a "Senderismo"
    const results = await searchAPI("", categoria);
    navigate("/search-results", { state: { searchResults: results } });
  };

  return (
    <Link to="/search-results" style={{ textDecoration: "none" }}>
      <div
        style={{
          backgroundImage: `url("/viaje_senderismo.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "200px",
          height: "200px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={handleSearch}
      >
        <h3 style={{ fontSize: "24px", color: "#000000", margin: "0" }}>
          Senderismo
        </h3>
      </div>
    </Link>
  );
};

export default SenderismoCard;

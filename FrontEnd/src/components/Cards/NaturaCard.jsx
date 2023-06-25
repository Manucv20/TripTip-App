import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecomendations";
import SearchResultsComponent from "../SearchResultsComponent";
import SearchComponent from "../SearchComponent";

const NaturaCard = () => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const categoria = "Naturaleza"; // Cambia la categoría de búsqueda a "Naturaleza"
    const results = await searchAPI("", categoria);
    navigate("/search-results", { state: { searchResults: results } });
  };

  return (
    <Link to="/search-results" style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#ff5900",
          width: "200px",
          height: "200px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundImage: `url("/viajes_naturaleza.jpg")`,
        }}
        onClick={handleSearch}
      >
        <h3 style={{ fontSize: "24px", color: "#ffffff", margin: "0" }}>
          Natura
        </h3>
      </div>
    </Link>
  );
};

export default NaturaCard;

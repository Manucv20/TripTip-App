<<<<<<< HEAD
import { Link } from "react-router-dom";

const LoveCard = () => {
  return (
    <Link to="/love" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
   <div style={{ ...cardStyle, backgroundSize: "cover", backgroundImage: `url("/viaje_novios.jpg")` }}>
        <h3 style={titleStyle}>Viaje en pareja</h3>
=======
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";
import SearchResultsComponent from "../SearchResultsComponent";
import SearchComponent from "../SearchComponent";

const LoveCard = () => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const categoria = "Amor"; // Cambia la categoría de búsqueda a "Amor"
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
          backgroundImage: `url("/viaje_novios.jpg")`,
        }}
        onClick={handleSearch}
      >
        <h3 style={{ fontSize: "24px", color: "#ffffff", margin: "0" }}>
          Viaje en pareja
        </h3>
>>>>>>> origin/dev
      </div>
    </Link>
  );
};

<<<<<<< HEAD
const cardStyle = {
  background: "#ff5900",
  width: "200px",
  height: "200px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "24px",
  color: "#ffffff",
  margin: "0",
};

export default LoveCard;
=======
export default LoveCard;
>>>>>>> origin/dev

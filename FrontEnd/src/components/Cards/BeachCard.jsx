<<<<<<< HEAD
import { Link } from "react-router-dom";

const BeachCard = () => {
  return (
    <Link to="/Beach" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
   <div style={{ ...cardStyle, backgroundSize: "cover", backgroundImage: `url("/viaje_playa.jpg")` }}>
        <h3 style={titleStyle}>Playas y relax</h3>
=======
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";
import SearchResultsComponent from "../SearchResultsComponent";
import SearchComponent from "../SearchComponent";

const BeachCard = () => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const categoria = "Playa"; // Cambia la categoría de búsqueda a "Playa"
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
          backgroundImage: `url("/viaje_playa.jpg")`,
        }}
        onClick={handleSearch}
      >
        <h3 style={{ fontSize: "24px", color: "#ffffff", margin: "0" }}>
          Playas y relax
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

export default BeachCard;
=======
export default BeachCard;
>>>>>>> origin/dev

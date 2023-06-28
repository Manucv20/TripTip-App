<<<<<<< HEAD
import { Link } from "react-router-dom";

const FamilyCard = () => {
  return (
    <Link to="/family" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
   <div style={{ ...cardStyle, backgroundSize: "cover", backgroundImage: `url("/viaje_familia.jpg")` }}>
        <h3 style={titleStyle}>Viaje en familia</h3>
=======
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";
import SearchResultsComponent from "../SearchResultsComponent";
import SearchComponent from "../SearchComponent";

const FamilyCard = () => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const categoria = "Familia"; // Cambia la categoría de búsqueda a "Familia"
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
          backgroundImage: `url("/viaje_familia.jpg")`,
        }}
        onClick={handleSearch}
      >
        <h3 style={{ fontSize: "24px", color: "#ffffff", margin: "0" }}>
          Viaje en familia
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

export default FamilyCard;
=======
export default FamilyCard;
>>>>>>> origin/dev

<<<<<<< HEAD
import { Link } from "react-router-dom";

const SenderismoCard = () => {
  return (
    <Link to="/senderismo" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Senderismo</h3>
=======
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
>>>>>>> origin/dev
      </div>
    </Link>
  );
};

<<<<<<< HEAD
const cardStyle = {
  backgroundImage: `url("/viaje_senderismo.jpg")`,
  backgroundSize: "cover", // Hacer que la imagen ocupe el 100% del contenedor sin repetirse
  backgroundPosition: "center",
  width: "200px",
  height: "200px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "24px",
  color: "#FFFFFF", // Cambiar a color negro (#000000)
  margin: "0",
};

=======
>>>>>>> origin/dev
export default SenderismoCard;

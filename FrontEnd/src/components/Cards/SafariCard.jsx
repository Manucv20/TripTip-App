<<<<<<< HEAD
import { Link } from "react-router-dom";

const SafariCard = () => {
  return (
    <Link
      to="/safari"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          ...cardStyle,
          backgroundSize: "cover",
          backgroundImage: `url("viaje_safari.jpg")`,
        }}
      >
        <h3 style={titleStyle}>Safari</h3>
=======
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";
import SearchResultsComponent from "../SearchResultsComponent";
import SearchComponent from "../SearchComponent";

const SafariCard = () => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const categoria = "Safari"; // Cambia la categoría de búsqueda a "Safari"
    const results = await searchAPI("", categoria);
    navigate("/search-results", { state: { searchResults: results } });
  };

  return (
    <Link to="/search-results" style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "#003399",
          width: "200px",
          height: "200px",
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundImage: `url("/viaje_safari.jpg")`,
        }}
        onClick={handleSearch}
      >
        <h3 style={{ fontSize: "24px", color: "#ffffff", margin: "0" }}>
          Safari
        </h3>
>>>>>>> origin/dev
      </div>
    </Link>
  );
};

<<<<<<< HEAD
const cardStyle = {
  background: "#003399",
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

=======
>>>>>>> origin/dev
export default SafariCard;

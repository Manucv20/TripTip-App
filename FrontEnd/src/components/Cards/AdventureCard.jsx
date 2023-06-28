<<<<<<< HEAD
import { Link } from "react-router-dom";

const AdventureCard = () => {
  return (
    <Link to="/Adventure" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
   <div style={{ ...cardStyle, backgroundSize: "cover", backgroundImage: `url("/viaje_aventura.jpg")` }}>
        <h3 style={titleStyle}>Aventuras</h3>
=======
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";
import SearchResultsComponent from "../SearchResultsComponent";
import SearchComponent from "../SearchComponent";
const AdventureCard = () => {
  const navigate = useNavigate();

  const handleSearch = async () => {
    const categoria = "Aventura";
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
          backgroundImage: `url("/viaje_aventura.jpg")`,
        }}
        onClick={handleSearch}
      >
        <h3 style={{ fontSize: "24px", color: "#ffffff", margin: "0" }}>
          Aventuras
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

export default AdventureCard;
=======
export default AdventureCard;
>>>>>>> origin/dev

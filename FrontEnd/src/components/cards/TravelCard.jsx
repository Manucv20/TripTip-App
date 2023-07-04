import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";

const TravelCard = ({ categoria, backgroundImage, title }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleSearch = async () => {
    const results = await searchAPI("", categoria);
    navigate("/search-results", { state: { searchResults: results } });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    background: "#ff5900",
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${backgroundImage})`,
    transition: "transform 0.1s",
    transform: isHovered ? "scale(1.05)" : "scale(1)",
  };

  const titleStyle = {
    fontSize: "24px",
    color: "#ffffff",
    margin: "0",
    textShadow:
      "0 0 10px #000000, 0 0 20px #000000, 0 0 30px #000000, 0 0 40px #000000, 0 0 50px #000000, 0 0 60px #000000, 0 0 70px #000000",
  };

  return (
    <Link to="/search-results" style={{ textDecoration: "none" }}>
      <div
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSearch}
      >
        <h3 style={titleStyle}>{title}</h3>
      </div>
    </Link>
  );
};

export default TravelCard;

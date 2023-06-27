<<<<<<< HEAD
import React, { useState, useContext, useEffect } from "react";
=======
import React, { useState, useContext } from "react";
>>>>>>> origin/dev
import { FaSuitcase, FaHeart, FaCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
<<<<<<< HEAD
  const { userData } = useContext(AuthContext);
=======
  const { userData, firstname } = useContext(AuthContext);
>>>>>>> origin/dev
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  if (!userData) {
    return <div>Cargando...</div>; // Indicador de carga mientras se carga userData solución al problema de la carga de la pagina cuando se reinicia
  }

  const handleMouseEnter = (index) => {
    setHighlightedItem(index);
  };

  const handleMouseLeave = () => {
    setHighlightedItem(null);
  };

  const handleClick = (index) => {
    setSelectedItem(index);
  };

  const sidebarStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "10px",
  };

  const containerStyles = {
    display: "flex",
    borderRight: "1px solid #ccc",
  };

  const listStyles = {
    listStyleType: "none",
    padding: 0,
  };

  const itemContainerStyles = (index) => ({
    display: "flex",
    alignItems: "center",
    margin: "50px 0",
    transition: "background-color 0.3s",
    backgroundColor:
      selectedItem === index || highlightedItem === index ? "#f2f2f2" : "",
  });

  const iconStyles = {
    marginRight: "5px",
    marginLeft: "5px",
  };

  const linkStyles = {
    padding: 10,
    color: "black",
    textDecoration: "none",
    fontWeight: "bold",
  };

  return (
    <>
      <header style={containerStyles}>
        <div className="sidebar" style={sidebarStyles}>
          <h2 style={{ marginLeft: "10px" }}>
<<<<<<< HEAD
            Hola{" "}
            {userData.firstName ? userData.firstName : userData.userUsername}
=======
            Hola {firstname != "null" ? firstname : userData.userUsername}
>>>>>>> origin/dev
          </h2>
          <ul className="menu" style={listStyles}>
            <li
              style={itemContainerStyles(0)}
              className="itemContainer"
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(0)}
            >
              <FaSuitcase color="black" style={iconStyles} />
<<<<<<< HEAD
              <NavLink to="/" style={linkStyles}>
=======
              <NavLink to="/myRecommendations" style={linkStyles}>
>>>>>>> origin/dev
                Mis recomendaciones
              </NavLink>
            </li>
            <li
              style={itemContainerStyles(1)}
              className="itemContainer"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(1)}
            >
              <FaHeart color="black" style={iconStyles} />
<<<<<<< HEAD
              <NavLink to="/likes" style={linkStyles}>
=======
              <NavLink to="/mylikes" style={linkStyles}>
>>>>>>> origin/dev
                Mis favoritos
              </NavLink>
            </li>
            <li
              style={itemContainerStyles(3)}
              className="itemContainer"
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(3)}
            >
              <FaCog color="black" style={iconStyles} />
              <NavLink to="/myprofile" style={linkStyles}>
                Mi información personal
              </NavLink>
            </li>
          </ul>
        </div>
        <div style={{ borderRight: "1px solid #f2f2f2" }}></div>
      </header>
    </>
  );
};

export default Sidebar;

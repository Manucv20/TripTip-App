import React, { useState } from "react";
import { FaSuitcase, FaHeart, FaComment, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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
      <div style={containerStyles}>
        <div className="sidebar" style={sidebarStyles}>
          <h2 style={{ marginLeft: "10px" }}>Hola @usuario</h2>
          <ul className="menu" style={listStyles}>
            <li
              style={itemContainerStyles(0)}
              className="itemContainer"
              onMouseEnter={() => handleMouseEnter(0)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(0)}
            >
              <FaSuitcase color="black" style={iconStyles} />
              <Link to ="/" style={linkStyles}>
                Mis recomendaciones
              </Link>
            </li>
            <li
              style={itemContainerStyles(1)}
              className="itemContainer"
              onMouseEnter={() => handleMouseEnter(1)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(1)}
            >
              <FaHeart color="black" style={iconStyles} />
              <Link to ="#" style={linkStyles}>
                Mis favoritos
              </Link>
            </li>
            <li
              style={itemContainerStyles(2)}
              className="itemContainer"
              onMouseEnter={() => handleMouseEnter(2)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(2)}
            >
              <FaComment color="black" style={iconStyles} />
              <Link to ="#" style={linkStyles}>
                Mis opiniones
              </Link>
            </li>
            <li
              style={itemContainerStyles(3)}
              className="itemContainer"
              onMouseEnter={() => handleMouseEnter(3)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(3)}
            >
              <FaCog color="black" style={iconStyles} />
              <Link to ="#" style={linkStyles}>
                Mi información personal
              </Link>
            </li>
          </ul>
        </div>
        <div style={{ borderRight: "1px solid #f2f2f2" }}></div>
      </div>
    </>
  );
};

export default Sidebar;

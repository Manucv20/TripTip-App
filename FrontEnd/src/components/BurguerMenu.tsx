import React, { useState, useContext } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const { auth, logoutHandler } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: "relative", zIndex: 9999 }}>
      <button onClick={toggleMenu}>
        <FaUser /> Bienvenido👋
      </button>

      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            listStyle: "none",
            padding: 0,
            margin: 0,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <li style={{ padding: 10 }}>
            <Link to="/likes">Ajustes</Link>
          </li>
          <li style={{ padding: 10 }}>
            <button
              onClick={logoutHandler}
              style={{
                color: "black",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default BurgerMenu;

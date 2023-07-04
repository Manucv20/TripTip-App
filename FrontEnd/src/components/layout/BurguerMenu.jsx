import React, { useState, useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { FaCog, FaHeart, FaSignOutAlt, FaSuitcase } from "react-icons/fa";
import Avatar from "../user/Avatar";

const BurgerMenu = () => {
  const { userData, logoutHandler } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, []);

  if (!userData) {
    return <p>Cargando....</p>;
  }

  return (
    <div style={{ position: "relative", zIndex: 9999 }}>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          border: "none",
          background: "none",
          gap: "1rem",
          font: "inherit",
          marginRight: "2rem",
        }}
      >
        <span
          id="welcome-message"
          class="welcome-text"
          style={{ fontSize: "20px" }}
        >
          Bienvenido, {userData.userUsername}
        </span>

        {
          <Avatar
            imagen={userData.imagen}
            estilo={{ width: "40px", height: "40px" }}
          />
        }
      </button>
      {isOpen ? (
        <ul
          ref={menuRef}
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
          <li
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "0.5rem",
              marginBottom: "2rem",
              gap: "1rem",
            }}
          >
            <FaSuitcase />
            <NavLink to="/myRecommendations" onClick={toggleMenu}>
              Mis recomendaciones
            </NavLink>
          </li>

          <li
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "0.5rem",
              marginBottom: "2rem",
              gap: "1rem",
            }}
          >
            <FaHeart />
            <NavLink to="/mylikes" onClick={toggleMenu}>
              Mis favoritos
            </NavLink>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "0.5rem",
              marginBottom: "2rem",
              gap: "1rem",
            }}
          >
            <FaCog />
            <NavLink to="/account/myprofile" onClick={toggleMenu}>
              Ajustes
            </NavLink>
          </li>
          <li
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: "0.5rem",
              gap: "1rem",
            }}
          >
            <FaSignOutAlt />
            <NavLink
              to="/"
              onClick={logoutHandler}
              style={{
                color: "black",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cerrar sesión
            </NavLink>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default BurgerMenu;

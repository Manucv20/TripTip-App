import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
  const { userData, logoutHandler } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  if (!userData) {
    return <p>Cargando....</p>;
  }

  return (
    <div style={{ position: "relative", zIndex: 9999 }}>
      <button
        onClick={toggleMenu}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          border: "none",
          background: "none",
          padding: "0",
          font: "inherit",
        }}
      >
        <img
          src="/photoperfil.png"
          alt="Logo"
          style={{ width: "30px", height: "30px" }}
        />
        <span>{userData.userUsername}</span>
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white", // Cambiado a transparente
            listStyle: "none",
            padding: 0,
            margin: 0,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <li style={{ padding: 10 }}>
            <Link to="/myprofile">Ajustes</Link>
          </li>
          <li style={{ padding: 10 }}>
            <Link
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
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default BurgerMenu;

import React, { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const BurgerMenu = () => {
<<<<<<< Updated upstream:FrontEnd/src/components/BurguerMenu.jsx
  const { userData, auth, logoutHandler } = useContext(AuthContext);
=======
  const { userData, logoutHandler } = useContext(AuthContext);
>>>>>>> Stashed changes:FrontEnd/src/components/BurguerMenu.tsx
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

  return (
    <div style={{ position: "relative", zIndex: 9999 }}>
<<<<<<< Updated upstream:FrontEnd/src/components/BurguerMenu.jsx
      <button
        onClick={toggleMenu}
        style={{
          cursor: "pointer",
          border: "none",
          background: "none",
          padding: "0",
          font: "inherit",
        }}
      >
        <img
          src="/icono_usuario_header.png"
          alt="Logo"
          style={{ width: "30px", height: "30px" }}
        />
        {userData.userUsername}
=======
      <button onClick={toggleMenu}>
        {userData.userUsername}
        <FaUser />
>>>>>>> Stashed changes:FrontEnd/src/components/BurguerMenu.tsx
      </button>
      {isOpen && (
        <ul
          ref={menuRef}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "transparent", // Cambiado a transparente
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

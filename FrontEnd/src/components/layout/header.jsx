import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import BurgerMenu from "./BurguerMenu";
function Header() {
  const { auth } = useContext(AuthContext);

  const headerStyle = {
    backgroundColor: "rgb(194, 178, 128)",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginLeft: "2rem",
  };

  const logoStyle = {
    width: "60px",
    height: "60px",
  };

  const titleStyle = {
    fontSize: "30px",
    color: "white",
  };

  const loginLinkStyle = {
    color: "white",
    marginLeft: "auto",
    marginRight: "2rem",
    textDecoration: "none",
  };

  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <Link to="/">
          <img src="/icono.png" alt="Logo" style={logoStyle} />
        </Link>
        <h1 style={titleStyle}>TripTip</h1>
      </div>
      {auth ? (
        <BurgerMenu />
      ) : (
        <Link to="/login" style={loginLinkStyle}>
          Iniciar sesión
        </Link>
      )}
    </header>
  );
}

export default Header;

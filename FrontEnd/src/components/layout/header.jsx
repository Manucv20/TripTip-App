import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import BurgerMenu from "./BurguerMenu";

function Header() {
  const { auth } = useContext(AuthContext);

  const headerStyle = {
    backgroundColor: "rgb(247,247,247)",
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
    color: "black",
  };

  const loginLinkStyle = {
    color: "black",
    marginLeft: "auto",
    marginRight: "2rem",
    textDecoration: "none",
  };

  const avatarContainerStyle = {
    display: "flex",
    alignItems: "center",
  };

  const avatarStyle = {
    fontSize: "24px",
    margin: "1rem",
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
          <div style={avatarContainerStyle}>
            <FaUserCircle style={avatarStyle} />
            <span>Mi espacio personal</span>
          </div>
        </Link>
      )}
    </header>
  );
}

export default Header;

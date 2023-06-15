import { Link } from "react-router-dom";
import Auth from "./Auth";

function Header() {
  return (
    <header
      style={{
        backgroundColor: "gray",
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img
          src="/icono.png"
          alt="Logo"
          style={{ width: "60px", height: "60px", margin: "10px" }}
        />
        <h1 style={{ fontSize: "30px", color: "white" }}>TripTip</h1>
      </Link>
      <Auth />
    </header>
  );
}

export default Header;

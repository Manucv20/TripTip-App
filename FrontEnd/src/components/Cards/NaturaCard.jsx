import { Link } from "react-router-dom";

const NaturaCard = () => {
  return (
    <Link to="/natura" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
   <div style={{ ...cardStyle, backgroundSize: "cover", backgroundImage: `url("/viajes_naturaleza.jpg")` }}>
        <h3 style={titleStyle}>Natura</h3>
      </div>
    </Link>
  );
};

const cardStyle = {
  background: "#ff5900",
  width: "200px",
  height: "200px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "24px",
  color: "#ffffff",
  margin: "0",
};

export default NaturaCard;
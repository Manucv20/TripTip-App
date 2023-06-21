import { Link } from "react-router-dom";

const SenderismoCard = () => {
  return (
    <Link to="/senderismo" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div style={cardStyle}>
        <h3 style={titleStyle}>Senderismo</h3>
      </div>
    </Link>
  );
};

const cardStyle = {
  backgroundImage: `url("/viaje_senderismo.jpg")`,
  backgroundSize: "cover", // Hacer que la imagen ocupe el 100% del contenedor sin repetirse
  backgroundPosition: "center",
  width: "200px",
  height: "200px",
  borderRadius: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const titleStyle = {
  fontSize: "24px",
  color: "#FFFFFF", // Cambiar a color negro (#000000)
  margin: "0",
};

export default SenderismoCard;

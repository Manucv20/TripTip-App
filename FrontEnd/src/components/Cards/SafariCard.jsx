import { Link } from "react-router-dom";

const SafariCard = () => {
  return (
    <Link
      to="/safari"
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          ...cardStyle,
          backgroundSize: "cover",
          backgroundImage: `url("viaje_safari.jpg")`,
        }}
      >
        <h3 style={titleStyle}>Safari</h3>
      </div>
    </Link>
  );
};

const cardStyle = {
  background: "#003399",
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

export default SafariCard;

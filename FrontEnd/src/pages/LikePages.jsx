import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getVotedRecommendations } from "../services/votesRecommendation";
import { Link } from "react-router-dom";

const LikePages = () => {
  const { token, userData } = useContext(AuthContext);
  const [votedRecommendations, setVotedRecommendations] = useState([]);

  useEffect(() => {
    const fetchVotedRecommendations = async () => {
      try {
        if (token && userData?.userId) {
          // Optional chaining used here
          const response = await getVotedRecommendations(
            userData.userId,
            token
          );
          setVotedRecommendations(response);
        }
      } catch (error) {
        console.log("Error fetching voted recommendations:", error);
      }
    };

    fetchVotedRecommendations();
  }, [token, userData]);

  const containerStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
  };

  const listStyle = {
    width: "100%",
    flex: "1",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    padding: "16px",
    overflowY: "auto",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "16px",
    marginBottom: "16px", // Remove the duplicate marginBottom property
    minHeight: "250px",
    borderRadius: "15px",
    boxShadow: "0 0px 3px rgba(0, 0, 0, 0.5)",
  };

  const imageStyle = {
    width: "200px",
    height: "200px",
    marginBottom: "16px",
    objectFit: "cover",
    borderRadius: "8px",
  };

  const contentStyle = {
    flex: "1",
  };

  return (
    <div style={containerStyle}>
      <h2>Tus recomendaciones votadas:</h2>
      {votedRecommendations.length > 0 ? (
        <ul style={listStyle}>
          {votedRecommendations.map((recommendation) => {
            const { result, votes } = recommendation.recommendation;
            if (result && result.title) {
              return (
                <li key={result.id}>
                  <div
                    style={{
                      ...cardStyle,
                      ...(votedRecommendations.length === 1 && {
                        maxWidth: "400px",
                        backgroundColor: "white",
                      }),
                    }}
                  >
                    <Link
                      to={`/recommendation/${result.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img
                        src={
                          result.image
                            ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${
                                result.image
                              }`
                            : "/Subir_foto_recomendacion.jpg"
                        }
                        alt={result.title}
                        style={imageStyle}
                      />
                      <div style={contentStyle}>
                        <h3>{result.title}</h3>
                        <p>Categoría: {result.category}</p>
                        <p>Ubicación: {result.location}</p>
                        <p>Resumen: {result.summary}</p>
                        <p>Detalles: {result.details}</p>
                        <p>Fecha de creación: {result.created_at}</p>
                        <p>Votos: {votes}</p>
                      </div>
                    </Link>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      ) : (
        <p>No has votado ninguna recomendación</p>
      )}
    </div>
  );
};

export default LikePages;

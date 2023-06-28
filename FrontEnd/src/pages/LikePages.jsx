import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getVotedRecommendations } from "../services/votesRecommendation";

const LikePages = () => {
  const { token, userData } = useContext(AuthContext);
  const [votedRecommendations, setVotedRecommendations] = useState([]);

  useEffect(() => {
    const fetchVotedRecommendations = async () => {
      try {
        if (token && userData && userData.userId) {
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
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "16px",
  };

  const cardStyle = {
    width: "23%",
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "16px",
    marginBottom: "16px",
  };

  const contentStyle = {
    flex: "1",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "16px",
  };

  return (
    <div style={containerStyle}>
      {votedRecommendations.length > 0 ? (
        votedRecommendations.map((recommendation) => {
          const { result, votes } = recommendation.recommendation;
          if (result && result.title) {
            return (
              <div key={result.id} style={cardStyle}>
                {result.image && (
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND}/uploads/${
                      result.image
                    }`}
                    alt={result.title}
                    style={imageStyle}
                  />
                )}
                <div style={contentStyle}>
                  <h3>{result.title}</h3>
                  <p>Categoría: {result.category}</p>
                  <p>Ubicación: {result.location}</p>
                  <p>Resumen: {result.summary}</p>
                  <p>Detalles: {result.details}</p>
                  <p>Fecha de creación: {result.created_at}</p>
                  <p>Votos: {votes}</p>
                </div>
              </div>
            );
          }
          return null;
        })
      ) : (
        <p>No has votado ninguna recomendación</p>
      )}
    </div>
  );
};

export default LikePages;

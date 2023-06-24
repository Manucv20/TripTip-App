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

  return (
    <div>
      <h2>Recomendaciones votadas por ti:</h2>
      {votedRecommendations.length > 0 ? (
        <ul>
          {votedRecommendations.map((recommendation) => {
            const { result, votes } = recommendation.recommendation;
            if (result && result.title) {
              return (
                <li key={result.id}>
                  <h3>{result.title}</h3>
                  <p>Categoría: {result.category}</p>
                  <p>Ubicación: {result.location}</p>
                  <p>Resumen: {result.summary}</p>
                  <p>Detalles: {result.details}</p>
                  <p>Fecha de creación: {result.created_at}</p>
                  <p>Votos: {votes}</p>
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

import React, { useEffect, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  getCreatedRecommendations,
  deleteRecommendation,
} from "../services/getRecommendationsById";

const CreatedRecommendations = () => {
  const { userData, token } = useContext(AuthContext);
  const [createdRecommendations, setCreatedRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatedRecommendations = async () => {
      try {
        if (userData && userData.userId) {
          const response = await getCreatedRecommendations(userData.userId);
          setCreatedRecommendations(response.recommendations);
        }
      } catch (error) {
        console.log("Error fetching created recommendations:", error);
      }
    };

    fetchCreatedRecommendations();
  }, [userData]);

  const handleDeleteRecommendation = async (recommendationId) => {
    try {
      await deleteRecommendation(recommendationId, token);
      const updatedRecommendations = createdRecommendations.filter(
        (recommendation) => recommendation.id !== recommendationId
      );
      setCreatedRecommendations(updatedRecommendations);
      console.log("Recomendación eliminada:", recommendationId);
    } catch (error) {
      console.log("Error al eliminar la recomendación:", error);
    }
  };

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
    marginBottom: "16px",
    minHeight: "250px",
  };

  const imageStyle = {
    width: "200px",
    height: "200px",
    marginBottom: "16px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "16px",
  };

  const contentStyle = {
    flex: "1",
    minHeight: "250px",
  };

  const buttonStyle = {
    margin: "8px",
    padding: "8px",
    borderRadius: "4px",
    background: "#eee",
    border: "none",
    cursor: "pointer",
  };

  const addButtonStyle = {
    marginBottom: "16px",
    padding: "8px",
    borderRadius: "4px",
    background: "#eee",
    border: "none",
    cursor: "pointer",
  };

  const handleAddRecommendation = () => {
    navigate("/recommendations/new");
  };

  const handleEditRecommendation = (recommendationId) => {
    navigate(`/recommendation/${recommendationId}/edit`);
  };

  return (
    <section style={containerStyle}>
      <h2>Tus recomendaciones creadas:</h2>
      <button style={addButtonStyle} onClick={handleAddRecommendation}>
        Añadir Recomendación
      </button>
      {createdRecommendations.length > 0 ? (
        <ul style={listStyle}>
          {createdRecommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <div style={cardStyle}>
                <Link
                  to={`/recommendation/${recommendation.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={
                      recommendation.image
                        ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${
                            recommendation.image
                          }`
                        : "/Subir_foto_recomendacion.jpg"
                    }
                    alt={recommendation.title}
                    style={imageStyle}
                  />
                  <div style={contentStyle}>
                    <h3>{recommendation.title}</h3>
                    <p>Categoría: {recommendation.category}</p>
                    <p>Ubicación: {recommendation.location}</p>
                    <p>Fecha de creación: {recommendation.created_at}</p>
                    <p>Votos: {recommendation.votes}</p>
                  </div>
                </Link>
                <div>
                  <button
                    style={buttonStyle}
                    onClick={() => handleEditRecommendation(recommendation.id)}
                  >
                    Editar
                  </button>
                  <button
                    style={buttonStyle}
                    onClick={() =>
                      handleDeleteRecommendation(recommendation.id)
                    }
                  >
                    Borrar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No has creado ninguna recomendación</p>
      )}
    </section>
  );
};

export default CreatedRecommendations;
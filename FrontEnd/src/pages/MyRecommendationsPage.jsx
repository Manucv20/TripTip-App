import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCreatedRecommendations, deleteRecommendation, editRecommendation, createRecommendation } from "../services/getRecommendationsById";

const CreatedRecommendations = () => {
  const { userData } = useContext(AuthContext);
  const [createdRecommendations, setCreatedRecommendations] = useState([]);

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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    padding: "16px",
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
    width: "100%",
    height: "auto",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "16px",
  };

  const contentStyle = {
    flex: "1",
  };

  const handleCreateRecommendation = async () => {
    try {
      // Aquí puedes definir los datos de la nueva recomendación
      const recommendationData = {
        // Proporciona los datos necesarios para crear la recomendación
      };

      const newRecommendation = await createRecommendation(recommendationData);
      // Agrega la nueva recomendación a la lista de recomendaciones
      setCreatedRecommendations([...createdRecommendations, newRecommendation]);
      console.log("Nueva recomendación creada:", newRecommendation);
    } catch (error) {
      console.log("Error al crear la recomendación:", error);
    }
  };

  const handleEditRecommendation = async (recommendationId) => {
    try {
      // Aquí puedes obtener los datos de la recomendación que se va a editar
      // Puedes realizar una solicitud adicional a la API para obtener estos datos si es necesario
      const recommendationData = {
        // Proporciona los datos necesarios para editar la recomendación
      };

      const updatedRecommendation = await editRecommendation(recommendationId, recommendationData);
      // Actualiza la lista de recomendaciones con la recomendación editada
      const updatedRecommendations = createdRecommendations.map((recommendation) => {
        if (recommendation.id === recommendationId) {
          return updatedRecommendation;
        }
        return recommendation;
      });
      setCreatedRecommendations(updatedRecommendations);
      console.log("Recomendación editada:", recommendationId);
    } catch (error) {
      console.log("Error al editar la recomendación:", error);
    }
  };

  const handleDeleteRecommendation = async (recommendationId) => {
    try {
      await deleteRecommendation(recommendationId);
      // Actualiza la lista de recomendaciones después de borrar
      const updatedRecommendations = createdRecommendations.filter(
        (recommendation) => recommendation.id !== recommendationId
      );
      setCreatedRecommendations(updatedRecommendations);
      console.log("Recomendación borrada:", recommendationId);
    } catch (error) {
      console.log("Error al borrar la recomendación:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <button onClick={handleCreateRecommendation}>
        Crear nueva recomendación
      </button>
      <h2>Tus recomendaciones creadas:</h2>
      {createdRecommendations.length > 0 ? (
        <ul style={listStyle}>
          {createdRecommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <div style={cardStyle}>
                {recommendation.image && (
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND}/uploads/${recommendation.image}`}
                    alt={recommendation.title}
                    style={imageStyle}
                  />
                )}
                <div style={contentStyle}>
                  <h3>{recommendation.title}</h3>
                  <p>Categoría: {recommendation.category}</p>
                  <p>Ubicación: {recommendation.location}</p>
                  <p>Resumen: {recommendation.summary}</p>
                  <p>Detalles: {recommendation.details}</p>
                  <p>Fecha de creación: {recommendation.created_at}</p>
                  <p>Votos: {recommendation.votes}</p>
                </div>
                <button onClick={() => handleEditRecommendation(recommendation.id)}>
                  Editar
                </button>
                <button onClick={() => handleDeleteRecommendation(recommendation.id)}>
                  Borrar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No has creado ninguna recomendación</p>
      )}
    </div>
  );
};

export default CreatedRecommendations;

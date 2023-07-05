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
  const [currentPage, setCurrentPage] = useState(1);
  const [recommendationsPerPage] = useState(4); // Define la cantidad de recomendaciones por página
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreatedRecommendations = async () => {
      try {
        if (userData?.userId) {
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

  const paginationContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  };

  const pageButtonStyle = {
    margin: "0 4px",
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

  // Calcula el índice de la última recomendación de la página actual
  const indexOfLastRecommendation = currentPage * recommendationsPerPage;
  // Calcula el índice de la primera recomendación de la página actual
  const indexOfFirstRecommendation = indexOfLastRecommendation - recommendationsPerPage;
  // Obtiene las recomendaciones de la página actual
  const currentRecommendations = createdRecommendations.slice(
    indexOfFirstRecommendation,
    indexOfLastRecommendation
  );

  // Cambia de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section style={containerStyle}>
      <h2>Tus recomendaciones creadas:</h2>
      <button style={addButtonStyle} onClick={handleAddRecommendation}>
        Añadir Recomendación
      </button>
      {createdRecommendations.length > 0 ? (
        <>
          <ul style={listStyle}>
            {currentRecommendations.map((recommendation, index) => (
              <li key={recommendation.id}>
                <div style={{ ...cardStyle, ...(createdRecommendations.length === 1 && { maxWidth: '400px' }) }}>
                  <Link
                    to={`/recommendation/${recommendation.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={
                        recommendation.image
                          ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${recommendation.image}`
                          : "src/img/Subir_foto_recomendacion.jpg"
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
                      onClick={() => handleDeleteRecommendation(recommendation.id)}
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div style={paginationContainerStyle}>
            {/* Renderiza los números de página */}
            {Array.from({ length: Math.ceil(createdRecommendations.length / recommendationsPerPage) }).map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                style={{
                  ...pageButtonStyle,
                  fontWeight: currentPage === index + 1 ? "bold" : "normal",
                }}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <p>No has creado ninguna recomendación</p>
      )}
    </section>
  );
};

export default CreatedRecommendations;

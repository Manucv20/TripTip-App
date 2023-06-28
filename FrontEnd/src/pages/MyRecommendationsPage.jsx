import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getCreatedRecommendations } from "../services/getRecommendationsById";

const CreatedRecommendations = () => {
  const { userData } = useContext(AuthContext);
  const [createdRecommendations, setCreatedRecommendations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
    flex: "1",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    overflowY: "auto",
    padding: "16px",
  };

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    border: "1px solid #ccc",
    padding: "16px",
    marginBottom: "16px",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    marginBottom: "16px",
  };

  const contentStyle = {
    flex: "1",
  };

  const paginationMenuStyle = {
    backgroundColor: "#f9f9f9",
    borderTop: "1px solid #ccc",
    padding: "16px",
    textAlign: "center",
  };

  // Obtener el índice de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener las recomendaciones para la página actual
  const currentRecommendations = createdRecommendations.slice(
    startIndex,
    endIndex
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(createdRecommendations.length / itemsPerPage);

  // Cambiar a la página anterior
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Cambiar a la página siguiente
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div style={containerStyle}>
      <h2>Tus recomendaciones creadas:</h2>
      {currentRecommendations.length > 0 ? (
        <ul style={listStyle}>
          {currentRecommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <div style={cardStyle}>
                {recommendation.image && (
                  <img
                    src={`${import.meta.env.VITE_APP_BACKEND}/uploads/${
                      recommendation.image
                    }`}
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
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No has creado ninguna recomendación</p>
      )}

      {createdRecommendations.length > itemsPerPage && (
        <div style={paginationMenuStyle}>
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatedRecommendations;

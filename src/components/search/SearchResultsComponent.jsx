import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import defaultImage from "../../img/Subir_foto_recomendacion.jpg";

const SearchResultsComponent = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults?.data || [];

  useEffect(() => {}, [searchResults]);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8; // Define el número de tarjetas por página

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = searchResults.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <SearchComponent />
      <section className="search-results" style={containerStyle}>
        {searchResults.length > 0 ? (
          <>
            <div style={cardContainerStyle}>
              {currentCards.map((result) => (
                <div key={result.id} style={cardStyle}>
                  <img
                    src={
                      result.image
                        ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${
                            result.image
                          }`
                        : defaultImage
                    }
                    alt={result.title}
                    style={imageStyle}
                  />
                  <div style={contentStyle}>
                    <h3>{result.title}</h3>
                    <p>Categoría: {result.category}</p>
                    <p>Ubicación: {result.location}</p>
                    <p>Resumen: {result.summary}</p>
                    <p>Fecha de creación: {result.created_at}</p>
                    <button alt="Ir al detalle">
                      <Link
                        to={`/recommendation/${result.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Ir al detalle
                      </Link>
                    </button>
                    <p>Votos: {result.votes}</p>
                  </div>
                </div>
              ))}
            </div>
            {searchResults.length > cardsPerPage && (
              <div style={paginationStyle}>
                {Array(Math.ceil(searchResults.length / cardsPerPage))
                  .fill()
                  .map((_, index) => {
                    const result = searchResults[index];
                    return (
                      <button
                        alt="cambiar página"
                        key={result.id}
                        onClick={() => handlePageChange(index + 1)}
                        style={
                          currentPage === index + 1
                            ? activePageButtonStyle
                            : pageButtonStyle
                        }
                      >
                        {index + 1}
                      </button>
                    );
                  })}
              </div>
            )}
          </>
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </section>
    </>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const cardContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
  maxWidth: "100%",
};

const cardStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  borderRadius: "8px",
  border: "1px solid #ccc",
  padding: "16px",
  margin: "16px",
  width: "400px",
  backgroundColor: "white",
};

const imageStyle = {
  width: "150px",
  height: "150px",
  marginRight: "16px",
};

const contentStyle = {
  display: "flex",
  flexDirection: "column",
};

const paginationStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "16px",
};

const pageButtonStyle = {
  margin: "0 4px",
  padding: "4px 8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "transparent",
  cursor: "pointer",
};

const activePageButtonStyle = {
  ...pageButtonStyle,
  fontWeight: "bold",
  backgroundColor: "#ccc",
  margin: "",
};

export default SearchResultsComponent;

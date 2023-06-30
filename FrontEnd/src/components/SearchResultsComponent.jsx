import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchComponent from "./SearchComponent";

const SearchResultsComponent = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults?.data || [];

  useEffect(() => {
    console.log("Resultados de búsqueda:", searchResults);
  }, [searchResults]);

  return (
    <>
      <SearchComponent />
      {/* <h2>Resultados de la búsqueda:</h2> */}
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <div style={cardStyle}>
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
                  <p>Fecha de creación: {result.created_at}</p>
                  <p>Votos: {result.votes}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </>
  );
};

const cardStyle = {
  display: "flex",
  borderRadius: "8px",
  border: "1px solid #ccc",
  padding: "16px",
  marginBottom: "16px",
};

const imageStyle = {
  width: "150px",
  height: "150px",
  marginRight: "16px",
};

const contentStyle = {
  flex: "1",
};

export default SearchResultsComponent;

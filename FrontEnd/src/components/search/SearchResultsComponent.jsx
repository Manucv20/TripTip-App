import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import defaultImage from "../../../public/Subir_foto_recomendacion.jpg";

const SearchResultsComponent = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults?.data || [];

  useEffect(() => {
    console.log("Resultados de búsqueda:", searchResults);
  }, [searchResults]);

  const voteTrip = async (id) => {
    try {
      if (!auth) return navigate("/login");
      setError("");
      const vote = await voteTripUserService(id, token);
      setVotes(vote);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={containerStyle}>
      <SearchComponent />
      {searchResults.length > 0 ? (
        <div style={cardContainerStyle}>
          {searchResults.map((result) => (
            <div key={result.id} style={cardStyle}>
              <img
                src={result.image ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${result.image}` : defaultImage}
                alt={result.title}
                style={imageStyle}
              />
              <div style={contentStyle}>
                <h3>{result.title}</h3>
                <p>Categoría: {result.category}</p>
                <p>Ubicación: {result.location}</p>
                <p>Resumen: {result.summary}</p>
                <p>Fecha de creación: {result.created_at}</p>
                <p>Votos: {result.votes}</p>
                <button onClick={() => voteTrip(result.id)}>
                  <span role="img" aria-label="heart">
                    ❤️
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron resultados</p>
      )}
    </div>
  );
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
};

const cardContainerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  flexWrap: "wrap",
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

export default SearchResultsComponent;

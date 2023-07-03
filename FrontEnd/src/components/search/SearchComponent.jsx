import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/getRecommendations";

const SearchComponent = () => {
  const navigate = useNavigate();
  const [lugar, setLugar] = useState("");
  const [categoria, setCategoria] = useState("");

  const handleLugarChange = (event) => {
    setLugar(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchResults = await searchAPI(lugar, categoria);

    setLugar("");
    setCategoria("");

    navigate("/search-results", { state: { searchResults } });
  };

  const containerStyle = {
    backgroundImage: `url("/foto_header.jpg")`,
    backgroundSize: "cover",
    width: "100%",
    height: "200px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "black", margin: 0 }}>
        Miles de recomendaciones para tus viajes favoritos
      </h2>
      <div>
        <form onSubmit={handleSearch}>
          <label>
            Lugar:
            <input type="text" value={lugar} onChange={handleLugarChange} />
          </label>
          <br />
          <label>
            Categoría:
            <input
              type="text"
              value={categoria}
              onChange={handleCategoriaChange}
            />
          </label>
          <br />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;

<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAPI } from '../services/getRecomendations';

const SearchComponent = () => {
  const navigate = useNavigate();
  const [lugar, setLugar] = useState(''); // Estado para almacenar el valor del lugar
  const [categoria, setCategoria] = useState(''); // Estado para almacenar el valor de la categoría

  const handleLugarChange = (event) => {
    setLugar(event.target.value); // Actualiza el estado de lugar con el valor del campo de entrada
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value); // Actualiza el estado de categoría con el valor del campo de entrada
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // Evita que el formulario se envíe y se recargue la página

    // Llama a la función de búsqueda de la API con los valores de lugar y categoría
    const searchResults = await searchAPI(lugar, categoria);

    setLugar(''); // Restablece el estado de lugar a una cadena vacía
    setCategoria(''); // Restablece el estado de categoría a una cadena vacía

    navigate('/search-results', { state: { searchResults } }); // Navega a la página de resultados de búsqueda y pasa los resultados como estado
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Lugar:
          <input type="text" value={lugar} onChange={handleLugarChange} /> {/* Campo de entrada para el lugar */}
        </label>
        <br />
        <label>
          Categoría:
          <input type="text" value={categoria} onChange={handleCategoriaChange} /> {/* Campo de entrada para la categoría */}
        </label>
        <br />
        <button type="submit">Buscar</button> {/* Botón de búsqueda */}
      </form>
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchAPI } from "../services/getRecommendations";

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
>>>>>>> origin/dev
    </div>
  );
};

export default SearchComponent;

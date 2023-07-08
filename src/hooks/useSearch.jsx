import { useState, useEffect } from "react";
import { searchAPI } from "../services/getRecommendations";
import { useLocation, useNavigate } from "react-router-dom";

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]); // Estado para almacenar los resultados de búsqueda
  const navigate = useNavigate(); // Hook para realizar la navegación
  const location = useLocation(); // Hook para obtener la ubicación actual

  const performSearch = async (searchLocation, searchCategory) => {
    try {
      const results = await searchAPI(searchLocation, searchCategory); // Realiza la búsqueda mediante la API
      console.log("Resultados de la búsqueda:", results);

      if (results && results.data.length > 0) {
        setSearchResults(results.data); // Actualiza el estado con los resultados de búsqueda
        navigate("/search-results", {
          state: { searchResults: results.data }, // Navega a la página de resultados y pasa los resultados como estado
        });
      } else {
        setSearchResults([]); // Restablece los resultados de búsqueda a un array vacío
        navigate("/search-results", {
          state: { searchLocation, searchCategory, searchResults: null }, // Navega a la página de resultados y pasa la ubicación y categoría como estado
        });
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  useEffect(() => {
    if (
      location.state &&
      location.state.searchLocation &&
      location.state.searchCategory
    ) {
      const { searchLocation, searchCategory } = location.state;
      performSearch(searchLocation, searchCategory); // Realiza la búsqueda al cargar la página si se proporcionan la ubicación y categoría en el estado de la ubicación
    }
  }, [location.state]);

  return { searchResults, performSearch }; // Devuelve los resultados de búsqueda y la función de búsqueda
};

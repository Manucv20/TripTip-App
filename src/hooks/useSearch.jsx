import { useState } from 'react';
import { searchAPI } from '../services/getRecomendations';

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = async (lugar, categoria) => {
    try {
      const results = await searchAPI(lugar, categoria);
      setSearchResults(results);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    }
  };

  return { searchResults, performSearch };
};

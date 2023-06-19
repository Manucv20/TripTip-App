import { useState } from 'react';
import { useSearch } from '../hooks/useSearch';

const SearchComponent = () => {
  const [lugar, setLugar] = useState('');
  const [categoria, setCategoria] = useState('');
  const { searchResults, performSearch } = useSearch();

  const handleLugarChange = (event) => {
    setLugar(event.target.value);
  };

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // Evita el envío del formulario y la recarga de la página

    await performSearch(lugar, categoria); // Espera a que la búsqueda se complete antes de continuar

    // Limpia los campos de búsqueda después de realizar la búsqueda
    setLugar('');
    setCategoria('');
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>
          Lugar:
          <input type="text" value={lugar} onChange={handleLugarChange} />
        </label>
        <br />
        <label>
          Categoría:
          <input type="text" value={categoria} onChange={handleCategoriaChange} />
        </label>
        <br />
        <button type="submit">Buscar</button>
      </form>

{/*       <h2>Resultados:</h2>
      {searchResults.length > 0 ? (
        searchResults.map((result) => <div key={result.id}>{result.name}</div>)
      ) : (
        <p>No se encontraron resultados.</p>
      )} */}
    </div>
  );
};

export default SearchComponent;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResultsComponent = () => {
    const location = useLocation();
    const searchResults = location.state?.searchResults?.data || []; // Obtiene los resultados de búsqueda del estado de la ubicación

    useEffect(() => {
        console.log('Resultados de búsqueda:', searchResults); // Imprime los resultados de búsqueda en la consola cuando cambian
    }, [searchResults]);

    return (
        <div>
            <h2>Resultados de la búsqueda:</h2>
            {searchResults.length > 0 ? (
                <ul>
                    {searchResults.map((result) => (
                        <li key={result.id}>
                            <h3>{result.title}</h3>
                            <p>Categoría: {result.category}</p>
                            <p>Ubicación: {result.location}</p>
                            <p>Resumen: {result.summary}</p>
                            <p>Detalles: {result.details}</p>
                            <p>Fecha de creación: {result.created_at}</p>
                            <p>Votos: {result.votes}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No se encontraron resultados</p>
            )}
        </div>
    );
};

export default SearchResultsComponent;

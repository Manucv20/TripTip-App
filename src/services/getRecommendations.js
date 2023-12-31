
export const searchAPI = async (location, category) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_APP_BACKEND
    }/recommendations?category=${category}&location=${location}`
  ); // Realiza una solicitud a la API para buscar recomendaciones en función de la ubicación y categoría proporcionadas
  const data = await response.json(); // Extrae los datos de la respuesta en formato JSON
  return data || []; // Devuelve los datos o un array vacío si no hay datos
};

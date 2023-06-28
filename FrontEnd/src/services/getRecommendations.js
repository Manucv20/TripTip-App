export const searchAPI = async (location, category) => {
  const response = await fetch(
    `http://localhost:3000/recommendations?category=${category}&location=${location}`
  ); // Realiza una solicitud a la API para buscar recomendaciones en función de la ubicación y categoría proporcionadas
  const data = await response.json(); // Extrae los datos de la respuesta en formato JSON
  console.log(data); // Imprime los datos en la consola
  return data || []; // Devuelve los datos o un array vacío si no hay datos
};

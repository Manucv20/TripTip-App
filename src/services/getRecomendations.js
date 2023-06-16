export const searchAPI = async (location, category) => {
  const response = await fetch(
    `http://localhost:3000/recommendations?category=${category}&location=${location}`
  );
  const data = await response.json();
  return data.results; // Assuming the results are located in the "results" property of the response object
};
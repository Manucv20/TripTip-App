import axios from "axios";
export const getCreatedRecommendations = async (userId) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/users/${userId}/recommendations`
    );

    const createdRecommendations = response.data;

    return createdRecommendations;
  } catch (error) {
    console.error("Error fetching created recommendations:", error);
    throw new Error("Error fetching created recommendations");
  }
};

export const getRecommendationById = async (recommendationId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}/recommendation/${recommendationId}`);
    const recommendation = response.data;
    return recommendation;
  } catch (error) {
    console.error("Error al obtener la recomendación:", error);
    throw new Error("Error al obtener la recomendación");
  }
};

export const editRecommendation = async (
  recommendationId,
  recommendationData,
  token
) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND}/recommendations/${recommendationId}`,
      recommendationData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const updatedRecommendation = response.data;
    return updatedRecommendation;
  } catch (error) {
    console.error("Error al actualizar la recomendación:", error);
    throw new Error("Error al actualizar la recomendación");
  }
};

export const deleteRecommendation = async (recommendationId, token) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND}/recommendations/${recommendationId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message);
    }

    const deletedRecommendation = json.data;

    return deletedRecommendation;
  } catch (error) {
    throw new Error("Error deleting recommendation: " + error.message);
  }
};

export const createRecommendation = async (recommendationData, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/recommendations`,
      recommendationData,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const createdRecommendation = response.data;

    return createdRecommendation;
  } catch (error) {
    console.error("Error creating recommendation:", error);
    throw new Error("Error creating recommendation");
  }
};


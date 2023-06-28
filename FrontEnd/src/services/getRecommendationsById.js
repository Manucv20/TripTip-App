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

export const editRecommendation = async (recommendationId, recommendationData) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/recommendations/${recommendationId}`,
      recommendationData
    );

    const updatedRecommendation = response.data;

    return updatedRecommendation;
  } catch (error) {
    console.error("Error editing recommendation:", error);
    throw new Error("Error editing recommendation");
  }
};

export const deleteRecommendation = async (recommendationId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/recommendations/${recommendationId}`
    );

    const deletedRecommendation = response.data;

    return deletedRecommendation;
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    throw new Error("Error deleting recommendation");
  }
};

export const createRecommendation = async (recommendationData) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/recommendations",
      recommendationData
    );

    const createdRecommendation = response.data;

    return createdRecommendation;
  } catch (error) {
    console.error("Error creating recommendation:", error);
    throw new Error("Error creating recommendation");
  }
};

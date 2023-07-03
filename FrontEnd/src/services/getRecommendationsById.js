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

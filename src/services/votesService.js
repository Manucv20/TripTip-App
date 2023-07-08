import axios from "axios";

export const voteRecommendationService = async (recommendationId, userId, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_BACKEND}/votes/${recommendationId}`,
      { userId },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const { message, votes } = response.data;

    return { message, votes };
  } catch (error) {
    console.error("Error voting recommendation:", error);
    throw new Error("Error voting recommendation");
  }
};

export const deleteVoteRecommendationService = async (recommendationId, userId, token) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_APP_BACKEND}/users/${userId}/votes/${recommendationId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    const { message, votes } = response.data;

    return { message, votes };
  } catch (error) {
    console.error("Error deleting vote:", error);
    throw new Error("Error deleting vote");
  }
};

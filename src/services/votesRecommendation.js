import axios from "axios";

export const getVotedRecommendations = async (userId, token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BACKEND}/users/${userId}/votes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const votedRecommendations = response.data;

    const promises = votedRecommendations.map(async (votedRecommendation) => {
      let recommendationId = votedRecommendation.recommendation_id;
      let value = votedRecommendation.value;

      if (value !== 1) {
        return null;
      }

      const recommendationResponse = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/recommendation/${recommendationId}`
      );
      return recommendationResponse.data;
    });

    const recommendations = await Promise.all(promises);

    // Filtrar las recomendaciones nulas
    const filteredRecommendations = recommendations.filter(
      (recommendation) => recommendation !== null
    );

    return filteredRecommendations;
  } catch (error) {
    throw new Error("Error fetching voted recommendations");
  }
};
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

    const { value } = votedRecommendations[0];

    if (value !== 1) {
      return 0;
    }

    const promises = votedRecommendations.map(async (votedRecommendation) => {
      let recommendationId = votedRecommendation.recommendation_id;

      const recommendationResponse = await axios.get(
        `${import.meta.env.VITE_APP_BACKEND}/recommendation/${recommendationId}`
      );
      return recommendationResponse.data;
    });

    const recommendations = await Promise.all(promises);

    return recommendations;
  } catch (error) {
    throw new Error("Error fetching voted recommendations");
  }
};

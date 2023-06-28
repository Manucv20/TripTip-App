import axios from "axios";

export const getVotedRecommendations = async (userId, token) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/users/${userId}/votes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const votedRecommendations = response.data;

    const promises = votedRecommendations.map(async (votedRecommendation) => {
      let recommendationId = votedRecommendation.recommendation_id;

      const recommendationResponse = await axios.get(
        `http://localhost:3000/recommendation/${recommendationId}`
      );
      return recommendationResponse.data;
    });

    const recommendations = await Promise.all(promises);

    return recommendations;
  } catch (error) {
    throw new Error("Error fetching voted recommendations");
  }
};

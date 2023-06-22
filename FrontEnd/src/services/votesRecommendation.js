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
    console.log("Voted Recommendations:", votedRecommendations); // Agregado console.log

    const promises = votedRecommendations.map(async (votedRecommendation) => {
      let recommendationId = votedRecommendation.recommendation_id;
      console.log("Fetching recommendation with ID:", recommendationId); // Agregado console.log
      const recommendationResponse = await axios.get(
        `http://localhost:3000/recommendation/${recommendationId}`
      );
      return recommendationResponse.data;
    });

    const recommendations = await Promise.all(promises);
    console.log("Fetched Recommendations:", recommendations); // Agregado console.log

    return recommendations;
  } catch (error) {
    throw new Error("Error fetching voted recommendations");
  }
};


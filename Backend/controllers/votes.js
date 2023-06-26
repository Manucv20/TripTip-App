const { createVotes } = require("../db/votes");
const { getRecommendationById } = require("../db/recommendations");
const { token } = require("morgan");

const NewVoteController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recommendation = await getRecommendationById(id);

    // Añadir una votación en una recomendación
    const { success, votes } = await createVotes(
      req.userId,
      recommendation[0].result.id
    );

    let message;
    if (success) {
      message = "¡Excelente elección! Te ha gustado la recomendación.";
    } else {
      message = `¿Cambiaste de opinión? Has quitado tu "me gusta" de la recomendación.`;
    }

    res.send({
      status: "OK",
      message,
      votes,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  NewVoteController,
};

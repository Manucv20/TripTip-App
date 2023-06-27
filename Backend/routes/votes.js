const express = require("express");
const router = express.Router();
const { NewVoteController, getVotedRecommendationsController } = require("../controllers/votes");
const { authUser } = require("../middlewares/auth");

// Crear un nuevo voto
router.post("/votes/:id", authUser, NewVoteController);

// Ruta para obtener los votos realizados por un usuario
router.get(
  "/users/:user_id/votes",
  getVotedRecommendationsController
);

module.exports = router;

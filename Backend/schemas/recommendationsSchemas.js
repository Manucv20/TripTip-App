const Joi = require("joi");

const newRecommendationSchema = Joi.object({
  title: Joi.string().required(),
  category: Joi.string().required(),
  location: Joi.string().required(),
  summary: Joi.string().required(),
  details: Joi.string().required(),
});

const updateRecommendationSchema = Joi.object({
  title: Joi.string().allow(null),
  category: Joi.string().allow(null),
  location: Joi.string().allow(null),
  summary: Joi.string().allow(null),
  details: Joi.string().allow(null),
});

const idRecommendationSchema = Joi.object({
  id: Joi.number().integer().required(),
});

const getRecommendationsByLocationAndCategorySchema = Joi.object({
  location: Joi.string().allow(""),
  category: Joi.string().allow(""),
});

module.exports = {
  newRecommendationSchema,
  idRecommendationSchema,
  getRecommendationsByLocationAndCategorySchema,
  updateRecommendationSchema,
};
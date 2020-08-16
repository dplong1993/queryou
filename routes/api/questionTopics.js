const express = require('express');
const router = express.Router();
const {routeHandler, handleValidationErrors} = require("../utils");
const { Op } = require("sequelize");

const db = require('../../db/models');
const { Topic, QuestionTopic } = db;

router.get("/", routeHandler(async(req, res) => {
  const questionTopics = await QuestionTopic.findAll({include: {model: Topic}});
  res.json({questionTopics});
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const {routeHandler, handleValidationErrors} = require("../utils");
const { Op } = require("sequelize");

const db = require('../../db/models');
const { Answer, Question } = db;
const csrfProtection = require('csurf')({cookie: true});

const {check} = require('express-validator');
const { sequelize } = require('../../db/models');


// //Get the current user id
// router.get('/user', routeHandler(async (req, res, next) => {
//   res.json({id: req.user.id});
// }));

const validateAnswer = [
  check("content")
    .exists()
    .isLength({ min: 1, max: 5000})
]

router.post("/",
  validateAnswer,
  csrfProtection,
  handleValidationErrors,
  routeHandler(async(req, res) => {
    const { content, questionId} = req.body;
    const ownerId = req.user.id;

    const answer = await Answer.create({content, questionId, ownerId});

    res.json({ answer });
}));

router.get("/", routeHandler(async(req, res) => {
  const questions = await Question.findAll({include: {model: Answer}});
  res.json({questions});
}));

module.exports = router;

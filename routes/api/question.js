const express = require('express');
const router = express.Router();
const {routeHandler, handleValidationErrors} = require("../utils");
const { Op } = require("sequelize");

const db = require('../../db/models');
const { Answer, Question } = db;
const csrfProtection = require('csurf')({cookie: true});

const {check} = require('express-validator');
const { sequelize } = require('../../db/models');

const validateQuestion = [
  check("content")
    .exists()
    .isLength({ min: 1, max: 5000})
]

router.post("/",
  validateQuestion,
  csrfProtection,
  handleValidationErrors,
  routeHandler(async(req, res) => {
    const { content } = req.body;
    const ownerId = req.user.id;

    const question = await Question.create({content, ownerId});

    res.json({ question });
}));

module.exports = router;

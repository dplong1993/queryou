const express = require('express');
const router = express.Router();
const {routeHandler, handleValidationErrors} = require("../utils");
const { Op } = require("sequelize");

const bcrypt = require('bcryptjs');
const {expiresIn} = require('../../config').jwtConfig;
const db = require('../../db/models');
const { User, Question } = db;
const { getUserFromToken } = require('../utils/auth');
const csrfProtection = require('csurf')({cookie: true});

const {check} = require('express-validator');
const { sequelize } = require('../../db/models');

//get route
router.get('/', routeHandler(async (req, res, next) => {
  const token = req.cookies.token;
  const user = await getUserFromToken(token);
  const questions = await Question.findAll({
    where: {
      ownerId: {
        [Op.not]: user.id
      }
    }
  })
  res.json({questions});
}));


module.exports = router;

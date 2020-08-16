const express = require('express');
const router = express.Router();
const { routeHandler } = require("../utils");

const { expiresIn } = require('../../config').jwtConfig;
const db = require('../../db/models');
const { Topic, UserTopic } = db;
const { getUserToken, getUserFromToken } = require('../utils/auth');
const csrfProtection = require('csurf')({ cookie: true });


router.get('/', routeHandler(async (req, res, next) => {
  const token = req.cookies.token;
  const user = await getUserFromToken(token);
  const topics = await Topic.findAll();

  res.json({ id: user.id, topics: topics });
}));


//signup route
router.post('/',
  csrfProtection,
  routeHandler(async (req, res, next) => {
    const bodyArray = req.body;
    for (let topic of bodyArray.requests) {
      const previousEntry = await UserTopic.findOne({ where: { userId: topic.userId, topicId: topic.topicId } });;
      if (!previousEntry) {
        UserTopic.create({ userId: topic.userId, topicId: topic.topicId });
      }
    }
    res.redirect("../");
  }));



module.exports = router;

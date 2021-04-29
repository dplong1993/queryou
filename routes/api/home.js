const express = require("express");
const router = express.Router();
const { routeHandler } = require("../utils");
const { Op } = require("sequelize");
const { expiresIn } = require("../../config").jwtConfig;
const db = require("../../db/models");
const { Topic, UserTopic, Answer, Question, User } = db;
const { getUserToken, getUserFromToken } = require("../utils/auth");
const csrfProtection = require("csurf")({ cookie: true });

router.get(
  "/",
  routeHandler(async (req, res, next) => {
    const token = req.cookies.token;
    const user = await getUserFromToken(token);

    // Fetch all the data
    let userTopics = await UserTopic.findAll({
      where: { userId: Number(user.id) },
      include: { model: Topic },
    });
    let questions = await Question.findAll({
      where: { ownerId: { [Op.ne]: user.id } },
    });
    let questionIds = questions.map((el) => el.dataValues.id);
    let answers = await Answer.findAll({
      where: { questionId: { [Op.in]: questionIds } },
    });
    let userProfile = await User.findByPk(user.id);
    let answerProfile = await User.findByPk(2);

    // Normalize the data so its easier to work with
    userTopics = userTopics.map((el) => {
      el.dataValues.Topic = el.dataValues.Topic.dataValues;
      return el.dataValues;
    });
    questions = questions.map((el) => el.dataValues);
    answers = answers.map((el) => el.dataValues);
    userProfile = userProfile.dataValues;
    answerProfile = answerProfile.dataValues;
    console.log(userProfile, answerProfile);

    res.json({
      id: user.id,
      userTopics: userTopics,
      answers,
      questions,
      userProfile,
      answerProfile,
    });
  })
);

//follow route
router.post(
  "/follow",
  csrfProtection,
  routeHandler(async (req, res, next) => {
    const { userId, topicId } = req.body;

    const previousEntry = await UserTopic.findOne({
      where: { userId: userId, topicId: topicId },
    });
    if (!previousEntry) {
      UserTopic.create({ userId: userId, topicId: topicId });
    }
    res.json();
  })
);
//unfollow route
router.post(
  "/unfollow",
  csrfProtection,
  routeHandler(async (req, res, next) => {
    const { userId, topicId } = req.body;

    const previousEntry = await UserTopic.findOne({
      where: { userId: userId, topicId: topicId },
    });
    if (previousEntry) {
      previousEntry.destroy();
    }
    res.json();
  })
);

router.post(
  "/new",
  csrfProtection,
  routeHandler(async (req, res, next) => {
    const { ownerId, name, description } = req.body;
    const previousEntry = await Topic.findOne({ where: { name: name } });
    if (!previousEntry) {
      Topic.create({ ownerId, name, description });
      const newEntry = await Topic.findOne({ where: { name: name } });
      // res.redirect(`/${newEntry.id}`);
    }
    res.json();
  })
);

// router.get('/',
// csrfProtection,
// routeHandler(async (req, res, next) => {
//     const id = req.params.id

//     const previousEntry = await Topic.findOne({ where: { name: name} });
//     if (!previousEntry) {
//         Topic.create({ownerId, name, description});
//         const newEntry = await Topic.findOne({ where: { name: name} });
//     res.redirect(`/${newEntry.id}`);
//     }
//     res.json();
// }));

module.exports = router;

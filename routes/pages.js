const express = require('express');
const router = express.Router();

const db = require("../db/models");
const { getUserFromToken } = require('./utils/auth');
const { Op } = require('sequelize');
const { routeHandler } = require('./utils');
const {User, Question, Topic, Answer, QuestionTopic} = db;

const csrfProtection = require('csurf')({cookie: true});

//Login/signup page router
router.get('/login_signup', csrfProtection, (req, res) => {
  if(req.user) res.redirect('/home');
  res.render('login_signup', { csrf: req.csrfToken()});
});

router.get('/interests', csrfProtection, (req, res)=>{
  res.render('interests', {csrf: req.csrfToken()});
});


const getQuestions = async (user) => {
  return await Question.findAll({
    where: {
      ownerId: {
        [Op.not]: user.id
      }
    }
  });
}

const createTimestamps = (questions) => {
  for(let question of questions){
    const createdAt = new Date(question.createdAt);
    const timeOptions = {
      minute: "numeric",
      hour: "numeric",
    };

    const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    const timestamp =
      createdAt.toLocaleString("en-US", timeOptions) +
      " · " +
      createdAt.toLocaleString("en-US", dateOptions);

    question.timestamp = timestamp;
  }
}

//Queries page router
router.get('/queries', csrfProtection, routeHandler(async(req, res) => {
  if(!req.user) res.redirect('/login_signup');

  const questions = await getQuestions(req.user);

  createTimestamps(questions);
  res.render("queries.pug", { user: req.user, questions, csrf: req.csrfToken() });
}));

//Topics page router
router.get('/topics',
  csrfProtection,
  routeHandler(async (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("topics.pug",
   {csrf: req.csrfToken(), user: req.user }
   );
}));

//Notifications page router
router.get('/notifications', csrfProtection, (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("notifications.pug", { user: req.user, csrf: req.csrfToken() });
});

//Profile page router
router.get('/profile', csrfProtection, (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("profile.pug", { user: req.user, csrf: req.csrfToken() });
});

//Home page router
router.get('/home', csrfProtection, (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render('home', { user: req.user, csrf: req.csrfToken() });
});

router.get('/:id',
  csrfProtection,
  routeHandler(async(req, res) => {
  if(!req.user) res.redirect('/login_signup');

  const contentWithDash = req.params.id;
  console.log(contentWithDash);
  const content = contentWithDash.split('-').join(' ').concat('?');

  const question = await Question.findOne(
    {
      where: {content: content},
      include: [
        {
          model: QuestionTopic,
          include:
          {
            model: Topic
          }
        },
        {
          model: Answer,
          include:
          {
            model: User
          }
        }
      ]});
  // console.log(question, question.QuestionTopics[0].Topic.name);
  res.render("questionContent.pug", { user: req.user, question, csrf: req.csrfToken() });

}));



//Catch all for routes we have not defined
router.get('*', (req, res) => {
  res.render('error-page');
})


module.exports = router;

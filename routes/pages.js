const express = require('express');
const router = express.Router();

const db = require("../db/models");
const { getUserFromToken } = require('./utils/auth');
const { Op } = require('sequelize');
const { routeHandler } = require('./utils');
const {User, Question} = db;

const csrfProtection = require('csurf')({cookie: true});

//Login/signup page router
router.get('/login_signup', csrfProtection, (req, res) => {
  if(req.user) res.redirect('/');
  res.render('login_signup', { csrf: req.csrfToken()});
});

router.get('/interests', csrfProtection, (req, res)=>{
  res.render('interests', {csrf: req.csrfToken()});
});


//Queries page router
router.get('/queries', csrfProtection, routeHandler(async(req, res) => {
  if(!req.user) res.redirect('/login_signup');
  const questions = await Question.findAll({
    where: {
      ownerId: {
        [Op.not]: req.user.id
      }
    }
  });
  for(let question of questions){
    const createdAt = new Date(question.createdAt);
    const dateOptions = {
        year: "numeric",
        month: "short",
        day: "numeric"
    };
    const timestamp = createdAt.toLocaleString("en-US", dateOptions);
    question.timestamp = timestamp;
  }
  res.render("queries.pug", { questions, csrf: req.csrfToken() });
}));

//Topics page router
router.get('/topics', (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("topics.pug");
});

//Notifications page router
router.get('/notifications', (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("notifications.pug");
});

//Profile page router
router.get('/profile', (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("profile.pug");
});

//Home page router
router.get('/', (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render('home');
});

//Catch all for routes we have not defined
router.get('*', (req, res) => {
  res.render('error-page');
})


module.exports = router;

const express = require('express');
const router = express.Router();

const csrfProtection = require('csurf')({cookie: true});

//Login/signup page router
router.get('/login_signup', csrfProtection, (req, res) => {
  if(req.user) res.redirect('/');
  res.render('login_signup', { csrf: req.csrfToken()});
});

//Queries page router
router.get('/queries', (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("queries.pug");
});

//Topics page router
router.get('/topics', (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("topics.pug");
});

//Queries page router
router.get('/notifications', (req, res) => {
  if(!req.user) res.redirect('/login_signup');
  res.render("notifications.pug");
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

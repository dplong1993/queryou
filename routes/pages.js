const express = require('express');
const router = express.Router();

const csrfProtection = require('csurf')({cookie: true});

//Home page route
router.get('/', (req, res) => {
  // if(!req.user) res.redirect('/login_signup');
  if(!req.user) res.redirect('/login_signup');
  res.render('home');
});

//Login page route
// router.get('/login', csrfProtection, (req, res) => {
//   if(req.user) res.redirect('/');
//   res.render('login', { csrf: req.csrfToken()});
// });

//Signup page route
// router.get('/signup', csrfProtection, (req, res) => {
// router.get('/login', csrfProtection, (req, res) => {
//   if(req.user) res.redirect('/');
//   res.render('login', { csrf: req.csrfToken()});
// });

// router.get('/signup', csrfProtection, (req, res) => {
//   if(req.user) res.redirect('/');
//   res.render('signup', { csrf: req.csrfToken()});
// });

router.get('/login_signup', csrfProtection, (req, res) => {
  if(req.user) res.redirect('/');
  res.render('login_signup', { csrf: req.csrfToken()});
});

//Catch all for routes we have not defined
router.get('*', (req, res) => {
  res.render('error-page');
})


module.exports = router;

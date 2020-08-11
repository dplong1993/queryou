const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  if(req.user) res.redirect('/');
  res.render('login');
});

router.get('/signup', (req, res) => {
  if(req.user) res.redirect('/');
  res.render('signup');
});

router.get('*', (req, res) => {
  res.render('error-page');
})


module.exports = router;

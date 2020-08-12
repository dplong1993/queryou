const express = require('express');
const router = express.Router();

const csrfProtection = require('csurf')({cookie: true});

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

router.get('/interests', csrfProtection, (req, res)=>{
  res.render('interests', {csrf: req.csrfToken()});
});


router.get('*', (req, res) => {
  res.render('error-page');
})


module.exports = router;

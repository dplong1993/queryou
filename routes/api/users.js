const express = require('express');
const router = express.Router();
const {routeHandler, handleValidationErrors} = require("../utils");

const bcrypt = require('bcryptjs');
const {expiresIn} = require('../../config').jwtConfig;
const db = require('../../db/models');
const { User } = db;
const { getUserToken } = require('../utils/auth');
const csrfProtection = require('csurf')({cookie: true});

const {check} = require('express-validator');

const validateEmail = [
  check("email", "Email field must be a valid email")
    .exists()
    .isEmail()
]

const validateAuthFields = [
  check("username", "Username field must be between 5 and 100 characters")
    .exists()
    .isLength({min: 5, max: 100}),
  check("firstName", "FirstName field must be between 1 and 100 characters")
    .exists()
    .isLength({min: 1, max: 100}),
  check("lastName", "LastName field must be between 1 and 100 characters")
    .exists()
    .isLength({min: 1, max: 100}),
  check("description", "Description field must be between 5 and 5000 characters")
    .exists()
    .isLength({min:1, max:5000}),
  check("password", "Password field must be 6 or more characters")
    .exists()
    .isLength({min: 6, max: 100}),
  check("password2", 'Confirm password field must have the same value as the password field')
    .exists()
    .custom((value, {req}) => value === req.body.password),
]

//signup route
router.post('/',
  csrfProtection,
  validateEmail,
  validateAuthFields,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
  const { email, username, firstName, lastName, description, password} = req.body;

  const user = await User.create({
    email,
    username,
    firstName,
    lastName,
    description,
    hashedPassword: bcrypt.hashSync(password, 10)
  });

  const token = getUserToken(user);
  res.cookie('token', token, {maxAge: expiresIn*1000});
  res.json({id: user.id, token})
}));

//login_signup route
router.post('/token',
  csrfProtection,
  validateEmail,
  handleValidationErrors,
  routeHandler(async (req, res, next) => {
  // res.json({message: "test"});
  console.log('in /token');
  const {email, password} = req.body;
  const user = await User.findOne({
    where: {email}
  });
  console.log(user);
  if(!user || !user.validatePassword(password)) {
    const err = new Error("Invalid email/password combination");
    err.status = 401;
    err.title = "Unauthorized";
    throw err;
  }

  const token = getUserToken(user);
  res.cookie('token', token, {maxAge: expiresIn*1000});
  res.json({id: user.id, token})
  })
);

//Deletes a user's token to log them out
router.delete('/session', routeHandler(async(req,res) => {
  res.clearCookie('token');
  res.json({ message: 'success' });
}));

//Confirm that the user in the cookie is us
router.get('/token', routeHandler(async (req, res, next) => {
  //If there is a user on the request then send this response
  if(req.user) {
    return await res.json({
      id: req.user.id,
      username: req.user.username
    });
  }
  //Otherwise throw a Invalid token error
  const err = new Error('Invalid token');
  err.status = 401;
  next(err);
}));

//Get the current user info
router.get('/', (req, res) => {
  res.json({user: req.user});
});

module.exports = router;

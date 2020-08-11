const express = require('express');
const app = express();
const morgan = require('morgan');
const csrfProtection = require('csurf')({ cookie: true });
const apiRouter = require('./routes/api');
const pagesRouter = require('./routes/pages');

app.use(morgan('dev'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
// app.use(csrfProtection);

app.use((req, res, next) => {
  res.setTimeout(1000);
  req.setTimeout(1000);
  next();
});

const { getUserFromToken } = require('./routes/utils/auth');

//Sets up key of user on all reqs if there is a token in the cookies
// and sets the value of the key to the user the token corresponds to.
app.use(async (req, res, next) => {
  //Get the token from cookies
  const token = req.cookies.token;

  //If there is no token in cookies go to next middleware
  if (!token) return next();

  //There is token in cookies, so get the user associated with that token
  const user = await getUserFromToken(token);

  //If getting user was successful, set key of user on req to the fetched user
  if(user) req.user = user;

  next();
});


app.use('/public', express.static('public'));
app.use('/api', apiRouter);
app.use('/', pagesRouter);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;

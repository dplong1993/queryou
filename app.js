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

app.use('/public', express.static('public'));
app.use('/api', apiRouter);
app.use('/', pagesRouter);

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;

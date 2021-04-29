var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const characters = require('./routes/characters');
const users = require('./routes/users');
const films = require('./routes/films');
const auth = require('./routes/auth');
const jwt = require('./middlewares/jwtMiddleware')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/characters', jwt ,characters);
app.use('/users', users);
app.use('/films', films);
app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

//errors
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;

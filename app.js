var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbSetup = require('./db_setup');
var firebase = require('firebase');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var courseRouter = require('./routes/course');
const e = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set user
app.use(function(req, res, next) {
  var user = firebase.auth().currentUser;
  res.locals.user = null;
  if(user) {
    var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          res.locals.user = data[rno];
        }
      }
    });
    res.locals.userEmail = user;
  }
    
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/course', courseRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.jade');
});



module.exports = app;

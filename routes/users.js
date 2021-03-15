var express = require('express');
var router = express.Router();
//var database = require('../db_setup');
var database = require('firebase');
var admin = require('../db_admin_setup');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/student/login', function(req,res,next){
  res.render('users/studentLogin');
});

router.get('/faculty/login', function(req,res,next){
  res.render('users/facultyLogin');
});

router.post('/student/new', function(req,res,next) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(password != password2) {
    // --------------------- ERROR -----------------------
    // password not matching
  }

  if(password.length < 6) {
    // --------------------- ERROR -----------------------
    // password length not sufficient
  }

  admin.auth().createUser({
    email: email,
    password: password
  }).then(function(userRecord) {
    console.log(userRecord);
    res.redirect("/users/student/login");
  });
});


module.exports = router;

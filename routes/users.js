var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = require('firebase-admin');

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

router.get('/student/profile', function(req,res,next){
  res.render('users/studentProfile');
});

router.get('/faculty/profile', function(req,res,next){
  res.render('users/facultyProfile');
});

router.post('/student/new', function(req,res,next) {
  console.log(req.body);
  var rno = req.body.rno;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  console.log(rno);

  if(password != password2) {
    // --------------------- ERROR -----------------------
    // password not matching
  }

  if(password.length < 6) {
    // --------------------- ERROR -----------------------
    // password length not sufficient
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      //console.log(newUser);
    });
  
  firebase.database().ref('users/' + rno).set({
    rollNumber: rno,
    email: email,
    password: password,
    type: "Student"
  });
  
    res.redirect("/");
});

router.post('/student/login', function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user);
    res.redirect("/");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
});


module.exports = router;

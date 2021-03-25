var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var admin = firebase.database();


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
  });

  firebase.auth.createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      console.log(newUser);
    });
  
    res.redirect("/users/student/login");
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

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

router.get('/student/profile/edit',function(req,res,next){
  res.render('users/studentEditProfile')
});

router.get('/faculty/profile/edit',function(req,res,next){
  res.render('users/facultyEditProfile')
});

router.get('/faculty/login', function(req,res,next){
  res.render('users/facultyLogin');
});

router.get('/student/profile', function(req,res,next){
  var profileInformation = {
    name: "Hello",
    rno: "GR18304"
  }
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });

  res.render('users/studentProfile',{profileInformation: profileInformation});
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
    res.send("Password not matching");
    // --------------------- ERROR -----------------------
    // password not matching
  }

  if(password.length < 6) {
    res.send("password should be greater than 6 characters");
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
    console.log(user.email);
    res.locals.user = null;
    if(user) {
      var users = firebase.database().ref('/users');
      users.on('value', (snapshot) => {
        var data = snapshot.val();
        for(var rno in data) {
          var em = data[rno].email;
          if(em.localeCompare(user.email) == 0) {
            res.locals.user = data[rno];
            console.log("AEdsfdbg");
          }
        }
      });
      res.locals.userEmail = user;
    }
      console.log(res.locals.user);
      setTimeout(function () {
        res.redirect("/");
      }, 2500)
      
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorMessage);
  });
});

router.post('/faculty/login', function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.email);
    res.locals.user = null;
    if(user) {
      var users = firebase.database().ref('/users');
      users.on('value', (snapshot) => {
        var data = snapshot.val();
        for(var id in data) {
          var em = data[id].email;
          if(em.localeCompare(user.email) == 0) {
            res.locals.user = data[id];
            console.log("AEdsfdbg");
          }
        }
      });
      res.locals.userEmail = user;
    }
      console.log(res.locals.user);
      setTimeout(function () {
        res.redirect("/");
      }, 2500)
      
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorMessage);
  });
});



router.get("/faculty/signup", function(req,res,next){
  res.render("users/facultySignup");
});

router.post("/faculty/signup", function(req,res,next){
  var facID = req.body.facid;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(password != password2) {
    res.send("Password not matching");
    // --------------------- ERROR -----------------------
    // password not matching
  }

  if(password.length < 6) {
    res.send("password should be greater than 6 characters");
    // --------------------- ERROR -----------------------
    // password length not sufficient
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      //console.log(newUser);
    });
  
  firebase.database().ref('users/' + facID).set({
    facultyID: facID,
    email: email,
    type: "Faculty"
  });
  
    res.redirect("/");
});

// router.post("/student/update", function(req,res,next){
  // var data = req.data;
  // // name, "changed name", roll number
  // firebase.database().ref('users/' + rno).set({
  //   rollNumber: rno,
  //   email: email,
  //   type: "Student",
  //   name: name
  // });

// });


module.exports = router;

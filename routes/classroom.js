var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();

router.get("/", function(req,res,next){
  
  res.render('classroom/Landing');
});

router.get("/class", function(req,res,next){ 
  res.render('classroom/class');
});

router.get("/details", function(req,res,next){
  console.log("I'm here");  
  res.render('classroom/details');
});

module.exports = router;  
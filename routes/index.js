var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/student/login', function(req,res,next){
  res.render('studentLogin');
});

router.get('/faculty/login', function(req,res,next){
  res.render('facultyLogin');
});

module.exports = router;

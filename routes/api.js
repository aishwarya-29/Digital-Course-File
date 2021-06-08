var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();

router.post("/course/:id", function(req,res,next){
    var courseID = req.params.id;
    var ref = firebase.database().ref('/course/' + courseID);
        ref.on('value', (snapshot) => {
        res.send(snapshot.val());
    });
});

router.post("/course/:id", function(req,res,next){
    var courseID = req.params.id;
    var ref = firebase.database().ref('/course/' + courseID);
        ref.on('value', (snapshot) => {
        var data = snapshot.val();
        console.log(data);
        res.send(snapshot.val());
    });
});

router.get("/course/:id", function(req,res,next){
    var courseID = req.params.id;
    var ref = firebase.database().ref('/course/' + courseID);
        ref.on('value', (snapshot) => {
        var data = snapshot.val();
        console.log(data);
        res.send(snapshot.val());
    });
});


module.exports = router;
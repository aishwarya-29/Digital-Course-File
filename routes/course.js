var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();

router.get("/", function(req,res,next){
    var ref = database.ref("/courses");
    ref.on("value", function(snapshot) {
        res.send(snapshot.val());
     }, function (error) {
        console.log("Error: " + error.code);
     });
});

router.get("/:courseID", function(req,res,next){
    var courseID = req.params.courseID;
    var ref = database.ref("/courses");
    ref.orderByChild("courseID").equalTo(courseID).on("value", function(snapshot){
        console.log(snapshot.val());
        // res.send(snapshot.val());
        res.render('course/courseInfo', {course: snapshot.val()[0]});
    }, function (error) {
        console.log("Error: " + error.code);
     });
});

module.exports = router;


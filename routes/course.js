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
    var ref = firebase.database().ref('/course/' + courseID);
        ref.on('value', (snapshot) => {
        var data = snapshot.val();
        console.log(data);
        res.render('course/courseInfo', {course: snapshot.val()});
    });
    // ref.orderByChild("courseID").equalTo(courseID).on("value", function(snapshot){
    //     var course = {
    //         courseID: "DS01",
    //         courseName: "Data Structures",
    //         credits: 4,
    //         deptID: 'CSE18'
    //     }
    //     setTimeout(function(){
    //         res.render('course/courseInfo', {course: snapshot.val()[0]});
    //     },1000);
        
    // }, function (error) {
    //     console.log("Error: " + error.code);
    //  });
});

module.exports = router;


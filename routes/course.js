var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();

router.get("/", function(req,res,next){
    var ref = database.ref("/course");
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
        
        // get files
        var files = firebase.storage().ref('/course/'+courseId);
        var courseOutcomes = files.child("CO");
        var CO = null;
        courseOutcomes.getDownloadURL().then((url) => {
            CO = url;
        })

        res.render('course/courseInfo', {course: snapshot.val(), CO: CO});
    });
});

module.exports = router;


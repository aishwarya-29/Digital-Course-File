var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();

var mime = require('mime');

const keyFilename="./firebase_admin.json"; //replace this with api key file
const projectId = "digitalcoursefile-efa96" //replace with your project id
const bucketName = `${projectId}.appspot.com`;
 
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
    projectId,
    keyFilename
});
 
const bucket = gcs.bucket(bucketName);

router.get("/", function(req,res,next){
    var ref = database.ref("/course");
    ref.on("value", function(snapshot) {
        res.render('course/courseSelect', {courses: snapshot.val()});
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
        res.render('course/courseInfo', {course: snapshot.val(), CO: process.env.FIREBASE_STORAGE_URL+'course%2F'+courseID+"CO.pdf", imgURL: process.env.FIREBASE_STORAGE_URL+'course%2F'+courseID+".jpeg", url: process.env.FIREBASE_STORAGE_URL});
    });
});





// const filePath = `./public/docs/DS01COthumb.jpg`;
// const uploadTo = `course/DS01COthumb.jpg`;
// const fileMime = mime.getType(filePath);
 
 
// bucket.upload(filePath,{
//     destination:uploadTo,
//     public:true,
//     metadata: {contentType: fileMime,cacheControl: "public, max-age=300"}
// }, function(err, file) {
//     if(err)
//     {
//         console.log(err);
//         return;
//     }
//     console.log(createPublicFileURL(uploadTo));
// });
 
 
function createPublicFileURL(storageName) {
    return `http://storage.googleapis.com/${bucketName}/${encodeURIComponent(storageName)}`;
}



module.exports = router;


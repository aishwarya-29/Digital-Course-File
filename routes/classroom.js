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

function getCurrentUser() {
    var user = firebase.auth().currentUser;
    currentUser = null;
    if(user) {
        var users = firebase.database().ref('/users');
        users.on('value', (snapshot) => {
        var data = snapshot.val();
        for(var rno in data) {
            var em = data[rno].email;
            console.log(em,user.email);
            if(em.localeCompare(user.email) == 0) {
            currentUser = data[rno];
            }
        }
        });
    }
    return new Promise((resolve, reject) => resolve(currentUser));
}

router.get("/", function(req,res,next){
    // var ref = database.ref("/course");
    // ref.on("value", function(snapshot) {
    //     res.render('course/courseSelect', {courses: snapshot.val()});
    //  }, function (error) {
    //     console.log("Error: " + error.code);
    //  });
    var classrooms = [];
    getCurrentUser().then(function(currentUser){
        var userID;
        if(currentUser.type.localeCompare("Student") == 0) {
            userID = currentUser.rollNumber
        } else {
            userID = currentUser.facultyID
        }
        
        var crooms = database.ref("/classroom");
        crooms.on("value",(snapshot)=> {
            var data = snapshot.val();
                for(var clid in data) {
                    var classroom = data[clid];
                    var studs = classroom.students;
                    console.log(studs);
                    classrooms.push(classroom);
                }
        });
    });

    setTimeout(function(){
        res.render('classroom/index',{classrooms:classrooms});
    },2000);
    
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


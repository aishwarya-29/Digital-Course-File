var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();

function getCurrentUser() {
    var user = firebase.auth().currentUser;
    currentUser = null;
    if(user) {
        var users = firebase.database().ref('/users');
        users.on('value', (snapshot) => {
        var data = snapshot.val();
        for(var rno in data) {
            var em = data[rno].email;
            if(em.localeCompare(user.email) == 0) {
            currentUser = data[rno];
            }
        }
        });
    }
    return new Promise((resolve, reject) => resolve(currentUser));
}

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
    getCurrentUser().then(function(currentUser){
        if(currentUser.type.localeCompare("Student") == 0) {
            userID = currentUser.rollNumber
        } else {
            userID = currentUser.facultyID
        }
        bucket.getFiles(function(err, files) {
            if (!err) {
              // files is an array of File objects.
              var myFiles = []
              files.forEach((file)=>{
                  var directoryURL = file.name.split('/')
                  if(directoryURL[0].localeCompare("documents") == 0 && directoryURL[1].localeCompare(userID) == 0 && directoryURL[2].localeCompare("myfiles") == 0 && directoryURL[3].length > 0){
                    myFiles.push(file);
                  }
                    
              });
              res.render("documents/index", {myFiles: myFiles, url: process.env.FIREBASE_STORAGE_URL});
            }
            else {
                console.log(err);
            }
          });
    });
});



module.exports = router;
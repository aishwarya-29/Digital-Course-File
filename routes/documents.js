var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();
var storage = require('@google-cloud/storage');
var formidable = require("formidable");
var multer = require('multer');


const fileStorage = multer.diskStorage({
  destination : (req,file,cb) => {
    cb(null,'tempSavtte/');
  },
  filename : (req,file,cb) => {
    cb(null,file.originalname)
  }
});

const saveFile = multer({ storage : fileStorage});

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
                    //console.log(file.metadata.metadata);
                  }
                    
              });
              //console.log(myFiles,"FDS");
              res.render("documents/index", {myFiles: myFiles, url: process.env.FIREBASE_STORAGE_URL});
            }
            else {
                console.log(err);
            }
          });
    });
});

router.post("/uploadDoc", saveFile.single('filename'),function(req,res,next){
  console.log("Uploading");
  console.log(req.body);
  var fileName = req.body.filename;
  console.log(fileName);
  if(currentUser.type.localeCompare("Student")==0){
    const options = {
      destination:  "documents/" + currentUser.rollNumber + "/myfiles/" + fileName,
      metadata: {
        metadata: {
          visibility : "public"
        }
      }
    };
    bucket.upload(fileName,options ,function(err, file) {
      if (!err) {
        console.log('File Uploaded');
      } else {
        console.log('Error uploading file: ' + err);
      }
    });
  }else{
    const options = {
      destination:  "documents/" + currentUser.courseID + "/" + fileName,
      metadata: {
        metadata: {
          visibility : "public"
        }
      }
    };
    bucket.upload(fileName,options ,function(err, file) {
      if (!err) {
        console.log('File Uploaded');
      } else {
        console.log('Error uploading file: ' + err);
      }
    });
  }
  res.redirect("/documents");
});

router.post("/delete", function(req,res,next){
    console.log(req.body);
    var path = req.body.fileNameForm2;
    console.log(path,"aeff");
    async function deleteFile() {
        await bucket.file(path).delete()
      }
      
      deleteFile().catch(console.error);
      res.redirect("/documents");
});

router.post("/updateVisibility", function(req,res,next){
    var path = req.body.fileNameForm;
    var VISI = req.body.visForm;
    console.log(path,VISI);
    
    async function setFileMetadata() {
        // Set file metadata.
        const [metadata] = await bucket.file(path).setMetadata({
      
            // A note or actionable items for user e.g. uniqueId, object description,
            // or other useful information.
            metadata: {
              visibility: VISI
            },
          });
      
        console.log(
          'Updated metadata for object',
          path,
        );
      }
      
      setFileMetadata().catch(console.error);
      setTimeout(()=>{
        res.redirect('/documents');
      },2000);
      
});



module.exports = router;
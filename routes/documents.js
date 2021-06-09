var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var database = firebase.database();
var storage = require('@google-cloud/storage');
var admin = require("firebase-admin");

const saltedMd5=require('salted-md5')
const path=require('path');
const multer=require('multer')
const upload=multer({storage: multer.memoryStorage()})


const keyFilename="./firebase_admin.json"; //replace this with api key file
const projectId = "digitalcoursefile-efa96" //replace with your project id
const bucketName = `${projectId}.appspot.com`;
 
const {Storage} = require('@google-cloud/storage');
const gcs = new Storage({
    projectId,
    keyFilename
});

const bucket = gcs.bucket(bucketName);
var currentUser;

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

router.post("/uploadDoc", upload.single('file'),function(req,res,next){
  console.log("Uploading");
  console.log(req.file);
  var filename = req.file.originalname;
  console.log(filename);
  async function writeFile(path) {
    await bucket.file(path).createWriteStream({
      metadata: {
        metadata: {
          visibility: "public"
        }
      }
    }).end(req.file.buffer)
  }
  if(currentUser.type.localeCompare("Student")==0) {
    var path = "documents/" + currentUser.rollNumber + "/myfiles/" + filename;
    writeFile(path).catch(console.error)
    setTimeout(()=> {
      res.redirect("/documents");
    }, 5000)
  }
  else  {
    var path = "documents/" + currentUser.facultyID + "/myfiles/" + filename;
    writeFile(path).catch(console.error)
    setTimeout(()=> {
      res.redirect("/documents");
    }, 5000)
  }

});

router.post("/uploadCourseDoc", upload.single('file'), function(req, res, next) {
  var filename = req.file.originalname;
  console.log(filename);
  async function writeFile(path) {
    await bucket.file(path).createWriteStream().end(req.file.buffer)
  }

  var path = 'documents/'+req.body.courseID+'/' + filename;
  writeFile(path).catch(console.error)
    setTimeout(()=> {
      res.redirect("/classroom/"+req.body.courseID);
    }, 5000)
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



router.get("/getDocs", function(req,res,next){
  getCurrentUser().then(function(currentUser){
      if(currentUser.type.localeCompare("Student") == 0) {
          userID = req.query.stud
      } else {
          userID = req.query.stud
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
            res.render("documents/publicDocs", {myFiles: myFiles, url: process.env.FIREBASE_STORAGE_URL});
          }
          else {
              console.log(err);
          }
        });
  });
});



module.exports = router;
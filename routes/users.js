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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/student/login', function(req,res,next){
  res.render('users/studentLogin');
});

router.get('/faculty/login', function(req,res,next){
  res.render('users/facultyLogin');
});


router.get('/student/profile', function(req,res,next){
  var profileInformation = {
    name: "Hello",
    rno: "GR18304"
  }

  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  res.render('users/studentProfile',{profileInformation: profileInformation});
});

router.get('/faculty/profile', function(req,res,next){
  var profileInformation = {
    name: "Hello",
    rno: "GR18304"
  }
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  res.render('users/facultyProfile',{profileInformation: profileInformation});
});



router.get('/student/profile/edit',function(req,res,next){
  var profileInformation = {
    name: "Hello",
    rno: "GR1830443534"
  }
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
          profileInformation.rno = data[rno].rollNumber;
          console.log("28 : "+ profileInformation.Name);
          break;
        }
      }
    });
  user.rollNumber = profileInformation.rno;   
  res.render('users/studentEditProfile',{profileInformation: profileInformation})
});

router.get('/faculty/profile/edit',function(req,res,next){
  var profileInformation = {
    name: "Hello",
    rno: "GR18304"
  }
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];          
          //profileInformation = profileInformation.rno;
        }
      }
    });
  console.log("100 : " + profileInformation.Name);  
  res.render('users/facultyEditProfile',{profileInformation: profileInformation})
});


router.post('/student/new', function(req,res,next) {
  console.log(req.body);
  var rno = req.body.rno;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;
  console.log(rno);

  if(password != password2) {
    res.send("Password not matching");
    // --------------------- ERROR -----------------------
    // password not matching
  }

  if(password.length < 6) {
    res.send("password should be greater than 6 characters");
    // --------------------- ERROR -----------------------
    // password length not sufficient
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      //console.log(newUser);
    });
  
  firebase.database().ref('users/' + rno).set({
    rollNumber: rno,
    email: email,
    type: "Student"
  });
  
    res.redirect("/");
});

router.post('/student/login', function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = firebase.auth().currentUser;
    //var user = userCredential.user;
    //res.locals.user = null;
    console.log(user.email);
    if(user.email) {
      var users = firebase.database().ref("/users");
      users.on("value", (snapshot) => {
        var data = snapshot.val();
        for(var rno in data) {
          var em = data[rno].email;
          if(em.localeCompare(user.email) == 0) {
            res.locals.user = data[rno];       
            break;
          }
        }
      });
      res.locals.userEmail = user;
    }
      console.log("user:: ",res.locals.user);
      setTimeout(function () {
        res.redirect("/");
      }, 2500)
      
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorMessage);
  });
});

router.post('/faculty/login', function(req,res,next){
  var email = req.body.email;
  var password = req.body.password;
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.email);
    res.locals.user = null;
    if(user) {
      var users = firebase.database().ref('/users');
      users.on('value', (snapshot) => {
        var data = snapshot.val();
        for(var id in data) {
          var em = data[id].email;
          if(em.localeCompare(user.email) == 0) {
            res.locals.user = data[id];
          }
        }
      });
      res.locals.userEmail = user;
    }
      
      setTimeout(function () {
        console.log(res.locals.user);
        res.redirect("/");
      }, 2500)
      
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.send(errorMessage);
  });
});



router.get("/faculty/signup", function(req,res,next){
  res.render("users/facultySignup");
});

router.post("/faculty/signup", function(req,res,next){
  var facID = req.body.facid;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(password != password2) {
    res.send("Password not matching");
    // --------------------- ERROR -----------------------
    // password not matching
  }

  if(password.length < 6) {
    res.send("password should be greater than 6 characters");
    // --------------------- ERROR -----------------------
    // password length not sufficient
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      //console.log(newUser);
    });
  
  firebase.database().ref('users/' + facID).set({
    facultyID: facID,
    email: email,
    type: "Faculty"
  });
    res.redirect("/");
});

router.post("/student/update", function(req,res,next){
  var data = req.data;
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  profileInformation.email =   req.body.email,
  profileInformation.Name =   req.body.Name,
  profileInformation.Address =   req.body.Address,
  profileInformation.DOB =   req.body.DOB,
  profileInformation.type =   "Student";
  console.log("248 : " + req.body.Name);
  firebase.database().ref('users/' + profileInformation.rollNumber).set({
    email:  profileInformation.email,
    Name: profileInformation.Name,
    Address:  profileInformation.Address,
    DOB:  profileInformation.DOB,
    type: "Student",
    rollNumber : profileInformation.rollNumber,
    CGPA : profileInformation.CGPA,
    SGPA : profileInformation.SGPA,
    Phone : profileInformation.Phone,
    deptName : profileInformation.deptName,
  });
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  res.render('users/studentProfile',{profileInformation: profileInformation});
});

router.post("/student/cancelUpdate", function(req,res,next){
  var data = req.data;
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  res.render('users/studentProfile',{profileInformation: profileInformation});
});

router.post("/faculty/update", function(req,res,next){
  var data = req.data;
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  profileInformation.email =   req.body.email,
  profileInformation.Name =   req.body.Name,
  profileInformation.Address =   req.body.Address,
  profileInformation.DOB =   req.body.DOB,
  profileInformation.type =   "Faculty";
  console.log("248 : " + req.body.Name);
  firebase.database().ref('users/' + profileInformation.facultyID).set({
    email:  profileInformation.email,
    Name: profileInformation.Name,
    Address:  profileInformation.Address,
    DOB:  profileInformation.DOB,
    type: "Faculty",
    facultyID : profileInformation.facultyID,
    des : profileInformation.des,
    qual : profileInformation.qual,
    Phone : profileInformation.Phone,
    deptName : profileInformation.deptName,
  });
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  res.render('users/studentProfile',{profileInformation: profileInformation});
});

router.post("/faculty/cancelUpdate", function(req,res,next){
  var data = req.data;
  var user = firebase.auth().currentUser;
  var users = firebase.database().ref('/users');
    users.on('value', (snapshot) => {
      var data = snapshot.val();
      for(var rno in data) {
        var em = data[rno].email;
        if(em.localeCompare(user.email) == 0) {
          profileInformation = data[rno];
        }
      }
    });
  res.render('users/facultyProfile',{profileInformation: profileInformation});
});

router.post("/student/logout", function(req,res,next){
  firebase.auth().signOut().then(() => {
    res.redirect("/");
  }).catch((error) => {
    // An error happened.
    res.send(error);
  });
});

router.post("/faculty/logout", function(req,res,next){
  firebase.auth().signOut().then(() => {
    res.redirect("/");
  }).catch((error) => {
    // An error happened.
    res.send(error);
  });
});

router.get("/student/:rollno", function(req,res,next){
  var classrooms = [];
  var userID = req.params.rollno;
  var users = firebase.database().ref('/users/'+userID);
  var profileInformation;
    users.on('value', (snapshot) => {
      var data = snapshot.val();
          profileInformation = data;
          var crooms = firebase.database().ref("/classroom");
          crooms.on("value",(snapshot)=> {
              var data = snapshot.val();
                  for(var clid in data) {
                      var classroom = data[clid];
                      var studs = classroom.students;
                      if(studs.includes(userID)) {
                          classrooms.push(classroom);
                      }
                  }
          })
    });
    var myFiles = []
      bucket.getFiles(function(err, files) {
          if (!err) {
            files.forEach((file)=>{
                var directoryURL = file.name.split('/');
                if(directoryURL[0].localeCompare("documents") == 0 && directoryURL[1].localeCompare(userID) == 0 && directoryURL[2].localeCompare("myfiles") == 0 && directoryURL[3].length > 0){
                  if(file.metadata.metadata.visibility.localeCompare("public")==0)
                    myFiles.push(file);
                }
                  
            });
          }
          else {
              console.log(err);
          }
        });
    setTimeout(()=>{
      console.log(profileInformation,classrooms,myFiles);
      res.render("users/profile",{user: profileInformation, classrooms: classrooms, files: myFiles});
    },2000);
});

module.exports = router;

var firebase = require('firebase');
require('dotenv').config();

var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "digitalcoursefile-efa96.firebaseapp.com",
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: "digitalcoursefile-efa96",
    storageBucket: "digitalcoursefile-efa96.appspot.com",
    messagingSenderId: "1092767544607",
    appId: "1:1092767544607:web:73b610abc2fd7a77c1ec2a",
    measurementId: "G-TTTF98WR9R"
  };
  
firebase.initializeApp(firebaseConfig);

module.exports = firebase;

// var ref = database.ref("/courses");
// ref.set([
//   {
//     courseID: "DS01",
//     courseName: "Data Structures",
//     credits: 4,
//     deptID: "CSE18"
//   },
//   {
//     courseID: "DBMS02",
//     courseName: "Database Management System",
//     credits: 3,
//     deptID: "CSE18"
//   },
//   {
//     courseID: "ML03",
//     courseName: "Machine Learning",
//     credits: 3,
//     deptID: "CSE18"
//   },
//   {
//     courseID: "TOC04",
//     courseName: "Theory of Computation",
//     credits: 2,
//     deptID: "CSE18"
//   },
//   {
//     courseID: "VA01",
//     courseName: "Vector Algebra",
//     credits: 4,
//     deptID: "MTH18"
//   },
//   {
//     courseID: "DE02",
//     courseName: "Differential Equations",
//     credits: 3,
//     deptID: "MTH18"
//   },
//   {
//     courseID: "DF03",
//     courseName: "Differentiation",
//     credits: 3,
//     deptID: "MTH18"
//   },
//   {
//     courseID: "IG04",
//     courseName: "Integration",
//     credits: 2,
//     deptID: "MTH18"
//   },
//   {
//     courseID: "IO01",
//     courseName: "Inorganic Chemistry",
//     credits: 4,
//     deptID: "CHM18"
//   },
//   {
//     courseID: "OG02",
//     courseName: "Organic Chemistry",
//     credits: 3,
//     deptID: "CHM18"
//   },
//   {
//     courseID: "PC03",
//     courseName: "Physical Chemistry",
//     credits: 3,
//     deptID: "CHM18"
//   },
//   {
//     courseID: "BC04",
//     courseName: "Biological Chemistry",
//     credits: 2,
//     deptID: "CHM18"
//   }
// ])
    
//  ref.once("value", function(snapshot) {
//     var data = snapshot.val();   //Data is in JSON format.
//     console.log(data);
// });
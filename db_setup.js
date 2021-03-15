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
var database = firebase.database();

module.exports = database;

// var ref = database.ref("/users/student");

// ref.set([
//     {
//         id:20,
//         name:"Jane Doe",
//         email:"jane@doe.com",
//         website:"https://jane.foo.bar"
//     },
//     {
//         id:21,
//         name:"John doe",
//         email:"john@doe.com",
//         website:"https://foo.bar"
//     }
// ]);

// ref.push({
//     id:22,
//     name:"Jane Doe",
//     email:"jane@doe.com",
//     website:"https://jane.foo.bar"
// });
    
//  ref.once("value", function(snapshot) {
//     var data = snapshot.val();   //Data is in JSON format.
//     console.log(data);
// });
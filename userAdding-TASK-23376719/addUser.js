// Require the Firebase module
const firebase = require('firebase/app');
require('firebase/database');

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Now you can use Firebase services, like the Realtime Database
const database = firebase.database;
  
  // Function to add a new doctor to the database
  function addDoctor() {
    const name = getElementVal('Name');
    const doctorID = getElementVal('DoctorID');
  
    const doctorData = {
      Name: name,
      DoctorID: doctorID,
    };
  
    // Push the doctor data to the 'doctors' node in the database
    const newRef = database.ref('doctors').push(doctorData);
  
    // Log the reference to the new doctor
    console.log('New doctor reference:', newRef.key);
  }
  
  /* Event listener for the signup form
  document.getElementById("signUp").addEventListener("submit", function (e) {
    e.preventDefault();
    addDoctor();
  });
  
  // Function to get element values by ID
  function getElementVal(id) {
    return document.getElementById(id).value;
  }*/






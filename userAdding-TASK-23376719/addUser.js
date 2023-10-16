const firebaseConfig = {
    apiKey: "AIzaSyAHFVjJjJeM_Soz2lsJOEIwSBiLWOS_RY0",
  authDomain: "healthai-40b47.firebaseapp.com",
  databaseURL: "https://healthai-40b47-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "healthai-40b47",
  storageBucket: "healthai-40b47.appspot.com",
  messagingSenderId: "493505764604",
  appId: "1:493505764604:web:2decb83a82f453f0398b79",
  measurementId: "G-YDS75RSZME"
};

//to initilize firebase
firebase.initializeApp(firebaseConfig);

//create reference to database
var userForm = firebase.database().ref("userForm");

document.getElementById("usersForm").addEventListener("signUp", signUpForm)

function signUpForm(e){
    //need more info on sign up page
    //e.preventDefault();
    var name = getElementVar('');
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}






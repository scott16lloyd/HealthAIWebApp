import { firebaseConfig } from "../src/firebase";

//to initilize firebase
firebase.initializeApp(firebaseConfig);

//create reference to database
var userForm = firebase.database().ref("signUp");

//possible need to change "signUpForm" function.git
document.getElementById("signUp").addEventListener("signUp", signUpForm)

function signUpForm(e){
    //need more info on sign up page
    //e.preventDefault();
    var name = getElementVar('');
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}






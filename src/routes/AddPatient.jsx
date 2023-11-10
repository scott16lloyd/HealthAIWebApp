import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../components/widgets/AlertBox/AlertBox';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, database } from '../firebase';
import { child, set } from '@firebase/database';


function AddPatient() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [inputError, setInputError] = useState(false);
  const [inputValues, setInputValues] = useState({
    forename: '',
    middleName: '',
    surname: '',
    email: '',
    telephone: '',
    PPSNumber: '',
  });

  const isNameValid = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };
  const isPhoneNumberValid = (telephone) => {
    const phoneRegex = /^\d{10}$/; // For a 10-digit phone number
    return phoneRegex.test(telephone);
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isPPSValid = (PPS) => {
    const PPSRegex = /^\d{7}[A-Za-z]$/; // Matches 7 digits followed by 1 letter
    return PPSRegex.test(PPS);
  };

  const handleInputChange = (field) => (event) => {
    const value = event.target.value;
    setInputValues({
      ...inputValues,
      [field]: value,
    });
    setInputError({
      ...inputError,
      [field]: value.trim() === '',
    });
  };

  const createPatient = (e) => {
    e.preventDefault();

    const isForenameInputValid = isNameValid(inputValues.forename);
    const isSurnameInputValid = isNameValid(inputValues.surname);
    const isEmailAddressInputValid = isEmailValid(inputValues.email);
    const isPhoneNumberInputValid = isPhoneNumberValid(inputValues.telephone);
    const isPPSInputValid = isPPSValid(inputValues.PPSNumber);

    const userData = {
      forename: inputValues.forename,
      middleName: inputValues.middleName,
      surname: inputValues.surname,
      email: inputValues.email,
      telephone: inputValues.telephone,
      PPSNumber: inputValues.PPSNumber,
    };

    if (!isForenameInputValid) {
      setErrorMessage('Please enter a valid name.');
      return;
    } else if (!isSurnameInputValid) {
      setErrorMessage('Please enter a valid surname.');
      return;
    } else if (!isEmailAddressInputValid) {
      setErrorMessage('Please enter a valid email.');
      return;
    } else if (!isPhoneNumberInputValid) {
      setErrorMessage('Please enter a valid phone number. e.g. 0831234567');
      return;
    } else if (!isPPSInputValid) {
      setErrorMessage('PPS Number must be 7 digits followed by a single letter.');
      return;
    }

   //Function to generate random password
   function randomPasswordGen(number, symbol, length){

    //Functions to create random characters
    function getRandomChar() {
      return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    }
    function getRandomNumber() {
      return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
    function getRandomSymbol() {
      const symbols = "!@#$*";
      return symbols[Math.floor(Math.random() * symbols.length)];
    }

    let genPass = "";
    let variationsCount = [number, symbol].length;
    console.log(length);

    //Loop runs to create password of desired length
    for (let i = 0; i < length; i += variationsCount){
      if (number) {
        genPass += getRandomNumber();
      }
      if (symbol) {
        genPass += getRandomSymbol();
      }
      genPass += getRandomChar();
    }
    const finalPass = genPass.slice(0, length);
    return finalPass;
  }

  var password = randomPasswordGen(true, false, 15);
  console.log(password);

  const addPatientInfoToFirebase = (userInfo, uid) => {
    const dbRef = ref(database, 'patients'); //pushes to patient db
    console.log(dbRef);
    set(child(dbRef, uid), userInfo); //sets info in db to given user info
  };

  createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(userCredential);
        //Set the display name for the user
        const displayName = inputValues.forename + ' ' + inputValues.surname;

        updateProfile(user, {
          displayName: displayName,
        });
        console.log(inputValues);

        //Creates const userInfo
        const userInfo = {
          forename: inputValues.forename,
          middleName: inputValues.middleName,
          surname: inputValues.surname,
          email: inputValues.email,
          telephone: inputValues.telephone,
          address: inputValues.address,
          PPSN: inputValues.PPSNumber,
          doctor: "",
          address: "",
          verified: false,
          gender: "",
          //check this >> medicalRecords: "",
          testHistory: "",
          lungCancerRisk: 0,
          heartDiseaseRisk: 0,
          colonCancerRisk: 0,
        };

         //pushes userInfo to firebase database
         addPatientInfoToFirebase(userInfo, userCredential.user.uid);

      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email is already in use.');
        } else {
          setErrorMessage('An error occurred. Please try again.');
          console.log(error);
        }
      });
    }
  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputStyle = {
    margin: '20px 40px',
    width: '100%',
    borderRadius: '11px',
    background:
      'linear-gradient(93deg, rgba(217, 217, 217, 0.40) 17.46%, rgba(217, 217, 217, 0.10) 82.78%)',
    boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.10)',
    backdropFilter: 'blur(1.5px)',
  };

  // small text in header of page
  const mandatoryStyle = {
    color: 'red',
    fontFamily: 'Roboto, sans-serif',
  };

  // to display padding between sign up and mandatory
  const spaceStyle = {
    marginRight: '10px',
  };

  const titleStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
  };

  const backButtonStyle = {
    marginRight: 'auto',
  };

  const buttonContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <>
      <AlertBox
        message={errorMessage}
        severity={'error'}
        onClose={() => setErrorMessage('')}
      />
      <Container>
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}
        >
          {' '}
          <Typography varient="h1" style={titleStyle}>
          Add Patient
        </Typography>
          <span style={spaceStyle}></span>
          <Typography variant="h7" align="left" style={mandatoryStyle}>
            Mandatory *
          </Typography>
        </div>
        <Stack direction="row" spacing={2} justifyContent="center">
          {/** Stacking textfields in 4, 4, 2 + 1 button */}
          <div style={columnStyle}>
            <TextField
              label="Forename"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.forename}
              onChange={handleInputChange('forename')}
              error={inputError['forename']}
              helperText={
                inputError['forename'] ? 'Forename cannot be blank' : ''
              }
            />
            <TextField
              label="Middle Name"
              variant="filled"
              style={inputStyle}
              InputProps={{ disableUnderline: true }}
              value={inputValues.middleName}
              onChange={handleInputChange('middleName')}
            />


          </div>
          <div style={columnStyle}>
          <TextField
              label="Surname"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.surname}
              onChange={handleInputChange('surname')}
              error={inputError['surname']}
              helperText={
                inputError['surname'] ? 'Surname cannot be blank' : ''
              }
            />

          <TextField
              label="Email Address"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange('email')(e);
              }}
              error={inputError['email']}
              helperText={inputError['email'] ? 'Email cannot be blank' : ''}
            />
    
          </div>
          <div style={columnStyle}>
          <TextField
              label="Telephone"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.telephone}
              onChange={handleInputChange('telephone')}
              error={inputError['telephone']}
              helperText={
                inputError['telephone'] ? 'Phone cannot be blank' : ''
              }
            />
          <TextField
              label="PPS number"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.gpIdNumber}
              onChange={handleInputChange('PPSNumber')}
              error={inputError['PPSNumber']}
              helperText={
                inputError['PPSNumber'] ? 'PSS Number cannot be blank' : ''
              }
            />
            {/** Sign Up Button */}
          </div>
        </Stack>
        <div style={buttonContainerStyle}>
          <PrimaryButton
            text={'Add Patient'}
            action={createPatient}
            state={'active'}
          />{' '}
        </div>
      </Container>

    </>
  );
}

export default  AddPatient;
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import AlertBox from '../components/widgets/AlertBox/AlertBox';
import { auth, firebaseConfig } from '../firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { ref, database } from '../firebase';
import { child, set, get } from '@firebase/database';
import emailjs from '@emailjs/browser';
import { initializeApp } from '@firebase/app';
import { UserAuth } from '../components/auth/AuthContext';
import {
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  FormControl,
} from '@mui/material';

//const apiUrl = 'https://healthai-40b47-default-rtdb.europe-west1.firebasedatabase.app/doctors.json?Authorization=Bearer Lv0Ps3n1nkNuSjvIolRnRhCC1UMnasT4njYp4gVJ&orderBy="gpIdNumber"&equalTo="0987654321"';

function AddPatient() {
  let gpIdNumber;
  const { user } = UserAuth();
  const navigate = useNavigate();
  const uid = user.uid;
  console.log('UID:', uid);
  const userRef = ref(database, '/doctors/' + uid);
  get(child(userRef, 'gpIdNumber'))
    .then((snapshot) => {
      gpIdNumber = snapshot.val();
      console.log('GPID:', gpIdNumber);
    })
    .catch((error) => {
      console.error('Error retrieving gpIdNumber:', error);
    });

  const [severity, setSeverity] = useState('');
  var gender;

  // Initialize second instance of firebase app
  const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
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
    gender: '',
    Age: '',
  });

  const isNameValid = (name) => {
    const nameRegex = /^[A-Za-z\s']+$/; // Allow letters, spaces, and single quote
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
  const isGenderValid = (gender) => {
    const genderRegex = /^[MF]$/i; // Matches 'M' or 'F' (case-insensitive)
    return genderRegex.test(gender);
  };
  const isAgeValid = (Age) => {
    const ageRegex = /^[1-9]\d*$/; // Matches a positive integer
    return ageRegex.test(Age);
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
    const isGenderInputValid = isGenderValid(inputValues.gender);
    const isAgeInputValid = isAgeValid(inputValues.Age);

    const userData = {
      forename: inputValues.forename,
      middleName: inputValues.middleName,
      surname: inputValues.surname,
      email: inputValues.email,
      telephone: inputValues.telephone,
      PPSNumber: inputValues.PPSNumber,
      gender: inputValues.gender,
      Age: inputValues.Age,
    };

    if (!isForenameInputValid) {
      setErrorMessage('Please enter a valid name.');
      setSeverity('error');
      return;
    } else if (!isSurnameInputValid) {
      setErrorMessage('Please enter a valid surname.');
      setSeverity('error');
      return;
    } else if (!isEmailAddressInputValid) {
      setErrorMessage('Please enter a valid email.');
      setSeverity('error');
      return;
    } else if (!isPhoneNumberInputValid) {
      setErrorMessage('Please enter a valid phone number. e.g. 0831234567');
      setSeverity('error');
      return;
    } else if (!isPPSInputValid) {
      setErrorMessage(
        'PPS Number must be 7 digits followed by a single letter.'
      );
      setSeverity('error');
      return;
    } else if (!isGenderInputValid) {
      setErrorMessage('Gender must be either "Male" or "Female".');
      setSeverity('error');
      return;
    } else if (!isAgeInputValid) {
      setErrorMessage('Please enter a valid age. e.g. positive number');
      setSeverity('error');
      return;
    }

    //Function to generate random password
    function randomPasswordGen(number, symbol, length) {
      //Functions to create random characters
      function getRandomChar() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
      }
      function getRandomNumber() {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
      }
      function getRandomSymbol() {
        const symbols = '!@#$*';
        return symbols[Math.floor(Math.random() * symbols.length)];
      }

      let genPass = '';
      let variationsCount = [number, symbol].length;

      //Loop runs to create password of desired length
      for (let i = 0; i < length; i += variationsCount) {
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

    var randPassword = randomPasswordGen(true, false, 15);

    const addPatientInfoToFirebase = (userInfo, uid) => {
      const dbRef = ref(database, 'patients'); //pushes to patient db
      console.log(dbRef);
      set(child(dbRef, uid), userInfo); //sets info in db to given user info
    };

    // Use second instance to create user
    createUserWithEmailAndPassword(getAuth(secondaryApp), email, randPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        const displayName = inputValues.forename + ' ' + inputValues.surname;

        updateProfile(user, {
          displayName: displayName,
        });

        const userInfo = {
          forename: inputValues.forename,
          middleName: inputValues.middleName,
          surname: inputValues.surname,
          email: inputValues.email,
          telephone: inputValues.telephone,
          address: inputValues.address,
          PPSN: inputValues.PPSNumber,
          doctor: gpIdNumber,
          address: '',
          verified: false,
          subscribed: false,
          gender: inputValues.gender,
          medicalRecords: '',
          testHistory: '',
          insuranceProvider: '',
          insurancePolicyNo: '',
          Age: inputValues.Age,
        };

        addPatientInfoToFirebase(userInfo, userCredential.user.uid);
        console.log('Patient Created Successfully');

        //  info needed for email
        const emailInfo = {
          forename: inputValues.forename,
          password: randPassword,
          email: inputValues.email,
        };
        //  function to send email
        emailjs.send(
          process.env.REACT_APP_SERVICE_ID,
          process.env.REACT_APP_TEMPLATE_ID,
          emailInfo,
          process.env.REACT_APP_PUBLIC_KEY
        );

        // Clear Input Fields
        setInputValues({
          forename: '',
          middleName: '',
          surname: '',
          email: '',
          telephone: '',
          PPSNumber: '',
          gender: '',
          Age: '',
        });

        // Display Success Message
        setErrorMessage('Patient created successfully');
        setSeverity('success');
      })
      .catch((error) => {
        console.log(error);
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('Email is already in use.');
          setSeverity('error');
        } else {
          setErrorMessage('An error occurred. Please try again.');
          setSeverity('error');
          console.log(error);
        }
      });
  };
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
    overflow: 'hidden',
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
        severity={severity}
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
              value={inputValues.PPSNumber}
              onChange={handleInputChange('PPSNumber')}
              error={inputError['PPSNumber']}
              helperText={
                inputError['PPSNumber'] ? 'PSS Number cannot be blank' : ''
              }
            />
            {/** Sign Up Button */}
          </div>
          <div style={columnStyle}>
            <FormControl variant="filled" required style={inputStyle}>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                label="Gender"
                value={inputValues.gender}
                onChange={handleInputChange('gender')}
                variant="filled"
                required
                error={inputError['Gender']}
                disableUnderline
              >
                <MenuItem value={'M'}>Male</MenuItem>
                <MenuItem value={'F'}>Female</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Age"
              variant="filled"
              style={{ ...inputStyle, padding: '0px' }} // Adjust the padding as needed
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.Age}
              onChange={handleInputChange('Age')}
              error={inputError['Age']}
              helperText={inputError['Age'] ? 'Age cannot be blank' : ''}
            />
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

export default AddPatient;

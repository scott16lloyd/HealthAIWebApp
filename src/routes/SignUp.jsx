import React, { useState } from 'react';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import BackButton from '../components/widgets/BackButton/BackButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    forename: '',
    middleName: '',
    surname: '',
    telephone: '',
    officeTelephone: '',
    gpIdNumber: '',
    personalAddress: '',
    officeAddress: '',
  });

  const handleInputChange = (field) => (event) => {
    setInputValues({
      ...inputValues,
      [field]: event.target.value,
    });
  };
  const createAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/home');
      })
      .catch((error) => {
        console.log(error);
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

  const backButtonStyle = {
    marginRight: 'auto',
  };

  return (
    <>
      <TopNavigationBar />
      <Container>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {' '}
          {/** Header of the page */}
          <BackButton style={backButtonStyle} />
          <Typography variant="h4" align="left">
            Sign Up
          </Typography>
          <span style={spaceStyle}></span>
          <Typography variant="h7" align="left" style={mandatoryStyle}>
            Mandatory *
          </Typography>
        </div>
        <Stack direction="row" spacing={2} justifyContent="center">
          {' '}
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
            />
            <TextField
              label="Middle Name"
              variant="filled"
              style={inputStyle}
              InputProps={{ disableUnderline: true }}
              value={inputValues.middleName}
              onChange={handleInputChange('middleName')}
            />

            <TextField
              label="Surname"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.surname}
              onChange={handleInputChange('surname')}
            />

            <TextField
              label="Email Address"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
            <TextField
              label="Office Telephone"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.officeTelephone}
              onChange={handleInputChange('officeTelephone')}
            />

            <TextField
              label="GP ID number"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.gpIdNumber}
              onChange={handleInputChange('gpIdNumber')}
            />

            <TextField
              label="Personal Address"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.personalAddress}
              onChange={handleInputChange('personalAddress')}
            />
          </div>
          <div style={columnStyle}>
            <TextField
              label="Office Address"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={inputValues.officeAddress}
              onChange={handleInputChange('officeAddress')}
            />
            <TextField
              label="Password"
              type="password"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton text={'Sign Up'} action={createAccount} />{' '}
            {/** Sign Up Button */}
          </div>
        </Stack>
      </Container>
    </>
  );
}

export default LandingPage;

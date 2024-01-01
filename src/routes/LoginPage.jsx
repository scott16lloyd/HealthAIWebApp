import React, { useEffect, useState } from 'react';
import { auth, database } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import AlertBox from '../components/widgets/AlertBox/AlertBox';
import { Container, Typography, Stack, TextField } from '@mui/material';
import BackButton from '../components/widgets/BackButton/BackButton';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';
import SocialMediaSignInButton from '../components/widgets/SocialMediaSignInButton/SocialMediaSignInButton';
import { UserAuth } from '../components/auth/AuthContext';
import { ref, child, get } from 'firebase/database';

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const { googleSignIn, user } = UserAuth();

  // Check if entered email is valid
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Code to verify if the user is a doctor or a patient
  async function verifyDoctor(emailAddress) {
    var docCheck = false;
    const doctorsRef = ref(database, 'doctors');

    // Function takes in entered email address, before checking it against all users in the doctors database
    return get(doctorsRef)
      .then((snapshot) => {
        const doctors = snapshot.val();

        // Check if the email exists in the doctors database
        // If exists, return true, if not, return false
        docCheck = Object.values(doctors).some(
          (doctor) => doctor.email === emailAddress
        );

        return docCheck;
      })
      .catch((error) => {
        console.error('Error verifying doctor:', error);
        return docCheck;
      });
  }
  const signIn = async (e) => {
    e.preventDefault();
    try {
      // Verify doctor user
      var verified = await verifyDoctor(email);
      console.log(verified);
    } catch (error) {
      console.error('Error check', error);
    }
    if (verified == true) {
      // If user is a doctor, sign in
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // Successful sign-in
          console.log('Sign-in successful');
          // Navigate to home or do other actions upon successful sign-in
          navigate('/home');
        })
        .catch((error) => {
          console.log(error);
          if (error.code === 'auth/invalid-login-credentials') {
            setErrorMessage('Invalid login credentials.');
          } else if (error.code === 'auth/invalid-email') {
            setErrorMessage('Invalid email.');
          } else {
            setErrorMessage('An error occurred. Please try again.');
          }
        });
    } else {
      // If email is not valid, give error message
      if (isEmailValid(email) == false) {
        setErrorMessage('Please enter a valid email');
      } else {
        // If user email is not found in the doctor database, give error message
        setErrorMessage(
          'This user is not a doctor, patients please use the mobile app'
        );
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate('/home');
    }
  });

  // Styling
  const backButtonStyle = {
    marginRight: 'auto',
  };

  const spaceStyle = {
    marginRight: '10px',
  };

  const mandatoryStyle = {
    color: 'red',
    fontFamily: 'Roboto, sans-serif',
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '4rem',
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
  return (
    <>
      <TopNavigationBar />
      <AlertBox
        message={errorMessage}
        severity={'error'}
        onClose={() => setErrorMessage('')}
      />
      <Container>
        <div
          style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}
        >
          <BackButton style={backButtonStyle} goBackPath={'/'} />
          <Typography variant="h4" align="left">
            Login
          </Typography>
          <span style={spaceStyle}></span>
          <Typography variant="h7" align="left" style={mandatoryStyle}>
            Mandatory *
          </Typography>
        </div>
        <form onSubmit={signIn}>
          <Stack direction="row" spacing={2} justifyContent="center">
            {' '}
            {/** Stacking textfields in 4, 4, 2 + 1 button */}
            <div style={columnStyle}>
              <TextField
                label="Email"
                variant="filled"
                type="email"
                style={inputStyle}
                required
                InputProps={{ disableUnderline: true, autoComplete: 'email' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                variant="filled"
                type="password"
                style={inputStyle}
                required
                InputProps={{ disableUnderline: true }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <PrimaryButton
                text={'Login'}
                type="submit"
                action={(e) => signIn(e)}
                state={'active'}
              />{' '}
            </div>
          </Stack>
        </form>
      </Container>
    </>
  );
}

export default SignInPage;

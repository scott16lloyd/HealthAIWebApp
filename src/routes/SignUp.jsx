import React from 'react';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import BackButton from '../components/widgets/BackButton/BackButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';
import Container from '@mui/material/Container';
import Footer from '../components/widgets/Footer/Footer';
import Typography from '@mui/material/Typography';

function LandingPage() {
  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const inputStyle = {
    margin: '20px 40px',
    width: '100%',
    borderRadius: '11px',
    background: 'linear-gradient(93deg, rgba(217, 217, 217, 0.40) 17.46%, rgba(217, 217, 217, 0.10) 82.78%)',
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

  return (
    <>
      <TopNavigationBar />
      <BackButton /> {/** Backbutton */}
      <Container>
        <div style={{ display: 'flex', alignItems: 'center' }}> {/** Header of the page */}
          <Typography variant="h4" align="left" gutterBottom>
            Sign Up
          </Typography>
          <span style={spaceStyle}></span> 
          <Typography variant="h7" align="left" gutterBottom style={mandatoryStyle}>
            Mandatory *
          </Typography>
        </div>
        <Stack direction="row" spacing={2} justifyContent="center"> {/** Stacking textfields in 4, 4, 2 + 1 button */}
      
          <div style={columnStyle}>
            <TextField
              label="Forename"
              variant="filled" 
              style={inputStyle}
              required 
              InputProps={{ disableUnderline: true }} 
            />
              <TextField
              label="Middle Name"
              variant="filled" 
              style={inputStyle}
              InputProps={{ disableUnderline: true }} 
            />
          
          <TextField
              label="Surename"
              variant="filled" 
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }} 
            />
          
          <TextField
              label="Email Address"
              variant="filled" 
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }} 
            />
          </div>

          <div style={columnStyle}>
            <TextField
              label="Telephone"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }} 
            />
              <TextField
              label="Office Telephone"
              variant="filled" 
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }} 
            
            />
          
          <TextField
              label="GP ID number"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
            />
          
          <TextField
              label="Personal Address"
              variant="filled" 
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }} 
            />
          </div>

          <div style={columnStyle}>
            <TextField
              label="Office Address"
              variant="filled" 
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }} 
            />
              <TextField
              label="Office Telephone"
              variant="filled" 
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }} 
            />
            <PrimaryButton /> {/** Sign Up Button */}
          </div>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

export default LandingPage;

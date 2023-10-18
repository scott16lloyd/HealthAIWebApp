import React, { useState } from 'react';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';

const defaultButtonStyle = {
  width: '252px',
  height: '62px',
  flexShrink: 1,
  borderRadius: '11px',
  background: 'linear-gradient(93deg, rgba(217, 217, 217, 0.40) 17.46%, rgba(217, 217, 217, 0.10) 82.78%)',
  boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.10)',
  backdropFilter: 'blur(1.5px)',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  cursor: 'pointer',
  color: '#000',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '30px',
  fontStyle: 'normal',
  fontWeight: 300,
  lineHeight: '12px',
  letterSpacing: '0.15px',
};

const inputStyle = {
  margin: '20px 40px',
  width: '100%',
  borderRadius: '11px',
  background: 'linear-gradient(93deg, rgba(217, 217, 217, 0.40) 17.46%, rgba(217, 217, 217, 0.10) 82.78%)',
  boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.10)',
  backdropFilter: 'blur(1.5px)',
};

const activeButtonStyle = {
  ...defaultButtonStyle,
  background: 'linear-gradient(120deg, rgba(38, 85, 255, 0.80) 26.35%, rgba(0, 117, 255, 0.60) 83.58%)',
};

const headerStyle = {
  width: '100%',
  height: '0px',
  color: '#000',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '45px',
  fontStyle: 'normal',
  fontWeight: 300,
  lineHeight: '12px',
  letterSpacing: '0.15px',
};

function Button({ buttonName, activeButton, setActiveButton }) {
  const handleButtonClick = () => {
    setActiveButton(buttonName);
  };

  const buttonStyle = activeButton === buttonName ? activeButtonStyle : defaultButtonStyle;

  return (
    <div>
      <button style={buttonStyle} onClick={handleButtonClick}>
        {buttonName}
      </button>
    </div>
  );
}

function Home() {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <div style={{ display: 'flex', alignItems: 'left' }}>
      <div>
        <TopNavigationBar />
        <Button buttonName="View Patients" activeButton={activeButton} setActiveButton={setActiveButton} /><br></br>
        <Button buttonName="Add Patients" activeButton={activeButton} setActiveButton={setActiveButton} /><br></br>
        <Button buttonName="View Profile" activeButton={activeButton} setActiveButton={setActiveButton} />
      </div>
      <div>
        {activeButton === 'View Patients' && (
          <div style={headerStyle}>
            <p>Viewing Patients</p>
        
          </div>
        )}
        {activeButton === 'Add Patients' && (
  <div>
    <Grid container spacing={1} style={headerStyle}>
      <Grid >
        <p style={headerStyle}>Add Patients</p>
        <Grid container spacing={2} direction="column" alignItems="left">
          <Grid item>
            <TextField
              label="Forename"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Forename"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Forename"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid >
        <Grid container spacing={1} direction="column" alignItems="left">
          <Grid item>
            <TextField
              label="Forename"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Forename"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Forename"
              variant="filled"
              style={inputStyle}
              required
              InputProps={{ disableUnderline: true }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
)}


{activeButton === 'View Profile' && (
  <div style={headerStyle}>
    <p>View Profile</p>
   
  </div>
)}

      </div>
    </div>
  );
}

export default Home;

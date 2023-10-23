import { Typography } from '@mui/material';
import React from 'react';
import SearchBar from '../components/widgets/SearchBar/SearchBar';

function ViewAllPatients() {
  const titleStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
  };

  const topBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  };
  return (
    <>
      <div style={topBarStyle}>
        <Typography varient="h1" style={titleStyle}>
          View Patients
        </Typography>
        <SearchBar />
      </div>
    </>
  );
}

export default ViewAllPatients;

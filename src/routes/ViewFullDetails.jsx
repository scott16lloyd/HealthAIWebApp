import React, { useState } from 'react';
import { Typography } from '@mui/material';
import Dropdown from '../components/widgets/Dropdown/Dropdown';

function ViewFullDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const dropdownContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingTop: '2rem',
  };

  const titleStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
  };
  return (
    <div style={dropdownContainerStyle}>
      {isLoading ? (
        <Typography variant="h1" style={titleStyle}>
          Loading...
        </Typography>
      ) : (
        <Dropdown title={'Patient Details'} data={'test data'} />
      )}
      <Dropdown title={'View Patient Insurance Details'} data={'test data'} />
    </div>
  );
}

export default ViewFullDetails;

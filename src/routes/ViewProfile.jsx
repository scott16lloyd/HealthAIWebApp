import React from 'react';
import { Typography } from '@mui/material';
function ViewProfile() {
  const name = 'John Doe';
  const titleStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
  };
  return (
    <>
      <Typography varient="h1" style={titleStyle}>
        Viewing full details for {name}
      </Typography>
    </>
  );
}

export default ViewProfile;

import React from 'react';
import { Card, Avatar, Typography } from '@mui/material';

function PatientOverviewWidget({ name, id, avatar }) {
  const avatarContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '40%',
  };

  const textContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  };

  return (
    <Card
      size="md"
      variant="outlined"
      sx={{
        width: 320,
        height: 150,
        borderRadius: 5,
        backgroundColor: '#F9F9F9',
        display: 'flex',
      }}
    >
      <div style={avatarContainerStyles}>
        <Avatar
          variant="outlined"
          sx={{ width: 80, height: 80 }}
          alt="Default Profile Image"
          src={avatar}
        />
      </div>
      <div style={textContainerStyles}>
        <Typography sx={{ fontSize: '2rem' }}>{name}</Typography>
        <Typography sx={{ fontSize: '1.2rem' }}>ID: {id}</Typography>
      </div>
    </Card>
  );
}

export default PatientOverviewWidget;

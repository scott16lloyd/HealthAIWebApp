import React from 'react';
import { Card, Avatar, Typography } from '@mui/material';

function stringToColor(string) {
  if (string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  } else {
    let color = '#D9D9D9';
    return color;
  }
}

function stringAvatar(name) {
  if (name !== '') {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  } else {
    return 'n/a';
  }
}

function PatientOverviewWidget({ name, id }) {
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
          style={{ height: '80px', width: '80px', fontSize: '2rem' }}
          variant="outlined"
          alt="Default Profile Image"
          {...stringAvatar(name)}
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

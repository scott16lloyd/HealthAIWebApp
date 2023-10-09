import React from 'react';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';

function TopNavigationBar({ aboutNav, helpNav }) {
  return (
    <Box
      sx={{
        width: '50%',
        height: '160px',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{ display: 'flex', flexDirection: 'column', margin: '0.5rem' }}
      >
        <Typography variant="h1">
          <span>Health</span>
          <span style={{ color: '#268AFF' }}>AI</span>
        </Typography>
        <Typography variant="h6">Developed by SSSD</Typography>
      </div>
      <div
        style={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          padding: '1rem',
        }}
      >
        <Button
          onClick={aboutNav}
          variant="text"
          size="large"
          sx={{
            fontSize: 30,
            boxShadow: 'none',
            margin: '0.5rem',
            textTransform: 'none',
          }}
        >
          About
        </Button>
        <Button
          onClick={helpNav}
          variant="text"
          size="large"
          sx={{
            fontSize: 30,
            boxShadow: 'none',
            margin: '0.5rem',
            textTransform: 'none',
          }}
        >
          Help
        </Button>
      </div>
    </Box>
  );
}

export default TopNavigationBar;

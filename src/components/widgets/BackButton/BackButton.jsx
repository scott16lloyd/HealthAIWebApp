import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton({ onClick }) {
  return (
    <IconButton
      aria-label="delete"
      sx={{
        borderRadius: '0.8rem',
        backgroundColor: '#D9D9D9',
        color: 'black',
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}

export default BackButton;

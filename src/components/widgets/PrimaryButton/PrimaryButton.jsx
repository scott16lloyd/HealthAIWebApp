import React from 'react';
import Button from '@mui/material/Button';

function PrimaryButton({ text, onClick }) {
  return (
    <>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          background: '#2187FF',
          fontWeight: 100,
          textTransform: 'none',
          borderRadius: '0.4rem',
          '&:hover': {
            background: '#2655FF',
          },
        }}
      >
        {text}
      </Button>
    </>
  );
}

export default PrimaryButton;

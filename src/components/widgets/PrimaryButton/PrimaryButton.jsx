import React from 'react';
import Button from '@mui/material/Button';

function PrimaryButton({ text, onClick, color }) {
  return (
    <>
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          background: { color },
          fontWeight: 100,
          textTransform: 'none',
          borderRadius: '0.4rem',
          '&:hover': {
            background: { color },
          },
        }}
      >
        {text}
      </Button>
    </>
  );
}

export default PrimaryButton;

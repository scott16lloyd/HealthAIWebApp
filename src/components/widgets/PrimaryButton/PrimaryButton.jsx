import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function PrimaryButton({ text, to, color }) {
  return (
    <>
      <Link to={to} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          sx={{
            width: '230px',
            height: '70px',
            margin: '0.8rem',
            background: color,
            fontSize: 30,
            fontWeight: 100,
            textTransform: 'none',
            borderRadius: '0.4rem',
            '&:hover': {
              background: color,
            },
          }}
        >
          {text}
        </Button>
      </Link>
    </>
  );
}

export default PrimaryButton;

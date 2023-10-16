import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function PrimaryButton({ text, to, color, action }) {
  const buttonStyle = {
    width: '210px',
    height: '50px',
    flexShrink: 0,
    margin: '0.8rem',
    fontSize: 24,
    fontWeight: 100,
    textTransform: 'none',
    borderRadius: '11px',
    background:
      'linear-gradient(120deg, rgba(38, 85, 255, 0.80) 26.35%, rgba(0, 117, 255, 0.60) 83.58%)',
    boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.10)',
    backdropFilter: 'blur(1.5px)',
    '&:hover': {
      background: color,
    },
  };

  return (
    <>
      <Link to={to} style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={buttonStyle} onClick={action}>
          {text}
        </Button>
      </Link>
    </>
  );
}

export default PrimaryButton;

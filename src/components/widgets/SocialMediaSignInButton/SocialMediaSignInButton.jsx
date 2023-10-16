import React from 'react';
import Button from '@mui/material/Button';
import GoogleG from '../../../images/GoogleG.png';
import Apple from '../../../images/AppleLogo.png';
import { signInWithGoogle } from '../../../firebase';

function SocialMediaSignInButton({ socialPlatform }) {
  let image = null;
  let text = null;
  let method = null;

  if (socialPlatform === 'apple') {
    image = Apple;
    text = 'Apple';
    method = null;
  } else if (socialPlatform === 'google') {
    image = GoogleG;
    text = 'Google';
    method = signInWithGoogle;
  } else {
    image = null;
    text = null;
    method = null;
  }

  const handleSignIn = () => {
    if (method) {
      method();
    }
  };

  return (
    <Button
      onClick={handleSignIn}
      sx={{ height: '3rem', margin: '1rem', width: '260px' }}
      variant="outlined"
      startIcon={
        <img
          src={image}
          alt="Google G"
          style={{ width: '24px', height: '24px' }}
        />
      }
    >
      Sign in with {text}
    </Button>
  );
}

export default SocialMediaSignInButton;

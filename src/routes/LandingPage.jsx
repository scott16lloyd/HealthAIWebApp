import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <>
      <h1>Welcome to the landing page</h1>
      <Link to="/signIn">Sign In</Link>
    </>
  );
}

export default LandingPage;

import React from 'react';
import { UserAuth } from '../components/auth/AuthContext';

function Home() {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Home</h1>
      {user ? <button onClick={handleSignOut}>Logout</button> : null}
    </>
  );
}

export default Home;

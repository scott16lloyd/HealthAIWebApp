import React, { useState } from 'react';
import { UserAuth } from '../components/auth/AuthContext';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';

function Home() {
  // Manage state of button, including default state
  const [buttonStates, setButtonStates] = useState({
    viewPatients: 'active',
    addPatient: 'unactive',
    viewProfile: 'unactive',
  });

  const handleButtonClick = (buttonKey) => {
    const newButtonStates = {
      viewPatients: 'unactive',
      addPatient: 'unactive',
      viewProfile: 'unactive',
      [buttonKey]: 'active',
    };
    setButtonStates(newButtonStates);
  };

  const buttonColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '80%',
    gap: '1rem',
    margin: '2rem',
  };

  // Define user related objects
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
      <TopNavigationBar />
      {user ? <button onClick={handleSignOut}>Logout</button> : null}
      <div style={buttonColumnStyle}>
        <PrimaryButton
          text={'View Patients'}
          state={buttonStates.viewPatients}
          action={() => handleButtonClick('viewPatients')}
        />
        <PrimaryButton
          text={'Add Patient'}
          state={buttonStates.addPatient}
          action={() => handleButtonClick('addPatient')}
        />
        <PrimaryButton
          text={'View Profile'}
          state={buttonStates.viewProfile}
          action={() => handleButtonClick('viewProfile')}
        />
      </div>
    </>
  );
}

export default Home;

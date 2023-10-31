import React, { useState } from 'react';
import { UserAuth } from '../components/auth/AuthContext';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';
import ViewAllPatients from './ViewAllPatients';
import AddPatient from './AddPatient';
import ViewProfile from './ViewProfile';
import Footer from '../components/widgets/Footer/Footer';

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

  const outerWrapperStyle = {
    display: 'flex',
    flexDirection: 'row',
  };

  const displayContainer = {
    width: '75%',
    paddingLeft: '4rem',
    paddingRight: '4rem',
    paddingTop: '1rem',
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
      <div style={outerWrapperStyle}>
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
        <div style={displayContainer}>
          {buttonStates.viewPatients === 'active' && <ViewAllPatients />}
          {buttonStates.addPatient === 'active' && <AddPatient />}
          {buttonStates.viewProfile === 'active' && <ViewProfile />}
        </div>
      </div>
      < Footer />
      <div>
        
      </div>
    </>
  );
}
export default Home;

import React, { useState, useEffect } from 'react';
import { UserAuth } from '../components/auth/AuthContext';
import UserProfile from '../components/widgets/UserProfile/UserProfile';
import { Typography } from '@mui/material';
import Dropdown from '../components/widgets/Dropdown/Dropdown';
import BackButton from '../components/widgets/BackButton/BackButton';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

function ViewProfile() {
  // State
  const [doctorData, setDoctorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPatients, setFilteredPatients] = useState([]);

  // Log the current user
  const { user } = UserAuth();
  let userUid;

  // Get the current user's UID
  if (user) {
    userUid = user.uid;
  } else {
    userUid = 0;
    console.log('No user found');
  }

  // Create a reference to the user's data in the database
  const userRef = ref(database, `doctors/${userUid}`);
  const patientsRef = ref(database, 'patients');

  // Read the data at the reference
  useEffect(() => {
    const fetchDataAndFilterPatients = async () => {
      // Fetch user data
      try {
        const userSnapshot = await get(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const gpIdNumber = userData.gpIdNumber;
          if (userData) {
            setDoctorData({
              name: `${user.displayName}`,
              gpID: `${userData.gpIdNumber}`,
              address: `${userData.officeAddress}`,
              phoneNumber: `${userData.telephone}`,
            });
          } else {
            setDoctorData('No data found');
          }

          // Fetch patients with the specified gpIdNumber
          const patientsSnapshot = await get(patientsRef);
          if (patientsSnapshot.exists()) {
            const patientsData = patientsSnapshot.val();
            // Filter patients by doctor value (gpIdNumber)
            const filteredPatients = Object.values(patientsData).filter(
              (patient) => {
                return patient.doctor === gpIdNumber;
              }
            );
            setFilteredPatients(filteredPatients);
            console.log(filteredPatients);
          } else {
            console.log('No patient data found.');
          }
        } else {
          console.log('No data found for the user');
        }
      } catch (error) {
        console.error('Error accessing user or patient data:', error);
      } finally {
        // Set isLoading to false after fetching data
        setIsLoading(false);
      }
    };

    if (user) {
      fetchDataAndFilterPatients();
    }
  }, [userUid]);

  const [assignedPatients, setAssignedPatients] = useState([]);
  useEffect(() => {
    // Iterate through filteredPatients and extract first_name and last_name
    const newAssignedPatients = filteredPatients.map(
      (patient) => `${patient.forename} ${patient.surname}`
    );
    setAssignedPatients(newAssignedPatients);
  }, [filteredPatients]);

  const titleStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
  };

  const dropdownContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingTop: '2rem',
  };

  const topBarWrapper = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '2rem',
  };

  const mainWrapper = {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    paddingLeft: '5rem',
    paddingTop: '5rem',
  };

  const titleWrapper = {
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
  };

  const buttonColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '80%',
    gap: '1rem',
    margin: '2rem',
  };

  const outerWrapper = {
    display: 'flex',
    flexDirection: 'row',
  };

  return (
    <>
      <div style={topBarWrapper}>
        <TopNavigationBar />
        {user ? <UserProfile /> : null}
      </div>
      <div style={outerWrapper}>
        <div style={buttonColumnStyle}>
          <PrimaryButton
            text={'View Profile'}
            to={'/viewProfile'}
            state={'active'}
          />
        </div>
        <div style={mainWrapper}>
          <div style={titleWrapper}>
            <BackButton goBackPath={'/home'} />
            {isLoading ? (
              <Typography variant="h1" style={titleStyle}>
                Loading...
              </Typography>
            ) : doctorData ? (
              <Typography variant="h1" style={titleStyle}>
                Viewing full details for{' '}
                {doctorData.name ? doctorData.name : 'No Name Provided'}
              </Typography>
            ) : (
              <Typography variant="h1" style={titleStyle}>
                No data available
              </Typography>
            )}
          </div>
          <div style={dropdownContainerStyle}>
            {isLoading ? (
              <Typography variant="h1" style={titleStyle}>
                Loading...
              </Typography>
            ) : (
              <Dropdown
                title={'View Doctor Details'}
                data={doctorData ? doctorData : ['No doctor data']}
              />
            )}
            <Dropdown
              title={'View Assigned Patients'}
              data={
                assignedPatients.length === 0
                  ? ['No patients']
                  : assignedPatients
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProfile;

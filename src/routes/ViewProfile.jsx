import React, { useState, useEffect } from 'react';
import { UserAuth } from '../components/auth/AuthContext';
import UserProfile from '../components/widgets/UserProfile/UserProfile';
import { Typography } from '@mui/material';
import Dropdown from '../components/widgets/Dropdown/Dropdown';
import BackButton from '../components/widgets/BackButton/BackButton';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
function ViewProfile() {
  const id = '5';
  const apiURL = `https://healthai-40b47-default-rtdb.europe-west1.firebasedatabase.app/doctors.json?Authorization=Bearer Lv0Ps3n1nkNuSjvIolRnRhCC1UMnasT4njYp4gVJ&orderBy="docID"&equalTo=${id}`;

  // State
  const [doctorData, setDoctorData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const assignedPatients = ['Tom', 'John', 'Sean', 'Paul'];

  const fetchData = async () => {
    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const doctorArray = Object.keys(data).map((key) => data[key]);
      setDoctorData(doctorArray);
      console.log(doctorData);
      console.log(doctorArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const doctorDetails = isLoading
    ? null
    : {
        name: `${doctorData[0].first_name} ${doctorData[0].last_name}`,
        gpID: `${doctorData[0].GPID}`,
        address: `${doctorData[0].home_address}`,
        phoneNumber: `${doctorData[0].telephone}`,
      };

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
    paddingLeft: '20rem',
    paddingTop: '5rem',
  };

  const titleWrapper = {
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
  };

  const { user } = UserAuth();
  console.log(user);
  return (
    <>
      <div style={topBarWrapper}>
        <TopNavigationBar />
        {user ? <UserProfile /> : null}
      </div>
      <div style={mainWrapper}>
        <div style={titleWrapper}>
          <BackButton goBackPath={'/home'} />
          {isLoading ? (
            <Typography variant="h1" style={titleStyle}>
              Loading...
            </Typography>
          ) : (
            <Typography variant="h1" style={titleStyle}>
              Viewing full details for {doctorData[0].first_name}{' '}
              {doctorData[0].last_name}
            </Typography>
          )}
        </div>
        <div style={dropdownContainerStyle}>
          {isLoading ? (
            <Typography variant="h1" style={titleStyle}>
              Loading...
            </Typography>
          ) : (
            <Dropdown title={'View Doctor Details'} data={doctorDetails} />
          )}
          <Dropdown title={'View Assigned Patients'} data={assignedPatients} />
        </div>
      </div>
    </>
  );
}

export default ViewProfile;

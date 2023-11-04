import React from 'react';
import { UserAuth } from '../components/auth/AuthContext';
import UserProfile from '../components/widgets/UserProfile/UserProfile';
import { Typography } from '@mui/material';
import Dropdown from '../components/widgets/Dropdown/Dropdown';
import BackButton from '../components/widgets/BackButton/BackButton';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
function ViewProfile() {
  // Sample data
  const doctorDetails = {
    name: 'Dr. John Doe',
    age: 29,
    sex: 'male',
    gpID: '1G145P33',
    address: '348 Thorne St. Zion, IL 60099',
    phoneNumber: '+353 878562210',
  };

  const assignedPatients = ['Tom', 'John', 'Sean', 'Paul'];

  const name = 'John Doe';
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
  return (
    <>
      <div style={topBarWrapper}>
        <TopNavigationBar />
        {user ? <UserProfile /> : null}
      </div>
      <div style={mainWrapper}>
        <div style={titleWrapper}>
          <BackButton goBackPath={'/home'} />
          <Typography varient="h1" style={titleStyle}>
            Viewing full details for {name}
          </Typography>
        </div>
        <div style={dropdownContainerStyle}>
          <Dropdown title={'View Doctor Details'} data={doctorDetails} />
          <Dropdown title={'View Assigned Patients'} data={assignedPatients} />
        </div>
      </div>
    </>
  );
}

export default ViewProfile;

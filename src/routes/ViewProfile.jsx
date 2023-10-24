import React from 'react';
import { Typography } from '@mui/material';
import Dropdown from '../components/widgets/Dropdown/Dropdown';
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
  return (
    <>
      <Typography varient="h1" style={titleStyle}>
        Viewing full details for {name}
      </Typography>
      <div style={dropdownContainerStyle}>
        <Dropdown title={'View Doctor Details'} data={doctorDetails} />
        <Dropdown title={'View Assigned Patients'} data={assignedPatients} />
      </div>
    </>
  );
}

export default ViewProfile;

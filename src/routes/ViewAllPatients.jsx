import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/widgets/SearchBar/SearchBar';
import PatientOverviewWidget from '../components/widgets/PatientOverviewWidget/PatientOverviewWidget';
import Grid from '@mui/system/Unstable_Grid/Grid';

function ViewAllPatients() {
  const doctorID = '1234567890';
  const apiUrl = `'https://healthai-40b47-default-rtdb.europe-west1.firebasedatabase.app/patients.json?auth=Lv0Ps3n1nkNuSjvIolRnRhCC1UMnasT4njYp4gVJorderBy="doctor"&equalTo"${doctorID}`;
  const [patientsData, setPatientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response);
      const data = await response.json();
      setPatientsData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  const titleStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '40px',
    fontStyle: 'normal',
    fontWeight: 300,
    lineHeight: 'normal',
  };

  const topBarStyle = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: '4rem',
    paddingBottom: '4rem',
  };

  const dataContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    height: '52vh',
    overflowY: 'auto',
    overflowX: 'hidden',
  };
  return (
    <>
      <div style={topBarStyle}>
        <Typography varient="h1" style={titleStyle}>
          View Patients
        </Typography>
        <SearchBar />
      </div>
      <div style={dataContainerStyle}>
        <Grid container spacing={2}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Grid item xs={4} key={index}>
              <PatientOverviewWidget name="John Doe" id={12345} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ViewAllPatients;

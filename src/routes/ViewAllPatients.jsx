import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/widgets/SearchBar/SearchBar';
import PatientOverviewWidget from '../components/widgets/PatientOverviewWidget/PatientOverviewWidget';
import Grid from '@mui/system/Unstable_Grid/Grid';

function ViewAllPatients() {
  const doctorID = '1234567890';
  const apiUrl = `https://healthai-40b47-default-rtdb.europe-west1.firebasedatabase.app/patients.json?Authorization=Bearerhttps&orderBy="Doctor"&equalTo="${doctorID}"`;

  const [patientsData, setPatientsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch doctor's patient data
  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const patientsArray = Object.keys(data).map((key) => data[key]);
      setPatientsData(patientsArray);
      console.log(patientsData);
      console.log(patientsArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Fetch data when the component mounts

  // Styling
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
        <SearchBar options={patientsData.map((patient) => patient.Name)} />
      </div>
      <div style={dataContainerStyle}>
        {patientsData.length === 0 ? (
          <p>No patients available</p>
        ) : (
          <Grid container spacing={2}>
            {patientsData.map((patient, index) => (
              <Grid item xs={4} key={index}>
                <PatientOverviewWidget
                  name={patient.Name}
                  id={patient.PatientID}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

export default ViewAllPatients;

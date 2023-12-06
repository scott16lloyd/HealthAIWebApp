import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/widgets/SearchBar/SearchBar';
import PatientOverviewWidget from '../components/widgets/PatientOverviewWidget/PatientOverviewWidget';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { UserAuth } from '../components/auth/AuthContext';
import { Link } from 'react-router-dom';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

function ViewAllPatients() {
  const { user } = UserAuth();
  const doctorID = user.uid;

  // State
  const [doctorsPatients, setDoctorsPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
  };

  const filteredPatientsData = doctorsPatients.filter((patient) => {
    const patient_name = patient.forename + ' ' + patient.surname;
    return patient_name.toLowerCase().includes(search.toLowerCase());
  });

  // Get doctors patients
  const patientsRef = ref(database, 'patients');
  const doctorsRef = ref(database, 'doctors');
  useEffect(() => {
    const fetchDoctorsPatientData = async () => {
      // Fetch user data
      try {
        // Get doctor and patient reference in database
        const patientsSnapshot = await get(patientsRef);
        const doctorsSnapshot = await get(doctorsRef);
        // Check if the reference exists
        if (patientsSnapshot.exists() && doctorsSnapshot.exists()) {
          // get raw data objects from the database
          const patientsData = patientsSnapshot.val();
          const doctorsData = doctorsSnapshot.val();

          // Convert object values to an array
          const patientsArray = Object.values(patientsData);

          // Match logged in user with doctor in database
          const doctor = doctorsData[user.uid];

          // Find the patient with the matching patID
          const doctorsPatients = patientsArray.filter(
            (patient) => patient.doctor === doctor.gpIdNumber
          );
          setDoctorsPatients(doctorsPatients);
        } else {
          console.log('No patient data found.');
        }
      } catch (error) {
        console.error('Error accessing patient data:', error);
      } finally {
        // Set isLoading to false after fetching data
        setIsLoading(false);
      }
    };
    // Add a closing brace for the fetchPatientData function
    fetchDoctorsPatientData();
  }, []);

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
    paddingTop: '0.1rem',
  };

  return (
    <>
      <div style={topBarStyle}>
        <Typography varient="h1" style={titleStyle}>
          View Patients
        </Typography>
        {isLoading ? (
          <p>Loading...</p> // You can replace this with a loading indicator
        ) : (
          <SearchBar
            options={doctorsPatients.map(
              (patient) => `${patient.forename} ${patient.surname}`
            )}
            onSearch={handleSearch}
          />
        )}
      </div>
      <div style={dataContainerStyle}>
        {isLoading ? (
          <p>Loading...</p> // You can replace this with a loading indicator
        ) : doctorsPatients.length === 0 ? (
          <p>No patients available</p>
        ) : (
          <Grid container spacing={2}>
            {filteredPatientsData.map((patient, index) => (
              <Grid item xs={4} key={index}>
                <Link
                  to={`/viewPatientDetails/${patient.PPSN}`}
                  key={index}
                  style={{ textDecoration: 'none' }}
                >
                  <PatientOverviewWidget
                    name={`${patient.forename} ${patient.surname}`}
                    id={patient.PPSN}
                  />
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

export default ViewAllPatients;

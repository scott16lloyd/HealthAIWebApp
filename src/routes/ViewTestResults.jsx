import React, { useEffect, useState } from 'react';
import TestHistoryWidget from '../components/widgets/TestHistoryWidget/TestHistoryWidget';
import { Typography } from '@mui/material';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';
import { Link, useParams } from 'react-router-dom';

function ViewTestResults() {
  const [isLoading, setIsLoading] = useState(null);
  const [resultHistory, setResultHistory] = useState([]);

  const { PPSN } = useParams();

  // Create a reference to the user's data in the database
  const patientRef = ref(database, `patients`);
  const doctorRef = ref(database, 'doctors');

  // Read the data at the reference
  useEffect(() => {
    const fetchDataAndFilterPatients = async () => {
      // Fetch user data
      try {
        const userSnapshot = await get(patientRef);
        const doctorSnapshot = await get(doctorRef);

        if (userSnapshot.exists() && doctorSnapshot.exists()) {
          const patientData = userSnapshot.val();

          // Get patient's testHistory based on given PPSN
          const specificPatient = Object.values(patientData).filter(
            (patient) => patient.PPSN === PPSN
          );

          if (specificPatient.length > 0) {
            // Access the resultHistory object and store it in an array
            const resultHistoryArray = specificPatient
              .filter((patient) => patient['testHistory'])
              .map((patient) =>
                Object.entries(patient['testHistory']).map(
                  ([date, results]) => ({
                    date,
                    colonResult: results.colonResult,
                    heartResult: results.heartResult,
                    lungResult: results.lungResult,
                  })
                )
              );
            setResultHistory(resultHistoryArray);
          }
        } else {
          console.log('No patient data found.');
        }
      } catch (error) {
        console.error('Error accessing user or patient data:', error);
      } finally {
        // Set isLoading to false after fetching data
        setIsLoading(false);
      }
    };

    fetchDataAndFilterPatients();
  }, []);

  const testWidgetContainer = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '56vh',
    padding: '2rem',
    paddingLeft: '1rem',
    gap: '2rem',
    overflowY: 'auto',
    overflowX: 'hidden',
  };
  return (
    <div style={testWidgetContainer}>
      {isLoading ? (
        <Typography variant="h1">Loading...</Typography>
      ) : resultHistory.length === 0 ? (
        <Typography variant="h4">No tests available</Typography>
      ) : (
        resultHistory.map((testResults, index) =>
          testResults.map((testResult, subIndex) => (
            <Link
              to={`/viewPatientDetails/${PPSN}/test/${testResult.date}`}
              key={`${index}-${subIndex}`}
              style={{ textDecoration: 'none' }}
            >
              <TestHistoryWidget
                date={testResult.date}
                key={`${index}-${subIndex}`}
              />
            </Link>
          ))
        )
      )}
    </div>
  );
}

export default ViewTestResults;

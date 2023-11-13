import React, { useEffect, useState } from 'react';
import TestHistoryWidget from '../components/widgets/TestHistoryWidget/TestHistoryWidget';
import { Typography } from '@mui/material';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

function ViewTestResults() {
  const [isLoading, setIsLoading] = useState(null);
  const [resultHistory, setResultHistory] = useState([]);

  // Get the current user's UID
  const patID = 0;

  // Create a reference to the user's data in the database
  const patientRef = ref(database, `patients/${patID}`);

  // Read the data at the reference
  useEffect(() => {
    const fetchDataAndFilterPatients = async () => {
      // Fetch user data
      try {
        const userSnapshot = await get(patientRef);
        if (userSnapshot.exists()) {
          const patientData = userSnapshot.val();
          if (patientData['result history']) {
            setResultHistory(patientData['result history']);
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
    paddingLeft: 0,
    gap: '2rem',
    overflowY: 'auto',
    overflowX: 'hidden',
  };
  return (
    <div style={testWidgetContainer}>
      {isLoading ? (
        <Typography variant="h1">Loading...</Typography>
      ) : (
        resultHistory.map((testResult, index) => (
          <TestHistoryWidget date={testResult.date} key={index} />
        ))
      )}
    </div>
  );
}

export default ViewTestResults;

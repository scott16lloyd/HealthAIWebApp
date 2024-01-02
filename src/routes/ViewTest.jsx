import React, { useEffect, useState } from 'react';
import { Typography, Card } from '@mui/material';
import { UserAuth } from '../components/auth/AuthContext';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import UserProfile from '../components/widgets/UserProfile/UserProfile';
import BackButton from '../components/widgets/BackButton/BackButton';
import TargetAreaWidget from '../components/widgets/TargetAreaWidget/TargetAreaWidget';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

function ViewTest() {
  const [isLoading, setIsLoading] = useState(true);
  // Declare and initialize a state variable for medicalRecords
  const [medicalRecords, setMedicalRecords] = useState(null);

  const { PPSN, testDate } = useParams();

  const patientRef = ref(database, 'patients');

  const [testResult, setTestResult] = useState({
    colonResult: 'N/A',
    heartResult: 'N/A',
    lungResult: 'N/A',
  });

  useEffect(() => {
    const fetchPatientData = async () => {
      // Fetch user data
      try {
        const userSnapshot = await get(patientRef);
        if (userSnapshot.exists()) {
          const patientData = userSnapshot.val();

          // Filter the patientArray to get the patient with the given PPSN
          const specificPatient = Object.values(patientData).filter(
            (patient) => patient.PPSN === PPSN
          );

          // Access resultHistory from the patient object
          const resultHistory = specificPatient[0].testHistory;

          // Filter resultHistory for the test result with the matching date
          const result = resultHistory[testDate];

          if (result) {
            setTestResult({
              colonResult: result.colonResult || 'N/A',
              heartResult: result.heartResult || 'N/A',
              lungResult: result.lungResult || 'N/A',
            });
          } else {
            console.log(`No test result found for ${testDate}`);
          }
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
    fetchPatientData();
  }, []);

  useEffect(() => {
    const fetchPatientQuestions = async () => {
      // Fetch user data
      try {
        const userSnapshot = await get(patientRef);
        if (userSnapshot.exists()) {
          const patientData = userSnapshot.val();

          // Filter the patientArray to get the patient with the given PPSN
          const specificPatient = Object.values(patientData).filter(
            (patient) => patient.PPSN === PPSN
          );

          // Get medicalRecords from the patient object and assign it to the state variable
          setMedicalRecords(specificPatient[0].medicalRecords[testDate]);
        }
      } catch (error) {
        console.error('Error accessing patient data:', error);
      } finally {
        // Set loading status to false after data has been fetched
        setIsLoading(false);
      }
    };
    fetchPatientQuestions();
  }, []);

  const topBarWrapper = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: '2rem',
  };

  const outerWrapper = {
    width: '100%',
    height: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  };

  const titleWrapper = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
  };

  const leftColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '4rem',
    gap: '3rem',
    width: '50vw',
  };

  const rightColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginRight: '15rem',
  };

  const widgetContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    marginLeft: '9rem',
  };

  const questionCardStyle = {
    width: '550px',
    height: '90%',
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    padding: '2rem',
    overflowY: 'auto',
    overflowX: 'hidden',
  };

  const { user } = UserAuth();

  let questions = {};

  if (medicalRecords) {
    questions = {
      'Do you smoke regularly': medicalRecords.Q1 || 'N/A',
      'Do you consume alcohol often': medicalRecords.Q10 || 'N/A',
      'Do you struggle with any other chronic disease?':
        medicalRecords.Q11 || 'N/A',
      'Are you a diabetic?': medicalRecords.Q12,
      'Do you feel constant fatigue or tiredness?': medicalRecords.Q13 || 'N/A',
      'Have you undergone any unexpected weight loss?':
        medicalRecords.Q14 || 'N/A',
      'What is your current Blood Pressure? (0 if not known)':
        medicalRecords.Q15 || 'N/A',
      'What is your current Heart Rate? (0 if not known)':
        medicalRecords.Q16 || 'N/A',
      'What is your Cholesterol level? (0 if not known)':
        medicalRecords.Q17 || 'N/A',
      'Have you had any stomach cramps?': medicalRecords.Q2 || 'N/A',
      'Do you experience significant chest pain on a regular basis?':
        medicalRecords.Q3 || 'N/A',
      'Are your fingertips a bright yellow?': medicalRecords.Q4 || 'N/A',
      'Have you experienced a high level of wheezing?':
        medicalRecords.Q5 || 'N/A',
      'Have you been coughing excessively?': medicalRecords.Q6 || 'N/A',
      'Have you been experiencing shortness of breath?':
        medicalRecords.Q7 || 'N/A',
      'Have you been experiencing bowel problems?': medicalRecords.Q8 || 'N/A',
      'Have you experienced any rectal bleeding?': medicalRecords.Q9 || 'N/A',
    };
  }

  return (
    <>
      <div style={topBarWrapper}>
        <TopNavigationBar />
        {user ? <UserProfile /> : null}
      </div>
      <div style={outerWrapper}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={leftColumnStyle}>
            <div style={titleWrapper}>
              <BackButton goBackPath={`/viewPatientDetails/${PPSN}`} />
              <Typography variant="h3">View Test From:</Typography>
              <Typography variant="h3" color={'#2187FF'}>
                {testDate}
              </Typography>
            </div>
            <div style={widgetContainer}>
              {testResult && (
                <>
                  <TargetAreaWidget
                    cancerType={'Colon Cancer'}
                    result={testResult.colonResult}
                  />
                  <TargetAreaWidget
                    cancerType={'Heart Cancer'}
                    result={testResult.heartResult}
                  />
                  <TargetAreaWidget
                    cancerType={'Lung Cancer'}
                    result={testResult.lungResult}
                  />
                </>
              )}
            </div>
          </div>
        )}
        <div style={rightColumnStyle}>
          {!isLoading && medicalRecords && (
            <Card style={questionCardStyle}>
              {Object.entries(questions).map(([question, answer]) => (
                <div key={question}>
                  <Typography variant="h5">{question}</Typography>
                  <Typography variant="subtitle1">{answer}</Typography>
                  <hr
                    style={{ margin: '1rem 0', border: '0.5px solid #000' }}
                  />
                </div>
              ))}
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewTest;

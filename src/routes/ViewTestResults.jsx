import React from 'react';
import TestHistoryWidget from '../components/widgets/TestHistoryWidget/TestHistoryWidget';

function ViewTestResults() {
  const dates = [
    '11/09/2023',
    '13/09/2023',
    '14/09/2023',
    '15/09/2023',
    '11/09/2023',
    '13/09/2023',
    '14/09/2023',
    '15/09/2023',
  ];

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
      {dates.map((date, index) => (
        <TestHistoryWidget date={date} />
      ))}
    </div>
  );
}

export default ViewTestResults;

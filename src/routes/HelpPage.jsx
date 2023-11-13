import React from 'react';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import BackButton from '../components/widgets/BackButton/BackButton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function HelpPage() {
  const helpTextStyle = {
    paddingLeft: '16px', // Adjust the padding value as needed
  };

  return (
    <>
      <TopNavigationBar />
      <Container>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/** Header of the page */}
          <BackButton goBackPath={'/home'} /> {/** Backbutton */}
          <Typography
            variant="h4"
            align="left"
            gutterBottom
            style={helpTextStyle}
          >
            Help
          </Typography>
        </div>
      </Container>
    </>
  );
}

export default HelpPage;

import React from 'react';
import TopNavigationBar from '../components/widgets/TopNavigationBar/TopNavigationBar';
import BackButton from '../components/widgets/BackButton/BackButton';
import {Container, Paper} from '@mui/material';
import Footer from '../components/widgets/Footer/Footer';
import Typography from '@mui/material/Typography';

function HelpPage() {
  const helpTextStyle = {
    paddingLeft: '16px', // Adjust the padding value as needed
  };

  const messageBoxStyle = {
    borderRadius: '11px',
    background:
      'linear-gradient(93deg, rgba(217, 217, 217, 0.40) 17.46%, rgba(217, 217, 217, 0.10) 82.78%)',
    boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.10)',
    backdropFilter: 'blur(1.5px)',
    padding: '1rem',
  };
  const aboutUsHeaderStyle = {
    paddingLeft: '20px',
  };

  return (
    <>
      <TopNavigationBar />
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom style={aboutUsHeaderStyle}>
          <BackButton goBackPath={'/home'} /> HealthAI FAQ
        </Typography>
     
        {/** Help Content */}
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Welcome to our Help Page! We’re here to assist you. Below, you’ll find answers to commonly asked questions and information to guide you through our platform.
        </Typography>

     
         

        <div style={{ marginTop: '20px' }}>
        
        <Paper elevation={3} style={messageBoxStyle}>
  
          <Typography variant="h5">Contact Support</Typography>
          <Typography variant="body1">
            If you can’t find the answers you need in our FAQs, our support team is here to help. You can reach out to us via email or phone.
          </Typography>
          </Paper>
        </div>
    

        {/** Additional information or resources */}
        <div style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={messageBoxStyle}>
          <Typography variant="h5">Additional Resources</Typography>
          <Typography variant="body1">
            Explore our blog or knowledge base for more tips, tutorials, and updates on our platform.
          </Typography>
          </Paper>
        </div>
      </Container>

      <div></div>
    </>
  );
}

export default HelpPage;

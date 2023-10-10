import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PrimaryButton from '../components/widgets/PrimaryButton/PrimaryButton.jsx';
import TextField from '@mui/material/TextField';

function DocBotPage() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    // Call your function here with the input text
    setOutputText(`You entered: ${inputText}`);
    console.log(inputText);
  };
  return (
    <div style={{ height: '100%', margin: 0 }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Box
          sx={{
            border: '1px solid #000',
            borderRadius: '10px',
            padding: '20px',
            width: '60%',
            height: '60%',
          }}
        >
          {outputText || 'Doc Bot'}
        </Box>
        <div style={{ padding: '1rem' }}>
          <TextField value={inputText} onChange={handleInputChange} />
          <PrimaryButton text={'Submit'} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default DocBotPage;

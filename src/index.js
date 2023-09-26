import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './components/auth/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignIn />
  </React.StrictMode>
);

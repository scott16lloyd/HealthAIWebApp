import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './components/auth/SignIn';
import CreateAccount from './components/auth/CreateAccount';
import AuthDetails from './components/auth/AuthDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SignIn />
    <CreateAccount />
    <AuthDetails />
  </React.StrictMode>
);

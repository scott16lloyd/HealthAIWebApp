import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import SignInPage from './routes/SignInPage';
import LandingPage from './routes/LandingPage';

function main() {
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default main;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import LandingPage from './routes/LandingPage';
import DocBotPage from './routes/DocBotPage';
import Help from './routes/Help';
import About from './routes/About';
import LoginPage from '../src/routes/LoginPage';
import SignUp from '../src/routes/SignUp';
import ProtectedRoute from './routes/ProtectedRoute';

function main() {
  return (
    <Router>
      <div>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route path="/docBot" element={<DocBotPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default main;

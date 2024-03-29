import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import LandingPage from './routes/LandingPage';
import HelpPage from './routes/HelpPage';
import About from './routes/About';
import LoginPage from './routes/LoginPage';
import SignUpPage from './routes/SignUpPage';
import PatientDetails from './routes/PatientDetails';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthContextProvider } from './components/auth/AuthContext';
import ViewProfile from './routes/ViewProfile';
import ViewPatientScreen from './routes/ViewPatientScreen';
import ViewTest from './routes/ViewTest';

function main() {
  return (
    <AuthContextProvider>
      <Router>
        <div>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/details" element={<PatientDetails />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/viewProfile" element={<ViewProfile />} />
            <Route
              path="/viewPatientDetails/:PPSN"
              element={<ViewPatientScreen />}
            />
            <Route
              path="/viewPatientDetails/:PPSN/test/:testDate"
              element={<ViewTest />}
            />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default main;

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import LandingPage from './components/LandingPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("handleLogin function is triggered");
    setLoggedIn(true);
  };


  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLogin={handleLogin} />} 
        />
        <Route
          path="/register"
          element={<RegistrationPage onRegistrationSuccess={handleRegistrationSuccess} />}
        />
        <Route 
          path="/landing" 
          element={loggedIn ? <LandingPage /> : <Navigate to="/"  />} 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;

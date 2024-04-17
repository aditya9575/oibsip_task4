import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import LandingPage from './components/LandingPage';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle login
  const handleLogin = () => {
    console.log("handleLogin function is triggered");
    // Set loggedIn state to true when login is successful
    setLoggedIn(true);
  };

  // Function to handle registration success
  const handleRegistrationSuccess = () => {
    // You can perform any logic here if needed upon registration success
    // For example, you might want to redirect the user to the login page
    // or perform any other action.
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<LoginPage onLogin={handleLogin} />} // Pass handleLogin function as prop
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

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import "./registerationpage.css"

const RegistrationPage = ({ onRegistrationSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/register', { username, password });
      if (response.status === 201) {
        // Registration successful
        setError('');
        onRegistrationSuccess();
        console.log('Registration successful'); // Log statement
        navigate('/'); // Navigate to the login page
      }
    } catch (error) {
      // Handle error responses
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  return (
    <div className="registration-page-container">
      <h2 className="registration-heading">Registration</h2>
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">Register</button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <p className="login-link">Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
};

export default RegistrationPage;

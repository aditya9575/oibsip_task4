// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
// import axios from 'axios';

// const LoginPage = ({ onLogin }) => { // Accept onLogin prop
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:4000/login', { username, password });
//       if (response.data && response.data.message === 'Login successful') {
//         // Call onLogin function upon successful login
//         onLogin();
//         setError('');
//         console.log('Login successful'); // Log statement for successful login
//         navigate('/landing'); // Navigate to the landing page
//       } else {
//         setError('Invalid credentials'); // Update error message for invalid credentials
//         console.log('Login failed'); // Log statement for failed login
//       }
//     } catch (error) {
//       // Handle error responses
//       setError('An error occurred during login');
//       console.error('Login failed:', error); // Log detailed error message
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//         {error && <div style={{ color: 'red' }}>{error}</div>}
//       </form>
//       <p> Don't have an account? <Link to="/register">Register</Link></p>
//     </div>
//   );
// };

// export default LoginPage;








// testing
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import axios from 'axios';
import "./loginpage.css"

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      if (response.data && response.data.message === 'Login successful') {
        // Call onLogin function upon successful login
        onLogin();
        setError('');
        console.log('Login successful'); // Log statement for successful login
        navigate('/landing'); // Navigate to the landing page
      } else {
        setError('Invalid credentials'); // Update error message for invalid credentials
        console.log('Login failed'); // Log statement for failed login
      }
    } catch (error) {
      // Handle error responses
      setError('An error occurred during login');
      console.error('Login failed:', error); // Log detailed error message
    }
  };

  return (
    <div className="login-page-container">
      <h2 className="login-heading">Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="login-button">Login</button>
        {error && <div className="error-message">{error}</div>}
      </form>
      <p className="register-link"> Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginPage;

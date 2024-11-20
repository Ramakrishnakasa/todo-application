import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Register from './Register';
import '../Login.css'; 

function Login({ setAuth }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      if (response.status === 200) {
        setAuth(true); // Set authentication to true
        localStorage.setItem('token', response.data.token); // Save token (if used)
        navigate('/todos'); // Redirect to Todos page
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
              className="input-field"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <Link to="/Register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to backend
      const response = await axios.post('http://localhost:8080/api/auth/register', credentials);

      if (response.status === 200) {
        alert(response.data); // Registration success message
        setError('');
        navigate('/login'); // Redirect to login page after registration
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error('Registration error:', err);
      // Check if the error has a response and if it's an object
      const errorMessage = err.response && err.response.data ? err.response.data : 'An error occurred during registration';
      setError(errorMessage);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{typeof error === 'string' ? error : JSON.stringify(error)}</p>}
    </div>
  );
}

export default Register;
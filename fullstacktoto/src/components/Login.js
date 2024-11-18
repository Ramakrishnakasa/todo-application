import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', credentials);
      alert(response.data);  // Show login success message
      localStorage.setItem('isAuthenticated', 'true');  // Set authentication status
      setError('');
      navigate('/todos');  // Redirect to TodoPage after successful login
    } catch (err) {
      setError('Invalid username or password');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}

      {/* Link to the Register page */}
      <p>
        Don't have an account? <Link to="/Register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;

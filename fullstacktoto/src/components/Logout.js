import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (for example, removing token)
    localStorage.removeItem('token');
    setAuth(false);  // Set authentication state to false

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;

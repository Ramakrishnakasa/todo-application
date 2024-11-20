import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainApp from './components/MainApp';
import './App.css';


function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <Router>
      <Routes>
        {/* Default route - Redirect to login if not authenticated */}
        <Route path="/" element = {<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protect the Todos route */}
        <Route path="/todos" element={isAuthenticated ? <MainApp /> : <Navigate to="/login" />} />
        <Route path = "*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

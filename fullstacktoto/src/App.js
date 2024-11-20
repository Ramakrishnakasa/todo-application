import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'; 
import TodoApp from './components/MainApp'; // Your Todo application page
import LogoutButton from './components/Logout';
import Register from './components/Register';
import './App.css'

function App() {
  const [auth, setAuth] = useState(false); // Managing authentication state

  return (
    <Router>
      <div className="App">
        {auth && <LogoutButton setAuth={setAuth} />}  {/* Show logout button only if authenticated */}
        
        <Routes>
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/todos" element={auth ? <TodoApp /> : <Login setAuth={setAuth} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

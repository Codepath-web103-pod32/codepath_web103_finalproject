import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

  const API_URL = 'http://localhost:3003'
  const [user, setUser] = useState()

  const getUser = async () => {
    const response = await fetch(
      `${API_URL}/auth/login/success`,
      { credentials: 'include' }
    )
    const json = await response.json()
    setUser(json.user)
  }

  useEffect(() => {
    getUser()
  }, [])

  const handleLogout = async () => {
    const response = await fetch(
      `${API_URL}/auth/logout`,
      { credentials: 'include' }
    )
    const json = await response.json()
    setUser(json)
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Logo</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/events">Events</Link>
        <Link to="/contact">Contact/About</Link>
        <Link to="/myevents">My Events</Link>

        {/* ChauPhan */}
        {user && user.id ?
          <Link to="/" onClick={handleLogout}>Logout</Link> :
          <Link to="/login">Login</Link>
        }
        {user && user.id ?
          <>Hello {user.username}!</>:
          <></>
        }
      </div>
    </nav>
  );
};

export default Navbar;

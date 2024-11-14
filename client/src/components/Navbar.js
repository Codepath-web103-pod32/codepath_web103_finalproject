import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
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
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  

  const API_URL = process.env.VITE_REACT_APP_BACKEND_URL || ''
  const [user, setUser] = useState();
  const [newAvatarUrl, setNewAvatarUrl] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

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

  const handleAvatarChange = async () => {
    const response = await fetch(`${API_URL}/profile/update-avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        githubId: user.github_id,
        newAvatarUrl,
      }),
    });
    const json = await response.json();
    if (json.success) {
      setUser((prevUser) => ({
        ...prevUser,
        avatar_url: newAvatarUrl,
      }));
      setNewAvatarUrl('');
      setIsEditingAvatar(false);
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    // <nav className="navbar">
    //   <div className="navbar-links">
    //     <Link to="/">Home</Link>
    //     <Link to="/clubs">Clubs</Link>
    //     <Link to="/events">Events</Link>
    //     <Link to="/myevents">My Events</Link>

    //     {user && user.id ? (
    //       <>
    //         <Link to="/" onClick={handleLogout}>
    //           Logout
    //         </Link>
    //         <div className="user-avatar-section">
    //           <img
    //             src={user.avatar_url}
    //             alt={`${user.username}'s avatar`}
    //             className="user-avatar"
    //           />
    //           <span>Hello {user.username}!</span>
    //           <button
    //             className="edit-avatar-button"
    //             onClick={() => setIsEditingAvatar(true)}
    //           >
    //             Edit Avatar
    //           </button>
    //         </div>
    //       </>
    //     ) : (
    //       <Link to="/login">Login</Link>
    //     )}
    //   </div>

    //   {isEditingAvatar && (
    //     <div className="edit-avatar-modal">
    //       <h3>Edit Avatar</h3>
    //       <input
    //         type="url"
    //         placeholder="Enter new avatar URL"
    //         value={newAvatarUrl}
    //         onChange={(e) => setNewAvatarUrl(e.target.value)}
    //         className="avatar-input"
    //       />
    //       <button onClick={handleAvatarChange} className="save-avatar-button">
    //         Save
    //       </button>
    //       <button
    //         onClick={() => setIsEditingAvatar(false)}
    //         className="cancel-avatar-button"
    //       >
    //         Cancel
    //       </button>
    //     </div>
    //   )}
    // </nav>

    <nav className="navbar">
    <div className="navbar-links">
      <Link to="/">Home</Link>
      <Link to="/clubs">Clubs</Link>
      <Link to="/events">Events</Link>
      <Link to="/myevents">My Events</Link>
    </div>
    {(user && user.id) ? <div className="user-avatar-section">
      <div className="dropdown">
        <img
          src="https://avatars.githubusercontent.co
Submissionm/u/29196787" // Replace with dynamic user.avatar_url
          alt="User Avatar"
          className="user-avatar"
          onClick={handleDropdownToggle}
        />
        {dropdownOpen && (
          <div className="dropdown-menu">
            <span>Hello rashmisubhash!</span>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
            {/* <button
              className="dropdown-item"
              onClick={() => alert('Edit Avatar clicked')}
            >
              Edit Avatar
            </button> */}
          </div>
        )}
      </div>
    </div>: 
    <div className='navbar-links'>
      <Link to="/login">Login</Link>
    </div>
    }
  </nav>
  );
};

export default Navbar;

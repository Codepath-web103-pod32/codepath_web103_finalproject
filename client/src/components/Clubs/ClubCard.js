import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClubCard = ({ club }) => {

  return (
    <div className="event-card">
      <img src={club.images[0]?.url} alt={club.name} />
      <h3>{club.name}</h3>
      <Link to={`/clubs/${club.id}`}>View Details</Link>
    </div>
  );
};

export default ClubCard;

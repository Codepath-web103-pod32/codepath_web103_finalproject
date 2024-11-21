import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from "axios";

const EventCard = ({ event, displayUnregister=false }) => {
  const API_URL = process.env.REACT_APP_BACKEND_URL || ''
  
  const formattedStart = format(parseISO(event.start_time), "MMM d");
  const formattedEnd = format(parseISO(event.end_time), "MMM d");

  const handleUnregister = () => {
    const unregister = async (githubId) => {
      const url = `${API_URL}/api/events/register/${event.id}`
      const res = await axios.delete(url,
      {data: {
        githubId: githubId,
      }}
      )
    }

    const unregisterEventForAuthorizedUser = async () => {
      const response = await fetch(
        `${API_URL}/auth/login/success`,
        {credentials: 'include'}
      )
      const json = await response.json()
      unregister(json.user.github_id)
    }

    unregisterEventForAuthorizedUser()
    window.location.href = `${API_URL}/myevents`

  }

  return (
    <div className="event-card">
      <img src={event.images[0]?.url} alt={event.name} />
      <h3>{event.name}</h3>
      <p>{formattedStart} - {formattedEnd}</p>
      <Link to={`/events/${event.id}`}>View Details</Link>
      {displayUnregister ?
      <button className="register-button" onClick={handleUnregister}>
        Unregister
      </button> : <></>}
    </div>
  );
};

export default EventCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const EventCard = ({ event }) => {
  const formattedStart = format(parseISO(event.startTime), "MMM d");
  const formattedEnd = format(parseISO(event.endTime), "MMM d");

  return (
    <div className="event-card">
      <img src={event.image} alt={event.name} />
      <h3>{event.name}</h3>
      <p>{formattedStart} - {formattedEnd}</p>
      <Link to={`/events/${event.id}`}>View Details</Link>
    </div>
  );
};

export default EventCard;

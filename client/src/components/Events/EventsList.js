import React, { useEffect, useState } from 'react';
import axios from "axios";
import EventCard from "./EventCard";
import eventsData from './eventsdata';
import './EventsList.css';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://localhost:3003/api/events');
      console.log(response.data)
      setEvents(response.data);
      // setEvents(eventsData)
    };
    fetchEvents();
  }, []);

  return (
    events && <div className="events-page">
      <div className="events-sidebar">
        <h3>Categories</h3>
        <div className="filter-tags">
          <span className="tag">Spring ×</span>
          <span className="tag">Smart ×</span>
          <span className="tag">Modern ×</span>
        </div>
        <div className="filter-section">
          <input type="checkbox" /> Category
          <input type="checkbox" /> Category
          <input type="checkbox" /> Category
        </div>
        <h3>Member number</h3>
        <input type="range" min="0" max="100" />

        <h3>Locations</h3>
        <div className="filter-section">
          <input type="checkbox" /> Label
          <input type="checkbox" /> Label
          <input type="checkbox" /> Label
        </div>
      </div>
      <div className="event-grid">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Events</h1>
  //     <div className="event-grid">
  //       {events.map(event => (
  //         <EventCard key={event.id} event={event} />
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default EventsList;

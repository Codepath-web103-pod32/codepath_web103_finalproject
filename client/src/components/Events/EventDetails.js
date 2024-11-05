import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import eventsData from "./eventsdata";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventInfo = eventsData.find((event) => event.id == id);
      const currentTime = new Date();
      const startTime = new Date(eventInfo.startTime);
      const endTime = new Date(eventInfo.endTime);

      (eventInfo.registered < eventInfo.capacity &&
      currentTime >= startTime &&
      currentTime <= endTime)
        ? setIsRegisterEnabled(true)
        : setIsRegisterEnabled(false);

      setEvent(eventInfo);
      //   const response = await axios.get(`/api/events/${id}`);
      //   setEvent(response.data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-page">
      <header className="event-header">
        <h1>{event.name}</h1>
        <p>{event.description}</p>
      </header>
      <nav className="event-nav">
        <a href="#introduction">Introduction</a>
        <a href="#gallery">Gallery</a>
        <a href="#statistics">Event Statistics</a>
        <a href="#contact">Contact</a>
      </nav>
      <section id="introduction" className="event-intro">
        <div className="event-image-placeholder">
          <img src={event.image} alt={event.name} />
        </div>
        <div className="event-details">
          <h2>Introduction</h2>
          <p>Category: {event.category.join(", ")}</p>
          <p>
            Starts: {new Date(event.startTime).toLocaleString()} <br />
            Ends: {new Date(event.endTime).toLocaleString()}
          </p>
          <p>{event.description}</p>
          <button
            className="register-button"
            disabled={!isRegisterEnabled}
          >
            {isRegisterEnabled ? "Register" : "Registration Closed"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;

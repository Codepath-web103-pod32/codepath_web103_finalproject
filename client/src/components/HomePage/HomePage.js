import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import axios from "axios";
import EventCard from "../Events/EventCard";
import ClubCard from "../Clubs/ClubCard";

const HomePage = () => {
  const [events, setEvents] = useState(null);
  const [clubs, setClubs] = useState(null);

  const fetchEvents = async () => {
    let url = "http://localhost:3003/api/events";
    let res = await axios.get(url);
    setEvents(res.data);

    url = "http://localhost:3003/api/clubs";
    res = await axios.get(url);
    setClubs(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Community</h1>
          <p>
            Discover exciting events and join amazing clubs that spark your
            interests.
          </p>
          <div className="hero-buttons">
            <Link to="/events" className="btn btn-primary">
              Explore Events
            </Link>
            <Link to="/clubs" className="btn btn-secondary">
              Discover Clubs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      {events && (
        <section className="featured-section">
          <h2>Featured Events</h2>
          <div className="cards">
            {events.slice(0, 4).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Events Section */}
      {clubs && clubs.length > 0 && (
        <section className="featured-section">
          <h2>Featured Clubs</h2>
          <div className="cards">
            {clubs.slice(0, 4).map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        </section>
      )}

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Join the Community</h2>
        <p>
          Be part of a vibrant community where ideas meet execution. Connect,
          learn, and grow with like-minded individuals.
        </p>
      </section>
    </div>
  );
};

export default HomePage;

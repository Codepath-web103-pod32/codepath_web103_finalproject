import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EventDetails.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const EventDetails = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL || ''

  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const [banner, setBanner] = useState(null);
  const [view, setView] = useState("introduction");
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get(
        `${API_URL}/api/events/${id}`
      );
      const images = response.data.images;
      setBanner(images[0].url);
      setEvent(response.data);
      const currentTime = new Date();

      response.data.registered < response.data.capacity &&
      currentTime < new Date(response.data.start_time)
        ? setIsRegisterEnabled(true)
        : setIsRegisterEnabled(false);
    };
    fetchEvent();
  }, [id]);

  // Chau Phan: get user info and check if user registered this event
  const fetchRegisterdEvents = async (githubId) => {
    const url = `${API_URL}/api/events/my-events`;
    const res = await axios.get(url, {
      params: { githubId: githubId },
    });
    if (
      res.data.length === 0 ||
      res.data.filter((event) => event.id == id).length == 0
    ) {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
  };

  const fetchRegisterdEventsFromAuthorizedUser = async () => {
    const response = await fetch(`${API_URL}/auth/login/success`, {
      credentials: "include",
    });
    const json = await response.json();
    setUser(json.user);
    fetchRegisterdEvents(json.user.github_id);
  };

  useEffect(() => {
    fetchRegisterdEventsFromAuthorizedUser();
  }, []);

  // Responsive settings for react-multi-carousel
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleRegister = () => {
    if (!user || !user.id) {
      alert("Please log in first!");
    }
    if (!isRegistered && isRegisterEnabled) {
      const register = async (githubId) => {
        const url = `${API_URL}/api/events/register/${id}`;
        const res = await axios.post(url, { githubId: githubId });
        setEvent(res.data);
      };

      const registerEventForAuthorizedUser = async () => {
        const response = await fetch(
          `${API_URL}/auth/login/success`,
          { credentials: "include" }
        );
        const json = await response.json();
        setUser(json.user);
        register(json.user.github_id);
        setIsRegistered(true);
      };

      registerEventForAuthorizedUser();
    }
  };

  return (
    event && (
      <div className="art-exhibition-container">
        <header className="art-exhibition-header">
          <img src={banner} alt="Event Banner" className="event-banner" />
          <h1>{event.name}</h1>
          <p className="event-description">{event.description}</p>
        </header>

        <nav className="art-exhibition-nav">
          <a onClick={() => setView("introduction")}>Introduction</a>
          <a onClick={() => setView("gallery")}>Gallery</a>
        </nav>

        {view === "introduction" ? (
          <section id="introduction" className="event-section">
            <img src={banner} alt="Event" className="event-image" />
            <div className="event-details">
              <h2>Introduction</h2>
              <p>
                <strong>Starts:</strong>{" "}
                {new Date(event.start_time).toLocaleString()}
              </p>
              <p>
                <strong>Ends:</strong>{" "}
                {new Date(event.end_time).toLocaleString()}
              </p>
              <p>
                <strong>Capacity:</strong> {event.capacity}
              </p>
              <p>
                <strong>Register:</strong> {event.registered}
              </p>
              <p>{event.description}</p>
              <button
                className={`register-button ${
                  isRegistered
                    ? "registered"
                    : isRegisterEnabled
                    ? "enabled"
                    : "disabled"
                }`}
                onClick={handleRegister}
                disabled={!isRegisterEnabled}
              >
                {isRegistered
                  ? "You are registered"
                  : isRegisterEnabled
                  ? "Register Now"
                  : "Registration closed"}
              </button>
            </div>
          </section>
        ) : view === "gallery" ? (
          <section id="gallery" className="gallery-section">
            <h2>Gallery</h2>
            <Carousel responsive={responsive} className="gallery-carousel">
              {event.images.map((image) => (
                <div key={image.id} className="gallery-item">
                  <img
                    src={image.url}
                    alt={image.name}
                    className="gallery-image"
                  />
                  <p>{image.name}</p>
                </div>
              ))}
            </Carousel>
          </section>
        ) : (
          ""
        )}
      </div>
    )
  );
};

export default EventDetails;

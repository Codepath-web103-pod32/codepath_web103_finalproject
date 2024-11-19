import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import eventsData from "./eventsdata";
import "./EventDetails.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [isRegisterEnabled, setIsRegisterEnabled] = useState(false);
  const [banner, setBanner] = useState(null);
  const [view, setView] = useState('introduction');
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get(`http://localhost:3003/api/events/${id}`);
      const images = response.data.images;
      setBanner(images[0].url);
      setEvent(response.data);
      const currentTime = new Date();

      (response.data.registered < response.data.capacity &&
        currentTime < new Date(response.data.start_time))
        ? setIsRegisterEnabled(true)
        : setIsRegisterEnabled(false);
        
    };
    fetchEvent();
  }, [id]);

  // Chau Phan: get user info and check if user registered this event
  const fetchRegisterdEvents = async (githubId) => {
    const url = 'http://localhost:3003/api/events/my-events'
    const res = await axios.get(url, {
      params: {githubId: githubId}
    })
    if (res.data.length === 0 || (res.data.filter(event => event.id == id).length == 0)) {
      setIsRegistered(false)
    } else {
      setIsRegistered(true)
    }
  }

  const fetchRegisterdEventsFromAuthorizedUser = async () => {
    const response = await fetch(
      'http://localhost:3003/auth/login/success',
      {credentials: 'include'}
    )
    const json = await response.json()
    setUser(json.user)
    fetchRegisterdEvents(json.user.github_id)
  }

  useEffect(() => {
    fetchRegisterdEventsFromAuthorizedUser()
  }, [])

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
  }

  return (
    event && <div className="art-exhibition-container">
    <header className="art-exhibition-header">
      <img src={banner} alt="Event Banner" className="event-banner" />
      <h1>{event.name}</h1>
      <p className="event-description">{event.description}</p>
    </header>

    <nav className="art-exhibition-nav">
        <a onClick={() => setView('introduction')}>Introduction</a>
        <a onClick={() => setView('gallery')}>Gallery</a>
      </nav>

    {view === 'introduction' ? <section id="introduction" className="event-section">
      <img src={banner} alt="Event" className="event-image" />
      <div className="event-details">
        <h2>Introduction</h2>
        <p><strong>Starts:</strong> {new Date(event.start_time).toLocaleString()}</p>
        <p><strong>Ends:</strong> {new Date(event.end_time).toLocaleString()}</p>
        <p>{event.description}</p>
        <button className="register-button"  onClick={handleRegister}>
  {isRegistered ? "You are registered" : isRegisterEnabled ? "Register Now" : "Registration closed"}
</button>
      </div>
    </section>: 
    
    view === 'gallery' ? 
    <section id="gallery" className="gallery-section">
        <h2>Gallery</h2>
        <Carousel responsive={responsive} className="gallery-carousel">
            {event.images.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.url} alt={image.name} className="gallery-image" />
                <p>{image.name}</p>
              </div>
            ))}
          </Carousel>
          
          {/* <Slider {...carouselSettings} className="gallery-slider">
            {event.images.map((image) => (
              <div key={image.id} className="gallery-item">
                <img src={image.url} alt={image.name} className="gallery-image" />
                <p>{image.name}</p>
              </div>
            ))}
          </Slider> */}
        </section>
         : ""}
  </div>
  );
};

export default EventDetails;

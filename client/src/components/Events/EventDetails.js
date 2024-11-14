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

  useEffect(() => {
    const fetchEvent = async () => {
      const eventInfo = eventsData.find((event) => event.id == id);
      const currentTime = new Date();
      const startTime = new Date(eventInfo.start_time);
      const endTime = new Date(eventInfo.end_time);
      

      (eventInfo.registered < eventInfo.capacity &&
      currentTime < startTime)
        ? setIsRegisterEnabled(true)
        : setIsRegisterEnabled(false);

      setEvent(eventInfo);
        const response = await axios.get(`http://localhost:3003/api/events/${id}`);
        // const response = await axios.get(`/api/events/${id}`);
        const images = response.data.images;
        setBanner(images[0].url);
        setEvent(response.data);
    };
    fetchEvent();
  }, [id]);

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
        <button className="register-button" disabled={!isRegisterEnabled}>
  {isRegisterEnabled ? "Register Now" : "Registration Closed"}
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

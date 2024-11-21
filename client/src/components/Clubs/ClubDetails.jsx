import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import eventsData from "./eventsdata";
import "../Events/EventDetails.css";
import "./ClubDetails.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const ClubDetails = () => {

  const API_URL = process.env.VITE_REACT_APP_BACKEND_URL || ''

  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const [banner, setBanner] = useState(null);
  const [view, setView] = useState("introduction");

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await axios.get(`${API_URL}/api/clubs/${id}`);
      // const response = await axios.get(`/api/events/${id}`);
      const images = response.data.images;

      const boardMembers = response.data.boardMembers; // Array of board members
      setSlidesToShow(boardMembers.length >= 3 ? 3 : boardMembers.length || 1);

      setBanner(images[0].url);
      setClub(response.data);
    };
    fetchEvent();
  }, [id]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const multiSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: slidesToShow, // Number of items to show per slide
    slidesToScroll: 1, // Scroll one item at a time for smoother transition
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow >= 2 ? 2 : slidesToShow || 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    club && (
      <div className="club-page">
        {/* Club Header */}
        <header className="club-header art-exhibition-header">
          <img src={banner} alt="Event Banner" className="event-banner" />
          <h1>{club.name}</h1>
          <p>{club.description}</p>
          <a href={`mailto:${club.email}`}>{club.email}</a>
        </header>

        {/* Categories as Stickers */}
        <div className="club-categories">
          {club.categories.map((category) => (
            <span key={category.id} className="category-sticker">
              {category.name}
            </span>
          ))}
        </div>

        <section className="board-members-carousel">
          <h2>Board Members</h2>
          <Slider {...multiSettings}>
            {club.boardMembers.map((member) => (
              <div key={member.id} className="board-member-card">
                <h3>{member.fullname}</h3>
                <p>{member.introduction}</p>
                <a href={`mailto:${member.email}`}>{member.email}</a>
              </div>
            ))}
          </Slider>
        </section>

        {/* Club Events */}
        <section className="club-events">
          <h2>Events</h2>
          <div className="events-list">
            {club.events.map((event) => (
              <div key={event.id} className="event-card">
                <h3>{event.name}</h3>

                {/* Event Images Carousel */}
                <Slider {...settings}>
                  {event.images.map((image) => (
                    <div key={image.id} className="event-image">
                      <img src={image.url} alt={image.name} />
                      <p>{image.name}</p>
                    </div>
                  ))}
                </Slider>
                <div className="events-club-desc">
                  <p>{event.description}</p>
                  <p>
                    {new Date(event.start_time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(event.start_time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {" to "}
                    {new Date(event.end_time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    {new Date(event.end_time).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="club-register">
                    {event.capacity - event.registered == 0
                      ? <Link to={`/events/${event.id}`}>View Details</Link>
                      : <Link to={`/events/${event.id}`}>Register</Link>}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )

    //     event && <div className="art-exhibition-container">
    //     <header className="art-exhibition-header">
    //       <img src={banner} alt="Event Banner" className="event-banner" />
    //       <h1>{event.name}</h1>
    //       <p className="event-description">{event.description}</p>
    //     </header>

    //     <nav className="art-exhibition-nav">
    //         <a onClick={() => setView('introduction')}>Introduction</a>
    //         <a onClick={() => setView('gallery')}>Gallery</a>
    //       </nav>

    //     {view === 'introduction' ? <section id="introduction" className="event-section">
    //       <img src={banner} alt="Event" className="event-image" />
    //       <div className="event-details">
    //         <h2>Introduction</h2>
    //         <p><strong>Starts:</strong> {new Date(event.start_time).toLocaleString()}</p>
    //         <p><strong>Ends:</strong> {new Date(event.end_time).toLocaleString()}</p>
    //         <p>{event.description}</p>
    //         <button className="register-button" disabled={!isRegisterEnabled}>
    //   {isRegisterEnabled ? "Register Now" : "Registration Closed"}
    // </button>
    //       </div>
    //     </section>:

    //     view === 'gallery' ?
    //     <section id="gallery" className="gallery-section">
    //         <h2>Gallery</h2>
    //         <Carousel responsive={responsive} className="gallery-carousel">
    //             {event.images.map((image) => (
    //               <div key={image.id} className="gallery-item">
    //                 <img src={image.url} alt={image.name} className="gallery-image" />
    //                 <p>{image.name}</p>
    //               </div>
    //             ))}
    //           </Carousel>

    //           {/* <Slider {...carouselSettings} className="gallery-slider">
    //             {event.images.map((image) => (
    //               <div key={image.id} className="gallery-item">
    //                 <img src={image.url} alt={image.name} className="gallery-image" />
    //                 <p>{image.name}</p>
    //               </div>
    //             ))}
    //           </Slider> */}
    //         </section>
    //          : ""}
    //   </div>
  );
};

export default ClubDetails;

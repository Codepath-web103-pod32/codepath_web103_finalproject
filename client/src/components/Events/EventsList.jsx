import React, { useEffect, useState } from 'react';
import axios from "axios";
import EventCard from "./EventCard";
import './EventsList.css';

const EventsList = () => {
  const API_URL = process.env.REACT_APP_BACKEND_URL || ''
  
  const [events, setEvents] = useState(null);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    fetchCategories();
    fetchLocations();
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    let categoryEvents = [];
    let locationEvents = [];
    let availableEvents = [];
    let filterEvents = [];
  
    // Fetch events by category if a category is selected
    if (selectedCategory) {
      const url = `${API_URL}/api/events/category/${selectedCategory}`;
      const res = await axios.get(url);
      categoryEvents = res.data;
    }
  
    // Fetch events by location if a location is selected
    if (selectedLocation) {
      const url = `${API_URL}/api/events/location/${selectedLocation}`;
      const res = await axios.get(url);
      locationEvents = res.data;
    }
  
    // Fetch available events if availability is selected
    if (isAvailable) {
      const url = `${API_URL}/api/events/available`;
      const res = await axios.get(url);
      availableEvents = res.data;
    }

    if (searchQuery) {
      const url = `${API_URL}/api/events/search/${searchQuery}`;
      const res = await axios.get(url);
      filterEvents = res.data;
  }
  
    // If no filters are selected, fetch all events
    if (!selectedCategory && !selectedLocation && !isAvailable & !searchQuery) {
      const url = `${API_URL}/api/events`;
      const res = await axios.get(url);
      setEvents(res.data);
      return;
    }
  
    // Function to find intersection of multiple arrays of events by id
    const intersectEvents = (arrays) => {
      return arrays.reduce((acc, curr) => {
        return acc.filter(event => curr.some(e => e.id === event.id));
      });
    };
  
    // Combine all the arrays based on selected filters
    const filterArrays = [];
    if (selectedCategory) filterArrays.push(categoryEvents);
    if (selectedLocation) filterArrays.push(locationEvents);
    if (isAvailable) filterArrays.push(availableEvents);
    if (searchQuery) filterArrays.push(filterEvents);
  
    // Find the intersection of events if multiple filters are applied, otherwise use the single array
    const filteredEvents = filterArrays.length > 1 ? intersectEvents(filterArrays) : filterArrays[0];
  
    setEvents(filteredEvents);
  };  
  

  const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/api/categories`);
    setCategories(response.data);
  };

  const fetchLocations = async () => {
    const response = await axios.get(`${API_URL}/api/locations`);
    setLocations(response.data);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setIsAvailable(e.target.checked);
  };

  useEffect(() => {
    fetchEvents();
  }, [selectedCategory, selectedLocation, isAvailable, searchQuery]);

  return (
    <div className="events-page">
    <div className="events-sidebar">
      <h3>Categories</h3>
      <select value={selectedCategory} onChange={handleCategoryChange} className="filter-select">
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <h3>Availability</h3>
      <label>
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={handleAvailabilityChange}
        />
         <span style={{marginLeft: "5px"}}>Available</span>
      </label>
      
      <div className="location-filter">
      <h3>Locations</h3>
      <select value={selectedLocation} onChange={handleLocationChange} className="filter-select">
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </select>
      </div>

      <div className="search-filter">
    <h3>Search</h3>
    <input 
      type="text" 
      value={searchQuery} 
      onChange={handleSearchChange} 
      placeholder="Search events..." 
      className="filter-events" 
    />
  </div>

    </div>

    {events != null ?
    events.length > 0 ?  

    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>: <div className='center-content'>None</div>: <div className='center-content'>Loading</div>}
  </div> 
  );
};

export default EventsList;

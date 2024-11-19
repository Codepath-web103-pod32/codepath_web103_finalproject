import { useState, useEffect } from "react"
import axios from "axios"
import EventCard from "../Events/EventCard";
import '../Events/EventsList.css';

const MyEvents = () => {
  const API_URL = 'http://localhost:3003'
  const [user, setUser] = useState()
  const [events, setEvents] = useState(null);

  const fetchEvents = async (githubId) => {
    const url = 'http://localhost:3003/api/events/my-events'
    const res = await axios.get(url, {
      params: {githubId: githubId}
    })
    setEvents(res.data)
  }

  const fetchEventsFromAuthorizedUser = async () => {
    const response = await fetch(
      `${API_URL}/auth/login/success`,
      {credentials: 'include'}
    )

    const json = await response.json()
    setUser(json.user)
    fetchEvents(json.user.github_id)
  }

  useEffect(() => {
    fetchEventsFromAuthorizedUser()
  }, []);


  return (
    <>{user && user.id ?
    <div className="events-page">

      {events != null ?
      events.length > 0 ?  

      <div className="event-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>: <div className='center-content'>You have not registered any events!</div>: <div className='center-content'>Loading</div>}
    </div> 
      : <h1 style={{textAlign: "center"}}>Please login first!</h1>
    }</>
  )
}

export default MyEvents

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsList from "./components/Events/EventsList";
import ClubsList from "./components/Clubs/ClubsList";
import ClubDetails from "./components/Clubs/ClubDetails";
import EventDetails from './components/Events/EventDetails';
import Navbar from "./components/Navbar";
import Login from "./components/Logins/Login";
import MyEvents from './components/MyEvents/MyEvents';
import HomePage from "./components/HomePage/HomePage";

function App() {
  const API_URL = process.env.REACT_APP_BACKEND_URL

  return (
    <>
    
    <Router>
    <Navbar />
      <Routes>
        {/* ChauPhan */}
        <Route path='/login' element={<Login api_url={API_URL}/>} />

        <Route path="/" element={<HomePage />} />

        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/clubs" element={<ClubsList />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />

        <Route path="/myevents" element={<MyEvents />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
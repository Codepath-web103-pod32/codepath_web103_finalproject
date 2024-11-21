import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsList from "./components/Events/EventsList.jsx";
import ClubsList from "./components/Clubs/ClubsList.jsx";
import ClubDetails from "./components/Clubs/ClubDetails.jsx";
import EventDetails from './components/Events/EventDetails.jsx';
import Navbar from "./components/Navbar.jsx";
import Login from "./components/Logins/Login.jsx";
import MyEvents from './components/MyEvents/MyEvents.jsx';
import HomePage from "./components/HomePage/HomePage.jsx";

function App() {
  const API_URL = process.env.VITE_REACT_APP_BACKEND_URL || ''

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
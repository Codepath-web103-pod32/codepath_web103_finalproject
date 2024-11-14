import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsList from "./components/Events/EventsList";
import ClubsList from "./components/Clubs/ClubsList";
import ClubDetails from "./components/Clubs/ClubDetails";
import EventDetails from './components/Events/EventDetails';
import Navbar from "./components/Navbar";
import Login from "./components/Logins/Login";

function App() {
  const API_URL = "http://localhost:3003"

  return (
    <>
    
    <Router>
    <Navbar />
      <Routes>
        <Route path='/login' element={<Login api_url={API_URL}/>} />

        <Route path="/events" element={<EventsList />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/clubs" element={<ClubsList />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
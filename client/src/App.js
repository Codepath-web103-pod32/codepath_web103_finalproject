import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsList from "./components/Events/EventsList";
import ClubsList from "./components/Clubs/ClubsList";
import ClubDetails from "./components/Clubs/ClubDetails";
import EventDetails from './components/Events/EventDetails';
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    
    <Router>
    <Navbar />
      <Routes>
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
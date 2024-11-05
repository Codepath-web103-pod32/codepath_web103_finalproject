import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsList from "./components/Events/EventsList";
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
      </Routes>
    </Router>
    </>
  );
}

export default App;
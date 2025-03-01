import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LiveFeedPage from './pages/LiveFeedPage';
import LocationPage from './pages/LocationPage';
import FallDetectionPage from './pages/FallDetectionPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/live-feed" element={<LiveFeedPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/fall-detection" element={<FallDetectionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
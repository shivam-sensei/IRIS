import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">I.R.I.S.</Link>
        <div className="space-x-4">
          <Link to="/live-feed" className="hover:text-blue-400 transition-colors">Live Feed</Link>
          <Link to="/location" className="hover:text-blue-400 transition-colors">Location</Link>
          <Link to="/fall-detection" className="hover:text-blue-400 transition-colors">Fall Detection</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
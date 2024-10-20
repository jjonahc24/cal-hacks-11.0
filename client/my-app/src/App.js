import './App.css';
import React, { useState } from 'react';
import Navbar from './components/navbar/navbar';  // Import the Navbar component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/landing_page';
import ListingPage from './Pages/listing_page';

function App() {

  return (
    <div className="App p-10">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/listing-page" element={<ListingPage />} /> 
          </Routes>
      </Router>
    </div>
  );
}

export default App;

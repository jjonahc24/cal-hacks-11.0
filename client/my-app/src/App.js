import './App.css';
import React, { useState } from 'react';
import Navbar from './components/navbar/navbar';  // Import the Navbar component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/landing_page';
import ListingPage from './Pages/create_listing';
import ListingsPage from "./Pages/listings_page";

function App() {
  const [locationInput, setLocationInput] = useState("");

  // Convert date object to string before sending to backend 
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());

  const [listings, setListings] = useState([]);
  const [userListings, setUserListings] = useState([]); // used to store user posted listings 
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);


  // 
  const [isUserAuthenthicated, setUserAuthenthicated] = useState(true);
  const [isSellerAuthenthicated, setSellerAuthenthicated] = useState(false);
  const [profileToggled, setProfileToggled] = useState(false);

  return (
    <div className="App p-10 h-full w-full">
      <Router>
        <Navbar isUserAuthenthicated={isUserAuthenthicated} setUserAuthenthicated={setUserAuthenthicated}
          profileToggled={profileToggled} setProfileToggled={setProfileToggled} />
        <Routes>
          <Route path="/" element={<LandingPage locationInput={locationInput} startDateInput={startDateInput} endDateInput={endDateInput}
            setLocationInput={setLocationInput} setStartDateInput={setStartDateInput} setEndDateInput={setEndDateInput}
            setListings={setListings} isUserAuthenthicated={isUserAuthenthicated} setUserAuthenthicated={setUserAuthenthicated}
            profileToggled={profileToggled} setProfileToggled={setProfileToggled}
          />} />

          <Route path="/create-listing" element={<ListingPage />} />

          <Route path="/listings" element={<ListingsPage locationInput={locationInput} startDateInput={startDateInput} endDateInput={endDateInput}
            setLocationInput={setLocationInput} setStartDateInput={setStartDateInput} setEndDateInput={setEndDateInput}
            listings={listings} isUserAuthenthicated={isUserAuthenthicated} setUserAuthenthicated={setUserAuthenthicated}
            profileToggled={profileToggled} setProfileToggled={setProfileToggled}
          />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

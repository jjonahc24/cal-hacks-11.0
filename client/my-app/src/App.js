import './App.css';
import React, { useState } from 'react';
import Navbar from './components/navbar/navbar';  // Import the Navbar component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/landing_page';
import ListingPage from './Pages/create_listing';
import ListingsPage from "./Pages/listings_page";
import ProfilePage from "./Pages/profile_page"

function App() {
  const [searchedLocation, setSearchedLocation] = useState("");

  // Convert date object to string before sending to backend 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
        <ProfilePage />
        <Navbar isUserAuthenthicated={isUserAuthenthicated}
          setUserAuthenthicated={setUserAuthenthicated}
          profileToggled={profileToggled}
          setProfileToggled={setProfileToggled} />

        <Routes>
          <Route path="/" element={<LandingPage
            setSearchedLocation={setSearchedLocation}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            isUserAuthenthicated={isUserAuthenthicated}
            setUserAuthenthicated={setUserAuthenthicated}
            profileToggled={profileToggled}
            setProfileToggled={setProfileToggled}
          />} />

          <Route path="/create-listing" element={<ListingPage />} />

          <Route path="/listings" element={<ListingsPage
            setSearchedLocation={setSearchedLocation}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            searchedLocation={searchedLocation}
            listings={listings}
            isUserAuthenthicated={isUserAuthenthicated}
            setUserAuthenthicated={setUserAuthenthicated}
            profileToggled={profileToggled}
            setProfileToggled={setProfileToggled}
          />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

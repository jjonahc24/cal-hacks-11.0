import './App.css';
import React, { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar';  // Import the Navbar component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/landing_page';
import ListingPage from './Pages/create_listing';
import ListingsPage from "./Pages/listings_page";
import ProfilePage from "./Pages/profile_page"
import ListingView from "./Pages/listing_view.js";
import Signup from "./Pages/signup";

// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [searchedLocation, setSearchedLocation] = useState("");

  // Convert date object to string before sending to backend 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [listings, setListings] = useState([]);
  const [userListings, setUserListings] = useState([]); // used to store user posted listings 
  const [firstName, setFirstName] = useState([]);
  const [lastName, setLastName] = useState([]);

  // User authenthication states 
  const [profileToggled, setProfileToggled] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [dbUser, setDbUser] = useState(null);
  const [needsAdditionalInfo, setNeedsAdditionalInfo] = useState(false);
  const [userId, setUserId] = useState('');
  

  useEffect(() => {
    const checkUserInDb = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch("http://127.0.0.1:8000/user/getUserEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",  // Specify that you're sending JSON
            },
            body: JSON.stringify({ email: user.email }),  // Stringify the body data
          });
  
          const data = await response.json();  // Parse the response
          console.log(data); 

          if (!data) {
            setNeedsAdditionalInfo(true); 
          }
          
          setUserId(data._id);
          setDbUser(data); 
  
        } catch (error) {
          console.log(error); 
        }
      }
    };
  
    checkUserInDb();
  }, [isAuthenticated, user]);

  if (isLoading) { return <div>Loading...</div>; } 


  return (
    <div className="App p-10 h-full w-full overflow-hidden">
      <Router>
        <Navbar
          profileToggled={profileToggled}
          setProfileToggled={setProfileToggled} />

        <Routes>
          <Route path="/" element={ needsAdditionalInfo ? <Signup needsAdditionalInfo={needsAdditionalInfo} setNeedsAdditionalInfo={setNeedsAdditionalInfo}/> :
            <LandingPage
            setSearchedLocation={setSearchedLocation}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setListings={setListings}
            profileToggled={profileToggled}
            setProfileToggled={setProfileToggled}
          />} />
          
          <Route path="/profile" element={<ProfilePage/>}/>

          <Route path="/create-listing" element={<ListingPage dbUser={dbUser}/>} />

          <Route path="/listings" element={<ListingsPage
            setSearchedLocation={setSearchedLocation}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setListings={setListings}
            searchedLocation={searchedLocation}
            listings={listings}
            profileToggled={profileToggled}
            setProfileToggled={setProfileToggled}
          />} />

          <Route path="/sign-up" element={<Signup needsAdditionalInfo={needsAdditionalInfo} setNeedsAdditionalInfo={setNeedsAdditionalInfo}/>} />

          <Route path="/listings/:id" element={<ListingView
            
          />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

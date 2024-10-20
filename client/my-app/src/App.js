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
  // const { user, isAuthenticated, isLoading } = useAuth0();
  // const [dbUser, setDbUser] = useState(null);
  // const [needsAdditionalInfo, setNeedsAdditionalInfo] = useState(false);

  // useEffect(() => {
  //   const checkUserInDb = async () => {
  //     if (isAuthenticated && user) {
  //       try {
  //         const response = await fetch(...);
  //         const data = await response.json();
          
  //         if (!data || !data.firstName || !data.lastName) {
  //           setNeedsAdditionalInfo(true); 
  //         }

  //         setDbUser(data); 

  //       } catch (error) {
  //         console.log(error); 
  //       }
  //     }
  //   }

  //   checkUserInDb(); // keep conditionally checking user in db when we get authenticated 
  // }, [isAuthenticated, user])

  // if (isLoading) { return <div>Loading...</div>; } 


  return (
    <div className="App p-10 h-full w-full">
      <Router>
        <Navbar
          profileToggled={profileToggled}
          setProfileToggled={setProfileToggled} />

        <Routes>
          <Route path="/" element={
            <LandingPage
            setSearchedLocation={setSearchedLocation}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setListings={setListings}
            profileToggled={profileToggled}
            setProfileToggled={setProfileToggled}
          />} />
          
          <Route path="/profile" element={<ProfilePage/>}/>

          <Route path="/create-listing" element={<ListingPage />} />

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

          <Route path="/sign-up" element={<Signup />} />

          <Route path="/listings/:id" element={<ListingView
            
          />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

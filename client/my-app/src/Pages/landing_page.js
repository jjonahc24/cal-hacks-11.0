// script.js
import React, { useState } from 'react';
import Profile from '../components/landing_page/profile';
import ProfileDropDown from '../components/landing_page/profile_dropdown';
import ProfileDropDown_SignedIn from '../components/landing_page/profile_dropdown_signedin';
import SearchBar from '../components/search_bar';

function LandingPage(props) {
  return (
    <div className="App h-screen relative">
    
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div>
            <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
            anim id est laborum.   
            </p>
            <SearchBar locationInput={props.locationInput} startDateInput={props.startDateInput} endDateInput={props.endDateInput} setLocationInput={props.setLocationInput} setStartDateInput={props.setStartDateInput} setEndDateInput={props.setEndDateInput}/>
          </div>
        </div>
    </div>
  );
};


export default LandingPage;
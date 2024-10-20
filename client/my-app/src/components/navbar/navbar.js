import "./navbar.css"
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import Profile from '../landing_page/profile';
import ProfileDropDown from '../landing_page/profile_dropdown';
import ProfileDropDown_SignedIn from '../landing_page/profile_dropdown_signedin';

const Navbar = (props) => {
    // const [isUserAuthenthicated, setUserAuthenthicated] = useState(true);
    // const [isSellerAuthenthicated, setSellerAuthenthicated] = useState(false);
    const [profileToggled, setProfileToggled] = useState(false);
    // Auth0 
    const { user, isAuthenticated, isLoading } = useAuth0();

    const navigate = useNavigate();

    return (
        <div className="NavBar flex justify-between items-center w-full px-10 relative"> {/* Added relative to the main container */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                <h2 className="logo text-[2rem] text-[#16B364]">spot.</h2>
                {/* {isAuthenticated ? (
                    <h2>{user.name}</h2>
                ) : null} */}
                
            </div>
            
            <div className="flex items-center relative"> {/* Added relative to this div */}
                <Profile profileToggled={props.profileToggled} setProfileToggled={props.setProfileToggled} />
                
                {/* Dropdown should be absolutely positioned relative to the parent */}
                {props.profileToggled ? (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg z-50"> {/* Positioned below the profile */}
                        {isLoading ? null : isAuthenticated ? <ProfileDropDown_SignedIn /> : <ProfileDropDown />}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Navbar;

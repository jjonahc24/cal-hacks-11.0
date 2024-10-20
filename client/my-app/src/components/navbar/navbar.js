import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

import Profile from '../landing_page/profile';
import ProfileDropDown from '../landing_page/profile_dropdown';
import ProfileDropDown_SignedIn from '../landing_page/profile_dropdown_signedin';

const Navbar = () => {
    const [isUserAuthenthicated, setUserAuthenthicated] = useState(true);
    const [isSellerAuthenthicated, setSellerAuthenthicated] = useState(false);
    const [profileToggled, setProfileToggled] = useState(false);

    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center w-full px-10 relative"> {/* Added relative to the main container */}
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
                <h2 className="font-roboto text-xl">Find⋅My⋅Spot</h2>
            </div>
            
            <div className="flex items-center relative"> {/* Added relative to this div */}
                <Profile profileToggled={profileToggled} setProfileToggled={setProfileToggled} />
                
                {/* Dropdown should be absolutely positioned relative to the parent */}
                {profileToggled ? (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg z-50"> {/* Positioned below the profile */}
                        {isUserAuthenthicated ? <ProfileDropDown_SignedIn /> : <ProfileDropDown /> }
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Navbar;

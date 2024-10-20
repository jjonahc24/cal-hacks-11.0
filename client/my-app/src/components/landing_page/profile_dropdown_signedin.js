import React from 'react';
import {useNavigate} from "react-router-dom";

// Auth0 imports
import { useAuth0 } from "@auth0/auth0-react";


function ProfileDropDown_SignedIn() {
  const { logout } = useAuth0();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center mt-2">
        <div className="bg-white w-full border border-gray-300 rounded shadow-md pl-2">
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3 mt-3" onClick={() => navigate("/profile")}>Profile</button>
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3 border-b-2 pb-5" onClick={() => navigate("/listing-page")}>Register Listing</button>
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log out</button>
        </div>
    </div>
  );
}

export default ProfileDropDown_SignedIn;
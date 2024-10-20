import React from 'react';
import {useNavigate} from "react-router-dom";


function ProfileDropDown_SignedIn() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center mt-2">
        <div className="bg-white w-40 border border-gray-300 rounded shadow-md pl-2">
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3 mt-3">Profile</button>
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3" onClick={() => navigate("/listing-page")}>Register Listing</button>
            
        </div>
    </div>
  );
}

export default ProfileDropDown_SignedIn;
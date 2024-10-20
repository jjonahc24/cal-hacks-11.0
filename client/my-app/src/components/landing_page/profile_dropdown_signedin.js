import React from 'react';


function ProfileDropDown_SignedIn() {
  return (
    <div className="flex flex-col items-center mt-2">
        <div className="bg-white w-40 border border-gray-300 rounded shadow-md pl-2">
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3 mt-3">Profile</button>
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3">Listings</button>
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3">Saved</button>
            <button className="text-left w-full py-1 hover:bg-gray-100 text-sm mb-3">Help</button>
        </div>
    </div>
  );
}

export default ProfileDropDown_SignedIn;
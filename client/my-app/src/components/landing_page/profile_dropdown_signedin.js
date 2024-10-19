import React from 'react';

function ProfileDropDown_SignedIn() {
  return (
    <div className="flex flex-col items-center mt-12">
      <div className="bg-white w-72 border border-gray-300 shadow-md">
        <button className="text-left w-full py-2 px-4 hover:bg-gray-100">Profile</button>
        <button className="text-left w-full py-2 px-4 hover:bg-gray-100">Listings</button>
        <button className="text-left w-full py-2 px-4 hover:bg-gray-100">Saved</button>
        <button className="text-left w-full py-2 px-4 hover:bg-gray-100">Help Center</button>
      </div>
    </div>
  );
}

export default ProfileDropDown_SignedIn;

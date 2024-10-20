import React from 'react';


function ProfileDropDown() {
    return (
      <div className="flex flex-col items-center mt-2">
        <div className="bg-white w-40 border border-gray-300 rounded shadow-md">
          <button className="text-left w-full py-1 px-2 hover:bg-gray-100 text-sm mt-3 mb-3">Sign up</button>
          <button className="text-left w-full py-1 px-2 hover:bg-gray-100 text-sm mb-3">Log in</button>
        </div>
      </div>
    );
  }


export default ProfileDropDown;
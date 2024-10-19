import React from 'react';

function ProfileDropDown() {
  return (
    <div className="flex flex-col mt-5">
      <div className="bg-white w-72 border border-gray-300 shadow-md">
        <button className="text-left w-full py-2 px-4 hover:bg-gray-100">Sign up</button>
        <button className="text-left w-full py-2 px-4 hover:bg-gray-100">Log in</button>
      </div>
    </div>
  );
}

export default ProfileDropDown;

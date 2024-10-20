import React, { useEffect, useRef } from 'react';
import { Accordion } from 'flowbite';

const ProfilePage = () => {

  // UseEffect to initialize the accordion once the DOM is ready

  return (
    <div className="Canvas w-full h-full flex justify-center items-center">
      <div className="w-[60%] max-w-2xl h-auto bg-white rounded-xl shadow-2xl shadow-[#CFE9D8] p-8">
        {/* My Info Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Info</h2>
          <hr className="border-t-2 border-green-500 mb-6" />
          <div className="flex items-left justify-between">
            <div className=" flex flex-col items-start space-y-4">
              <p className="text-lg font-medium text-left">Profile Picture</p>
              <p className="text-lg font-medium">First Name</p>
              <p className="text-lg font-medium">Last Name</p>
            </div>
            <div className="space-y-2 text-center">
              <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                <i className="fas fa-user"></i>
              </div>
              <p className="text-lg">David</p>
              <p className="text-lg">Vu</p>
            </div>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Listings</h2>
          <hr className="border-t-2 border-green-500 mb-6" />
          
        </div>


        {/* My Listings Rented Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Listings Rented</h2>
          <hr className="border-t-2 border-green-500 mb-6" />
          <div className="space-y-6">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
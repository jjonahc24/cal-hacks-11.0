import React, { useState } from 'react';
import downIcon from "../Assets/down-icon.svg";
import rightIcon from "../Assets/right-icon.svg";

// Example listings data (can be replaced with dynamic data)
let testListings = [
  {
    id: 1,
    ownerId: 1,
    ownerName: "Vincent Aung",
    photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png",
    listingRating: 4.9,
    ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg",
    moneyRate: 20,
    address: "2000 Durant Ave, Berkeley CA",
    distanceFromTarget: 0.4,
    description: "This is my parking spot. Please buy because I need money for my college tuition."
  },
  {
    id: 2,
    ownerId: 2,
    ownerName: "Earnest Lin",
    photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png",
    listingRating: 4.3,
    ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg",
    moneyRate: 30,
    address: "2000 Durant Ave, Berkeley CA",
    distanceFromTarget: 0.3,
    description: "This is my parking spot. Please buy because I need money for my college tuition."
  },
  {
    id: 3,
    ownerId: 1,
    ownerName: "Vincent Aung",
    photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png",
    listingRating: 4.9,
    ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg",
    moneyRate: 20,
    address: "2000 Durant Ave, Berkeley CA",
    distanceFromTarget: 0.4,
    description: "This is my parking spot. Please buy because I need money for my college tuition."
  },
  {
    id: 4,
    ownerId: 2,
    ownerName: "Earnest Lin",
    photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png",
    listingRating: 4.3,
    ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg",
    moneyRate: 30,
    address: "2000 Durant Ave, Berkeley CA",
    distanceFromTarget: 0.3,
    description: "This is my parking spot. Please buy because I need money for my college tuition."
  },
];

const ProfilePage = () => {
  const [listingsExpanded, setListingsExpanded] = useState([]);

  const toggleListing = (listingId) => {
    if (listingsExpanded.includes(listingId)) {
      setListingsExpanded((prev) => prev.filter((id) => id !== listingId));
    } else {
      setListingsExpanded((prev) => [...prev, listingId]);
    }
  };

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
          
          {testListings.map((listing, index) => (
            <div key={listing.id} className="w-full pl-4 pr-4 pt-2 pb-2 flex flex-col gap-4">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center gap-3">
                  <img className="w-[40px] h-[40px] rounded-full" alt="owner-picture" src={listing.ownerPicture} />
                  <p className="p-0 m-0 text-[1rem]">{listing.ownerName}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <p className="p-0 m-0 text-[1rem] text-[#6C6969]">${listing.moneyRate}</p>
                  <div className="w-[20px] h-[20px] cursor-pointer">
                    {listingsExpanded.includes(listing.id) ? (
                      <img src={downIcon} alt="down-icon" onClick={() => toggleListing(listing.id)} />
                    ) : (
                      <img className="ml-1" src={rightIcon} alt="right-icon" onClick={() => toggleListing(listing.id)} />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {listingsExpanded.includes(listing.id) && (
                <div className="flex flex-col gap-4">
                  <div className="lg:h-[10rem] lg:w-full min-w-[40%]">
                    <img alt="parking-photo" src={listing.photoPath} />
                  </div>
                  <div className="flex flex-col items-start text-[14px] text-start">
                    <h2 className="p-0 m-0 text-[#16B364]">{listing.address}</h2>
                    <p className=" text-[#6C6969]">{listing.distanceFromTarget} mi away</p>
                    <p>{listing.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* My Listings Rented Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Listings Rented</h2>
          <hr className="border-t-2 border-green-500 mb-6" />
          {testListings.map((listing, index) => (
            <div key={listing.id} className="w-full pl-4 pr-4 pt-2 pb-2 flex flex-col gap-4">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center gap-3">
                  <img className="w-[40px] h-[40px] rounded-full" alt="owner-picture" src={listing.ownerPicture} />
                  <p className="p-0 m-0 text-[1rem]">{listing.ownerName}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <p className="p-0 m-0 text-[1rem] text-[#6C6969]">${listing.moneyRate}</p>
                  <div className="w-[20px] h-[20px] cursor-pointer">
                    {listingsExpanded.includes(listing.id) ? (
                      <img src={downIcon} alt="down-icon" onClick={() => toggleListing(listing.id)} />
                    ) : (
                      <img className="ml-1" src={rightIcon} alt="right-icon" onClick={() => toggleListing(listing.id)} />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {listingsExpanded.includes(listing.id) && (
                <div className="flex flex-col gap-4">
                  <div className="lg:h-[10rem] lg:w-full min-w-[40%]">
                    <img alt="parking-photo" src={listing.photoPath} />
                  </div>
                  <div className="flex flex-col items-start text-[14px] text-start">
                    <h2 className="p-0 m-0 text-[#16B364]">{listing.address}</h2>
                    <p className=" text-[#6C6969]">{listing.distanceFromTarget} mi away</p>
                    <p>{listing.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
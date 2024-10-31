import React, { useState, useEffect } from 'react';
import downIcon from "../Assets/down-icon.svg";
import rightIcon from "../Assets/right-icon.svg";
import { useAuth0 } from "@auth0/auth0-react";
import starIcon from "../Assets/star-fill.svg";

import { useNavigate } from "react-router-dom";


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

const ProfilePage = (props) => {
  const [listingsExpanded, setListingsExpanded] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userListings, setUserListings] = useState([])
  const [rentedListings, setRentedListings] = useState([])
  const { user, isAuthenticated, isLoading } = useAuth0();

  const navigate = useNavigate();

  const toggleListing = (listingId) => {
    if (listingsExpanded.includes(listingId)) {
      setListingsExpanded((prev) => prev.filter((id) => id !== listingId));
    } else {
      setListingsExpanded((prev) => [...prev, listingId]);
    }
  };

  useEffect(() => {
    // fetch a single listing given the id parameter
    fetchUser();
  }, [user])

  useEffect(() => {
    fetchUserListings();
    fetchRentedListings();
  }, [userData])

  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/getUserEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,  // Replace with actual data
        }),
      });

      if (response.ok) {
        const responseJSON = await response.json();
        setUserData(responseJSON)
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const fetchUserListings = async () => {
    try {

      // Ensure userData._id is correctly handled as a string
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/listing?owner_id=${userData._id}`, {
        method: "GET",
      });


      if (response.ok) {
        const responseJSON = await response.json();
        setUserListings(responseJSON);
      } else {
        console.error("Failed to fetch listings:", response.statusText);
      }
    } catch (err) {
      console.log("Error:", err.message);
    }
  };

  const fetchRentedListings = async () => {
    try {
      userData.rent_history.forEach(async (listing) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/listing/${listing.listing_id}`);
        if (response.ok) {
          const responseJSON = await response.json();
          setRentedListings((prev) => [...prev, responseJSON])
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="Canvas w-full h-full flex justify-center items-center">
      <div className="w-[60%] max-w-2xl h-4/5 bg-white rounded-xl shadow-2xl shadow-[#CFE9D8] p-8 overflow-y-scroll">
        {/* My Info Section */}
        <div className="mb-10 w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Info</h2>
          <hr className="border-t-2 border-green-500 mb-6" />
          <div className="flex items-left justify-between w-full">
            <div className=" flex flex-col items-between space-y-4 w-full gap-2">
              <div className="flex flex-row w-full justify-between items-center">
                <p className="text-lg font-medium text-left">Profile Picture</p>
                  <img className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center" alt="profile" src={userData.profile_picture_path}></img>
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <p className="text-lg font-medium">First Name</p>
                <p className="text-lg">{userData.first_name}</p>
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <p className="text-lg font-medium">Last Name</p>
                <p className="text-lg">{userData.last_name}</p>
              </div>
            </div>
            <div className="space-y-2 text-center">
            </div>
          </div>
        </div>

        {/* My Listings Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">My Listings</h2>
          <hr className="border-t-2 border-green-500 mb-6" />

          {userListings.map((listing, index) => (
            <div key={listing._id} className="w-full pl-4 pr-4 pt-2 pb-2 flex flex-col gap-4">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center gap-3">
                  <p className="p-0 m-0 text-[1rem]">{listing.listing_name}</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                  <p className="p-0 m-0 text-[1rem] text-[#6C6969]">${listing.hourly_rate}/hour</p>
                  <div className="w-[20px] h-[20px] cursor-pointer">
                    {listingsExpanded.includes(listing._id) ? (
                      <img src={downIcon} alt="down-icon" onClick={() => toggleListing(listing._id)} />
                    ) : (
                      <img className="ml-1" src={rightIcon} alt="right-icon" onClick={() => toggleListing(listing._id)} />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {listingsExpanded.includes(listing._id) && (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col items-start text-[14px] text-start">
                    <h2 className="p-0 m-0 text-[#16B364]">{listing.address}, {listing.city} {listing.state}</h2>
                    <p>{listing.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* My Listings Rented Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Rental History</h2>
          <hr className="border-t-2 border-green-500 mb-6" />
          {rentedListings.map((listing, index) => {
            return (
              <div key={index} className="w-full pl-4 pr-4 pt-2 pb-2 flex flex-col gap-4">
                <div className="flex flex-row w-full justify-between ">
                  <div className="flex flex-row items-center gap-3">
                    <img className="w-[40px] h-[40px] rounded-full" alt="owner-picture" src={listing.owner_picture}></img>
                    <p className="p-0 m-0 text-[1rem]">{listing.owner_name}</p>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
                    <p className="p-0 m-0 text-[1rem] text-[#6C6969]">${listing.hourly_rate}</p>
                    <div className="w-[20px] h-[20px] cursor-pointer">
                      {
                        listingsExpanded.includes(listing._id) ?
                          <img src={downIcon} alt="down-icon" onClick={() => setListingsExpanded((prev) => prev.filter((listingId) => listingId !== listing._id))} /> :
                          <img className="ml-1" src={rightIcon} alt="right-icon" onClick={() => setListingsExpanded((prev) => [...prev, listing._id])} />
                      }
                    </div>
                  </div>
                </div>

                {listingsExpanded.includes(listing._id) &&
                  <div className="flex flex-col">
                    <div className="flex flex-row gap-4 justify-start">
                      <div className="h-[10rem] w-[13rem]">
                        <img className="max-h-[8rem] w-full" alt="parking-photo" src={listing.photo_path}></img>
                      </div>
                      <div className="flex flex-col items-start text-[14px] text-start">
                        <h2 className="p-0 m-0 text-[#16B364]">{listing.address}</h2>
                        <p className="">
                          {listing.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full justify-between">
                      <button onClick={() => navigate(`/listings/${listing._id}`)} className="rounded-lg text-white w-[10rem] p-1 text-[12px] bg-[#16B364] hover:scale-[0.99] transition">
                        View Listing
                      </button>
                      <div className="rating flex-row flex gap-4 items-center">
                        <p>
                          {listing.listing_rating.toFixed(1)}
                        </p>
                        <img src={starIcon} alt="star-icon"></img>
                      </div>
                    </div>

                  </div>
                }

              </div>
            )

          })}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

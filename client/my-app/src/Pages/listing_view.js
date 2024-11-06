import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import MyDatePicker from '../components/shadui/date_picker.js';
import starIcon from "../Assets/star-fill.svg";
import SearchBar from "../components/search_bar.js";

const ListingView = () => {
    const [listing, setListing] = useState(null);
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());
    const [isExpanded, setIsExpanded] = useState(false); // Track search bar expansion
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

    const { id } = useParams();

    useEffect(() => {
        fetchListing();
    }, []);

    const fetchListing = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/listing/${id}`);
            if (response.ok) {
                const responseJSON = await response.json();
                setListing(responseJSON);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    // Handle click outside to collapse search bar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setIsExpanded(false); // Collapse when clicking outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="ListingView w-full h-screen overflow-hidden text-start p-[2vw] relative">
            {isExpanded && (
                <div className="fixed inset-0 bg-black bg-opacity-5 z-10" />
            )}

            <div
                ref={searchBarRef}
                className={`transition-all duration-300 fixed ${
                    isExpanded ? "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 z-20" : "fixed top-4 left-1/2 transform -translate-x-1/2"
                }`}
                onClick={() => setIsExpanded(true)} // Expand on click
            >
                <SearchBar
                    setSearchedLocation={(location) => console.log("Set location:", location)}
                    setStartDate={(date) => console.log("Set start date:", date)}
                    setEndDate={(date) => console.log("Set end date:", date)}
                    setListings={(listings) => console.log("Set listings:", listings)}
                />
            </div>

            {/* Page Content */}
            {listing && (
                <div className={`flex flex-col gap-[2vh] ${isExpanded ? "opacity-30 pointer-events-none" : ""}`}>
                    <h1 className="text-[1.7vw] font-medium">{listing.listing_name}</h1>
                    <div className="flex flex-col lg:flex-row gap-[2vw]">
                        <div className="listingInfo flex-1 flex flex-col gap-[1vh]">
                            <img className="rounded-[1vw] border border-[#000000] object-cover w-full max-h-[45vh]" src={listing.photo_path} alt="listing-photo" />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center mt-[1vh]">
                                    <img
                                        className="rounded-full w-[3vw] h-[3vw] object-cover mr-[1vw]"
                                        src={listing.owner_picture} 
                                        alt="host-profile"
                                    />
                                    <div>
                                        <h2 className="text-[1vw] font-medium">Hosted by {listing.owner_name}</h2>
                                        <p className="text-[0.8vw] text-[#6C6969]">{listing.address}, {listing.city}, {listing.state}</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-[#6C6969] text-[1vw]">
                                    <p>{listing.listing_rating.toFixed(1)}</p>
                                    <img src={starIcon} 
                                        alt="star-icon"
                                        className="ml-[0.5vw] w-[1.1vw] h-[1.1vw]"
                                    />
                                </div>
                            </div>
                            
                            <hr className="my-[1vh] border-[0.5px] border-[#D3D3D3]" />

                            <h3 className="text-[1.2vw] font-medium">About this spot</h3>
                            <p className="text-[1vw] leading-tight">{listing.description}</p>
                        </div>
                        <div className="rentInterface p-[2vw] rounded-[1vw] shadow-md bg-[#EDFCF2] flex flex-col gap-[1vh] w-full lg:w-[40%] h-[40vh]">
                            <div>
                                <h1 className="text-[1.7vw] font-medium">${listing.hourly_rate} /day</h1>
                                <p className="text-[1vw] text-[#6C6969] ml-2">total before taxes</p>
                            </div>
                            <div className="flex w-full bg-[#FFFFFF] rounded-lg p-4 mt-4 border">
                                <div className="flex-1 flex flex-col items-start pr-4 border-r border-gray-300">
                                    <h2 className="text-[0.8vw] text-[#6C6969] mb-1">Check-In</h2>
                                    <MyDatePicker selectedDate={checkInDate} setDate={setCheckInDate} />
                                </div>
                                <div className="flex-1 flex flex-col items-start pl-4">
                                    <h2 className="text-[0.8vw] text-[#6C6969] mb-1">Check-Out</h2>
                                    <MyDatePicker selectedDate={checkOutDate} setDate={setCheckOutDate} />
                                </div>
                            </div>
                            <div className="flex justify-center mt-auto">
                                <button className="w-[80%] bg-[#16B364] text-[1.5vw] text-white p-[1vh] rounded-md opacity-50 cursor-not-allowed" disabled>Reserve</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingView;

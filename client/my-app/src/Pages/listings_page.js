import MyGoogleMap from "../components/my_google_map.js";
import SearchBar from "../components/search_bar.js"
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import downIcon from "../Assets/down-icon.svg";
import rightIcon from "../Assets/right-icon.svg";
import starIcon from "../Assets/star-fill.svg";


const ListingsPage = (props) => {
    const [expandedListingId, setExpandedListingId] = useState(null);
    const listingRefs = useRef({}); // Store refs for each listing
    const listingContainerRef = useRef(null);
    const navigate = useNavigate();

    // Calculate the average center of all listings
    const calculatedCenter = props.listings.length > 0
        ? {
            lat: props.listings.reduce((sum, listing) => sum + listing.latitude, 0) / props.listings.length,
            lng: props.listings.reduce((sum, listing) => sum + listing.longitude, 0) / props.listings.length,
          }
        : { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco if no listings

    // Expand or collapse a listing based on its ID
    const handleListingClick = (listingId) => {
        setExpandedListingId((prevId) => (prevId === listingId ? null : listingId));
    };

    // Custom handler for marker click on the map
    const handleMarkerClick = (listingId) => {
        setExpandedListingId((prevId) => {
            const newId = prevId === listingId ? null : listingId;
            
            // If a listing is expanded, scroll to it within the container
            if (newId && listingRefs.current[newId] && listingContainerRef.current) {
                const listingElement = listingRefs.current[newId]; // Get the target listing element
                const container = listingContainerRef.current; // Get the container element
                const containerTop = container.scrollTop; // Current scroll position of container
                const containerOffset = container.getBoundingClientRect().top; // Top position of container relative to viewport
                const elementOffset = listingElement.getBoundingClientRect().top; // Top position of listing element relative to viewport
                
                // Calculate the scroll position and scroll smoothly
                container.scrollTo({
                    top: containerTop + elementOffset - containerOffset - 20, // Adjust by offset for better visibility
                    behavior: "smooth",
                });
            }

            return newId; // Update the expanded listing ID
        });
    };

    return (
        <div className="w-full h-full overflow-hidden flex justify-center flex-col relative pt-6 ">
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <SearchBar
                setSearchedLocation={props.setSearchedLocation}
                setStartDate={props.setStartDate}
                setEndDate={props.setEndDate} 
                setListings={props.setListings}
                />
            </div>

                

            <div className="h-full w-full flex flex-col lg:flex-row gap-4 justify-center mt-10">
                <div 
                    ref={listingContainerRef}
                    className="listings flex flex-col h-[80%] bg-[#EDFCF2] rounded-xl shadow-2xl shadow-[#CFE9D8] w-full lg:w-1/3 items-center overflow-y-scroll"
                >
                    <div>
                        <h1 className="p-4 m-0 text-[24px]">
                            Available Listings in <span className="text-[#34C759]">{props.searchedLocation}</span>
                        </h1>
                    </div>
                    <hr className="w-4/5 mb-2 border-[#16B364]"></hr>
                    {props.listings.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-[20px] text-gray-500">
                            No listings in this area
                        </div>
                    ) : (
                    props.listings.map((listing, index) => {
                        const isExpanded = expandedListingId === listing._id;
                        return (
                            <div 
                                key={index}
                                ref={(el) => (listingRefs.current[listing._id] = el)}
                                className={`w-full pl-4 pr-4 pt-2 pb-2 flex flex-col gap-4 transition-colors duration-300
                                    ${isExpanded ? "bg-[#D5F5E3] border-l-4 border-[#16B364]" : ""}
                                    hover:bg-[#D5F5E3] hover:border-l-4 hover:border-[#16B364]`}
                                    onClick={() => handleListingClick(listing._id)}
                            >
                                <div className="flex flex-row w-full justify-between ">
                                    <div className="flex flex-row items-center gap-3">
                                        <img className="w-[40px] h-[40px] rounded-full" alt="owner-picture" src={listing.owner_picture}></img>
                                        <p className={`p-0 m-0 text-[1rem] ${isExpanded ? "font-medium" : ""}`}>{listing.owner_name}</p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <p className={`p-0 m-0 text-[1rem] text-[#6C6969] ${isExpanded ? "font-medium" : ""}`}>${listing.hourly_rate} /day</p>
                                        <div className="w-[20px] h-[20px] cursor-pointer">
                                            {isExpanded ? (
                                                <img src={downIcon} alt="down-icon" onClick={() => handleListingClick(listing._id)} />
                                            ) : (
                                                <img className="ml-1" src={rightIcon} alt="right-icon" onClick={() => handleListingClick(listing._id)} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {isExpanded &&
                                    <div className="flex flex-col">
                                        <div className="flex flex-row gap-4 justify-start">
                                            <div className="h-[10rem] w-[13rem]">
                                                <img className="max-h-[8rem] w-full" alt="parking-photo" src={listing.photo_path}></img>
                                            </div>
                                            <div className="flex flex-col items-start text-[14px] text-start">
                                                <h2 className="p-0 m-0 text-[#16B364]">{listing.address}</h2>
                                                <p className=" text-[#6C6969]">{listing.distance.toFixed(2)} mi away</p>
                                                <p className="">
                                                    {listing.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-row w-full justify-between">
                                            <button onClick={() => navigate(`/listings/${listing._id}`)} className="rounded-lg text-white w-[10rem] p-1 text-[12px] bg-[#16B364] hover:scale-[0.99] transition">
                                                View Listing
                                            </button>
                                            <div className="rating flex-row flex gap-2 items-center">
                                                <p>
                                                    {listing.listing_rating.toFixed(1)}
                                                </p>
                                                <img src={starIcon} alt="star-icon" className="w-[1.1vw] h-[1.1vw]"></img>
                                            </div>
                                        </div>

                                    </div>
                                }

                            </div>
                        );

                    })
                )}
                </div>
                <div className="h-[80%] w-full lg:w-2/3">

                        <MyGoogleMap listings={props.listings} 
                            center={expandedListingId 
                            ? { 
                                lat: props.listings.find(listing => listing._id === expandedListingId)?.latitude, 
                                lng: props.listings.find(listing => listing._id === expandedListingId)?.longitude 
                            } 
                            : calculatedCenter}
                        expandedListings={expandedListingId ? [expandedListingId] : []}
                        onMarkerClick={handleMarkerClick}
                        />

                </div>

            </div>
        </div>
    )
}

export default ListingsPage
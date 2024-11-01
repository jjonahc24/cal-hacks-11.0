import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MyDatePicker from '../components/shadui/date_picker.js';

const ListingView = () => {
    const [listing, setListing] = useState(null)
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());

    const { id } = useParams();

    useEffect(() => {
        // fetch a single listing given the id parameter
        fetchListing();
    }, [])

    const fetchListing = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/listing/${id}`);
            if (response.ok) {
                const responseJSON = await response.json();
                setListing(responseJSON)
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className="ListingView w-full h-full text-start pl-9 pr-9 mt-4">
            {listing && <div>
                <h1 className="text-[2rem] font-bold">{listing.listing_name}</h1>
                <div className="flex flex-row justify-between gap-10">
                    <div className="listingInfo w-[50%] flex flex-col gap-2">
                        <img className="rounded-[15px] border-[1px] border-[#16B364]" src={listing.photo_path} alt="listing-photo"></img>
                        <h1 className="text-[2rem] font-medium">Parking Spot in {listing.city}, {listing.state}</h1>
                        <hr className="w-4/5 mb-2 border-[1px] border-[#16B364]"></hr>
                        <h1 className="text-[2rem]">Hosted By {listing.owner_name}</h1>
                        <hr className="w-4/5 mb-2 border-[1px] border-[#16B364]"></hr>
                        <h1 className="text-[2rem] font-medium">About this spot</h1>
                        <p className="text-[1.5rem]">{listing.description}</p>
                    </div>
                    <div className="rentInterface p-[3rem] rounded-[15px] shadow-2xl shadow-[#CFE9D8] w-[40%] h-[40rem] bg-[#EDFCF2] flex flex-col">
                        <div>
                            <h1 className="text-[2rem] font-medium">${listing.hourly_rate} /day</h1>
                            <p className="text-[1.5rem] text-[#6C6969]">Total before taxes</p>
                        </div>
                        <div className="h-[5rem] rounded-t-xl mt-4 border-2 border-black w-full flex">
                            <div className="h-[5rem] flex-1 border-2 rounded-tl-xl border-black">  
                                <h2 className="text-[18px] p-2">CHECK-IN</h2>
                                <div className="pl-3">
                                    <MyDatePicker selectedDate={checkInDate} setDate={setCheckInDate}/>
                                </div>
                            </div>
                            <div className="h-[5rem] flex-1 border-2 rounded-tr-xl border-black">
                                <h2 className="text-[18px] p-2">CHECK-OUT</h2>
                                <div className="pl-3">
                                    <MyDatePicker selectedDate={checkOutDate} setDate={setCheckOutDate}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-center mt-[17rem]">
                            <button className="w-[15rem] bg-[#16B364] text-[24px] text-white p-2 rounded-[15px] hover:scale-[0.99]">Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
            }

        </div>
    )
}

export default ListingView
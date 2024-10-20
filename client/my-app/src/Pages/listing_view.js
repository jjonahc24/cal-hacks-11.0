import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import MyDatePicker from '../components/shadui/date_picker.js';


const testListing =
{
    id: 1,
    ownerId: 1,
    ownerName: "Vincent Aung",
    photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297449985478103093/Screenshot_2024-10-19_at_10.43.15_PM.png?ex=6715f7f5&is=6714a675&hm=470531cccdd5704adf2358858663e1a8c66ef0c8d3de7b02da5e4b9550145cbb&",
    listingName: "Dream Stay Comfort Parking Spot Near UC Berkeley #3",
    listingRating: 4.9,
    ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg?ex=6715c0f6&is=67146f76&hm=6e9c05748798b3b17967aa7fa7c6713e76be4ff02a587e86b42d5c019ca4607e&",
    moneyRate: 20,
    timeFrames: [],
    address: "2000 Durant Ave, Berkeley CA",
    city: "Berkeley",
    state: "CA",
    latitude: 37.866079,
    longitude: -122.26973,
    distanceFromTarget: 0.4,
    description: "This is my parking spot. Please buy because I need money for my college tuition. Berkeley is too hard. 162 is too hard and my butthole is sore"
};


const ListingView = () => {
    const [listing, setListing] = useState(null)
    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(new Date());

    const { id } = useParams();

    useEffect(() => {
        // fetch a single listing given the id parameter
        setListing(testListing);
    }, [])

    return (
        <div className="ListingView w-full h-full text-start pl-9 pr-9 mt-4">
            {listing && <div>
                <h1 className="text-[2rem] font-bold">{listing.listingName}</h1>
                <div className="flex flex-row justify-between gap-10">
                    <div className="listingInfo w-[50%] flex flex-col gap-2">
                        <img className="rounded-[15px] border-[1px] border-[#16B364]" src={listing.photoPath} alt="listing-photo"></img>
                        <h1 className="text-[2rem] font-medium">Parking Spot in {listing.city}, {listing.state}</h1>
                        <hr className="w-4/5 mb-2 border-[1px] border-[#16B364]"></hr>
                        <h1 className="text-[2rem]">Hosted By {listing.ownerName}</h1>
                        <hr className="w-4/5 mb-2 border-[1px] border-[#16B364]"></hr>
                        <h1 className="text-[2rem] font-medium">About this spot</h1>
                        <p className="text-[1.5rem]">{listing.description}</p>
                    </div>
                    <div className="rentInterface p-[3rem] rounded-[15px] shadow-2xl shadow-[#CFE9D8] w-[40%] h-[40rem] bg-[#EDFCF2] flex flex-col">
                        <div>
                            <h1 className="text-[2rem] font-medium">${listing.moneyRate} / day</h1>
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
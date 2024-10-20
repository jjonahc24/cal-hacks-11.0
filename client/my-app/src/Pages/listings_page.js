import MyGoogleMap from "../components/my_google_map.js";
import SearchBar from "../components/search_bar.js"
import { useState, useEffect } from "react";
import downIcon from "../Assets/down-icon.svg";
import rightIcon from "../Assets/right-icon.svg";

let testListings = [
    {
        id: 1,
        ownerId: 1,
        ownerName: "Vincent Aung",
        photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png?ex=6715c43b&is=671472bb&hm=059a50783bb0cd0c4f52a7af34f8cad0b97ccfe9d821f623a03a51c59e9c2040&",
        listingRating: 4.9,
        ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg?ex=6715c0f6&is=67146f76&hm=6e9c05748798b3b17967aa7fa7c6713e76be4ff02a587e86b42d5c019ca4607e&",
        moneyRate: 20,
        timeFrames: [],
        address: "2000 Durant Ave, Berkeley CA",
        latitude: 37.866079,
        longitude: -122.26973,
        distanceFromTarget: 0.4,
        description: "This is my parking spot. Please buy because I need money for my college tuition. Berkeley is too hard. 162 is too hard and my butthole is sore"
    },
    {
        id: 2,
        ownerId: 2,
        ownerName: "Earnest Lin",
        photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png?ex=6715c43b&is=671472bb&hm=059a50783bb0cd0c4f52a7af34f8cad0b97ccfe9d821f623a03a51c59e9c2040&",
        listingRating: 4.3,
        ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg?ex=6715c0f6&is=67146f76&hm=6e9c05748798b3b17967aa7fa7c6713e76be4ff02a587e86b42d5c019ca4607e&",
        moneyRate: 30,
        timeFrames: [],
        address: "2000 Durant Ave, Berkeley CA",
        latitude: 37.866079,
        longitude: -122.26973,
        distanceFromTarget: 0.3,
        description: "This is my parking spot. Please buy because I need money for my college tuition. Berkeley is too hard. 162 is too hard and my butthole is sore"
    },
    {
        id: 3,
        ownerId: 3,
        ownerName: "Vincent Aung",
        photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png?ex=6715c43b&is=671472bb&hm=059a50783bb0cd0c4f52a7af34f8cad0b97ccfe9d821f623a03a51c59e9c2040&",
        listingRating: 5.0,
        ownerPicture: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg?ex=6715c0f6&is=67146f76&hm=6e9c05748798b3b17967aa7fa7c6713e76be4ff02a587e86b42d5c019ca4607e&",
        moneyRate: 20,
        timeFrames: [],
        address: "2000 Durant Ave, Berkeley CA",
        latitude: 37.866079,
        longitude: -122.26973,
        distanceFromTarget: 0.2,
        description: "This is my parking spot. Please buy because I need money for my college tuition. Berkeley is too hard. 162 is too hard and my butthole is sore"
    }
]

const ListingsPage = (props) => {
    const [listingsExpanded, setListingsExpanded] = useState([]);

    return (
        <div className="w-full h-full overflow-hidden flex justify-center flex-col relative ">
            <SearchBar
                setSearchedLocation={props.setSearchedLocation}
                setStartDate={props.setStartDate}
                setEndDate={props.setEndDate} />

            <div className="h-full w-full flex flex-row gap-4 justify-center">
                <div className="listings flex flex-col h-[80%] bg-[#EDFCF2] rounded-xl shadow-2xl shadow-[#CFE9D8] w-1/3 items-center overflow-y-scroll">
                    <div>
                        <h1 className="p-4 m-0 text-[24px]">
                            Available Listings in <span className="text-[#34C759]">{props.searchedLocation}</span>
                        </h1>
                    </div>
                    <hr className="w-4/5 mb-2 border-[#34C759]"></hr>
                    {testListings.map((listing, index) => {
                        return (
                            <div key={index} className="w-full pl-4 pr-4 pt-2 pb-2 flex flex-col gap-4">
                                <div className="flex flex-row w-full justify-between ">
                                    <div className="flex flex-row items-center gap-3">
                                        <img className="w-[40px] h-[40px] rounded-full" alt="owner-picture" src={listing.ownerPicture}></img>
                                        <p className="p-0 m-0 text-[1rem]">{listing.ownerName}</p>
                                    </div>
                                    <div className="flex flex-row gap-3 items-center">
                                        <p className="p-0 m-0 text-[1rem] text-[#6C6969]">${listing.moneyRate}</p>
                                        <div className="w-[20px] h-[20px] cursor-pointer">
                                            {
                                                listingsExpanded.includes(listing.id) ?
                                                    <img src={downIcon} alt="down-icon" onClick={() => setListingsExpanded((prev) => prev.filter((listingId) => listingId !== listing.id))} /> :
                                                    <img className="ml-1" src={rightIcon} alt="right-icon" onClick={() => setListingsExpanded((prev) => [...prev, listing.id])} />
                                            }
                                        </div>
                                    </div>
                                </div>

                                {listingsExpanded.includes(listing.id) &&
                                    <div className="">
                                        <div className="flex flex-col lg:flex-row gap-4 ">
                                            <div className="lg:h-[10rem] lg:w-full min-w-[40%]">
                                                <img alt="parking-photo" src={listing.photoPath}></img>
                                            </div>
                                            <div className="flex flex-col items-start text-[14px] text-start">
                                                <h2 className="p-0 m-0 text-[#16B364]">{listing.address}</h2>
                                                <p className=" text-[#6C6969]">{listing.distanceFromTarget} mi away</p>
                                                <p className="">
                                                    {listing.description}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                }

                            </div>
                        )

                    })}
                </div>
                <div className="h-[80%] w-2/3">
                    <MyGoogleMap />
                </div>

            </div>
        </div>
    )
}

export default ListingsPage
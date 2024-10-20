import MyGoogleMap from "../components/my_google_map.js";
import SearchBar from "../components/search_bar.js"
import { useState, useEffect } from "react";

let testListings = [
    {
        ownerId: 1,
        ownerName: "Vincent Aung",
        ownerPicture: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png?ex=6715c43b&is=671472bb&hm=059a50783bb0cd0c4f52a7af34f8cad0b97ccfe9d821f623a03a51c59e9c2040&",
        listingRating: 4.9,
        photoPath: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg?ex=6715c0f6&is=67146f76&hm=6e9c05748798b3b17967aa7fa7c6713e76be4ff02a587e86b42d5c019ca4607e&",
        moneyRate: 20,
        timeFrames: [],
        address: "2000 Durant Ave, Berkeley CA",
        latitude: 37.866079,
        longitude: -122.26973
    },
    {
        ownerId: 2,
        ownerName: "Earnest Lin",
        ownerPicture: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png?ex=6715c43b&is=671472bb&hm=059a50783bb0cd0c4f52a7af34f8cad0b97ccfe9d821f623a03a51c59e9c2040&",
        listingRating: 4.3,
        photoPath: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg?ex=6715c0f6&is=67146f76&hm=6e9c05748798b3b17967aa7fa7c6713e76be4ff02a587e86b42d5c019ca4607e&",
        moneyRate: 30,
        timeFrames: [],
        address: "2000 Durant Ave, Berkeley CA",
        latitude: 37.866079,
        longitude: -122.26973
    },
    {
        ownerId: 3,
        ownerName: "Vincent Aung",
        ownerPicture: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png?ex=6715c43b&is=671472bb&hm=059a50783bb0cd0c4f52a7af34f8cad0b97ccfe9d821f623a03a51c59e9c2040&",
        listingRating: 5.0,
        photoPath: "https://cdn.discordapp.com/attachments/1152053564580036688/1297390931716214876/alexander.jpg?ex=6715c0f6&is=67146f76&hm=6e9c05748798b3b17967aa7fa7c6713e76be4ff02a587e86b42d5c019ca4607e&",
        moneyRate: 20,
        timeFrames: [],
        address: "2000 Durant Ave, Berkeley CA",
        latitude: 37.866079,
        longitude: -122.26973
    }
]

const ListingsPage = (props) => {
    const [currentLocation, setCurrentLocation] = useState("")

    useEffect(() => {
        setCurrentLocation(props.locationInput)
    }, [])

    return (
        <div className="w-full h-full overflow-hidden flex justify-center flex-col">
            <SearchBar locationInput={props.locationInput} startDateInput={props.startDateInput} endDateInput={props.endDateInput}
                setLocationInput={props.setLocationInput} setStartDateInput={props.setStartDateInput} setEndDateInput={props.setEndDateInput} />
            <div className="h-full w-full flex gap-4">
                <div className="listings flex flex-col h-[80%] bg-[#EDFCF2] rounded-xl shadow-2xl shadow-[#CFE9D8] w-1/3">
                    <div>
                        <h1 className="p-0 m-0">
                            Available Listings in {currentLocation}
                        </h1>
                    </div>
                    {testListings.map((listing) => {
                        return (
                            <div>

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
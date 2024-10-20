import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

let testListing =
{
    id: 1,
    ownerId: 1,
    ownerName: "Vincent Aung",
    photoPath: "https://cdn.discordapp.com/attachments/1296995206339629093/1297394441421717584/image_1_1.png?ex=6715c43b&is=671472bb&hm=059a50783bb0cd0c4f52a7af34f8cad0b97ccfe9d821f623a03a51c59e9c2040&",
    listName: "Dream Stay Comfort Parking Spot Near UC Berkeley #3",
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
    
    const { id } = useParams();

    useEffect(() => {
        // fetch a single listing given the id parameter
        setListing(testListing);
    })

    return (
        <div className="ListingView">
            
        </div>
    )
}

export default ListingView
import React, { useState, useEffect } from 'react';
import MyDatePicker from './shadui/date_picker';
import { useNavigate } from "react-router-dom"
import { ReactComponent as SearchIcon } from "../Assets/search-icon.svg"



const testListings = [
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
      latitude: 37.7749,
      longitude: -122.4194,
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

const SearchBar = (props) => {
  const [locationInput, setLocationInput] = useState("");
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(formatDate(startDateInput), endDateInput)  
  // }, [startDateInput, endDateInput])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      let startDateFormatted = formatDate(startDateInput);
      let endDateFormatted = formatDate(endDateInput);

      let responseJSON = null;
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/listing?address=${locationInput}&start_date=${startDateFormatted}&end_date=${endDateFormatted}`)
      if (response.ok) {
        responseJSON = await response.json();
      }
  
      if (responseJSON) {
        props.setSearchedLocation(locationInput);
        props.setStartDate(startDateInput);
        props.setEndDate(endDateInput);
    
        props.setListings(responseJSON);
        navigate("/listings")
      }

    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-4">
      <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full shadow-md overflow-hidden p-2">
        {/* Where Field */}
        <div className="flex flex-col items-start px-4 basis-1/2">
          <label htmlFor="location" className="text-[rgba(0,128,0,0.6)] font-semibold text-sm">Where</label>
          <input
            type="text"
            id="location"
            placeholder="Search location"
            className="focus:outline-none text-black text-sm"
            value={locationInput}
            autoComplete="off"
            onChange={(e) => setLocationInput(e.target.value)}
            required
          />
        </div>

        {/* Vertical Divider */}
        <div className="border-l h-10 border-gray-300"></div>

        {/* Check In Date Picker */}
        <div className="flex flex-col items-start px-4 basis-1/4">
          <label htmlFor="checkin" className="text-[rgba(0,128,0,0.6)] font-semibold text-sm">Check in</label>
          <MyDatePicker id="checkin" name="checkin" selectedDate={startDateInput} setDate={setStartDateInput} />
        </div>

        {/* Vertical Divider */}
        <div className="border-l h-10 border-gray-300"></div>

        {/* Check Out Date Picker */}
        <div className="flex flex-col items-start px-4 basis-1/4">
          <label htmlFor="checkout" className="text-[rgba(0,128,0,0.6)] font-semibold text-sm">Check out</label>
          <MyDatePicker id="checkout" name="checkout" selectedDate={endDateInput} setDate={setEndDateInput} />
        </div>

        {/* Search Button */}
        <button className="bg-green-500 text-white p-3 rounded-full ml-4" type="submit" disabled={loading}>
        {loading ? (
            // SVG Spinner
            <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
          ): <SearchIcon className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

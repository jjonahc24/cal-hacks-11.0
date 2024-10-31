import React, { useState, useEffect } from 'react';
import MyDatePicker from './shadui/date_picker';
import { useNavigate } from "react-router-dom"

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
    }
  }

  return (
    <div className="flex items-center justify-center py-4">
      <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="Where"
          className="pl-6 pr-2 py-2 w-48 focus:outline-none"
          value={locationInput}
          autoComplete="off"
          onChange={(e) => setLocationInput(e.target.value)}
          required
        />
        {/* <div>
          <input
            type="text"
            placeholder="Check in"
            className="px-2 py-2 w-36 focus:outline-none"
            value={startDateInput}
            autoComplete="off"
            onChange={(e) => setStartDateInput(e.target.value)}
            required
          />
        </div> */}
        <div className="flex items-start flex-col">
          <label htmlFor="checkin" className="text-[#cccccc] text-[0.8rem]">Check In</label>
          <MyDatePicker id="checkin" name="checkin" selectedDate={startDateInput} setDate={setStartDateInput}/>
        </div>


        {/* <input
          type="text"
          placeholder="Check out"
          className="px-2 py-2 w-36 focus:outline-none"
          value={endDateInput}
          autoComplete="off"
          onChange={(e) => setEndDateInput(e.target.value)}
        /> */}
        <div className="flex items-start flex-col">
          <label htmlFor="checkout" className="text-[0.8rem] text-[#cccccc]">Check Out</label>
          <MyDatePicker id="checkout" name="checkout" selectedDate={endDateInput} setDate={setEndDateInput}/>
        </div>



        <button className="bg-[#16B364] text-white p-1 rounded-full" type="submit">
          <svg className="w-5 h-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

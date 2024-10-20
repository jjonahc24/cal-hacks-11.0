import React, { useState } from 'react';
import MyDatePicker from './shadui/date_picker';
import { useNavigate } from "react-router-dom"

const SearchBar = (props) => {
  const [locationInput, setLocationInput] = useState("");
  const [startDateInput, setStartDateInput] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState(new Date());

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //await fetch
    // setListings
    //    
    props.setSearchedLocation(locationInput);
    props.setStartDate(startDateInput);
    props.setEndDate(endDateInput);

    console.log(locationInput, startDateInput, endDateInput)
    navigate("/listings")
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

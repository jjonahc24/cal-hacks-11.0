import React, { useState, useRef } from 'react';
import Slider from '../components/shadui/slider';
import MyDatePicker from '../components/shadui/date_picker';
import UploadImage from '../Assets/cloud-computing.png';

const ListingPage = (props) => {
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [moneyRate, setMoneyRate] = useState(33); // Initial slider value
  const [timeFrames, setTimeFrames] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [listingname, setListingName] = useState(''); // State for listing name

  // Function to handle listing name change
  const handleListingNameChange = (event) => {
    setListingName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Specify that you're sending JSON
        },
        body: JSON.stringify({
          "owner_id": props.dbUser._id, 
          "owner_name": props.dbUser.first_name + " " + props.dbUser.last_name,
          "hourly_rate": moneyRate,  // Send the current moneyRate value
          "address": address, 
          "description": description,
          "listing_name": listingname,  // Include listing name in the request body
        }),
      }); 
    } catch (error) {
      console.log(error); 
    }
  };

  // Reference to the hidden file input
  const fileInputRef = useRef(null);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhotoChange = (event) => {
    if (event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (e) => {
        setPhoto(e.target.result); // This will set Photo to the base64 image data
      };
    }
  };

  // Handle slider value change
  const handleMoneyRateChange = (value) => {
    setMoneyRate(value[0]); // The slider returns an array, set the first value
  };

  const handleTimeFramesChange = (event) => {
    setTimeFrames(event.target.value);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative flex justify-center pt-10"> {/* Removed items-center and min-h-screen, added pt-10 for some top padding */}
      <div className="w-full max-w-md">
        <h1 className="text-center mb-4 text-3xl">List your parking spot</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
          {/* Listing Name Input */}
          <label className="w-full">
            <input
              className="border-b-4 border-grey pt-2 pb-2 pl-2 focus:outline-none w-full"
              type="text"
              value={listingname}
              onChange={handleListingNameChange} // Add the change handler
              placeholder="Enter listing name"
            />
          </label>

          {/* Address Input */}
          <label className="w-full">
            <input
              className="border-b-4 border-grey pt-2 pb-2 pl-2 focus:outline-none w-full"
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter Address"
            />
          </label>
          <br />
          
          {/* Photo Upload Section */}
          <div className="w-full flex justify-center">
            <div className="text-center w-full">
              <label className="block mb-2">Upload Photo:</label>
              <div
                className="mt-2 cursor-pointer border-4 border-dotted border-gray-400 rounded-lg p-8 w-70 h-40 flex items-center justify-center"
                onClick={handleImageClick}
              >
                <img
                  src={photo || UploadImage}
                  alt="Upload"
                  className="max-w-full max-h-full"
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                style={{ display: 'none' }}
              />
            </div>
          </div>
          <br />

          {/* Rate Slider */}
          <label className="w-full">
            <Slider 
              defaultValue={[moneyRate]} // Set the initial value to the current moneyRate
              max={100} 
              step={1} 
              onValueChange={handleMoneyRateChange} // Handle slider change
            />
            <div className="text-center mt-2">Rate: ${moneyRate}/hour</div>
          </label>
          <br />
          
          {/* Date Picker */}
          <div className="flex justify-center w-full ">
            <div className="flex items-center">
              <label className="w-[6rem]">Start Date:</label>
              <div className="border-b-4 w-4/12" >
                <MyDatePicker selectedDate={startDate} setDate={setStartDate}/>
              </div>
            </div>
            <div className="flex items-center">
              <label className="w-[6rem]">End Date:</label>
              <div className="border-b-4 w-4/12" >
                <MyDatePicker selectedDate={endDate} setDate={setEndDate}/>
              </div>
            </div>
          </div>

          {/* Description Input */}
          <div className='w-full'>
            <input
              type='text'
              className='border-b-4 border-grey pt-2 pb-2 pl-2 focus:outline-none w-full'
              placeholder='Enter description'
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <br />
          <button type="submit" className="mt-4 bg-[#16B364] text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListingPage;

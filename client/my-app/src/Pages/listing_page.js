import { v4 as uuidv4 } from 'uuid';
import React, { useState, useRef } from 'react';
import Slider from '../components/shadui/slider';
import MyDatePicker from '../components/shadui/date_picker';
import UploadImage from '../Assets/cloud-computing.png';

const ListingPage = () => {
  const id = uuidv4();
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [moneyRate, setMoneyRate] = useState('');
  const [timeFrames, setTimeFrames] = useState('');

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

  const handleMoneyRateChange = (event) => {
    setMoneyRate(event.target.value);
  };

  const handleTimeFramesChange = (event) => {
    setTimeFrames(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { id, address, photo, moneyRate, timeFrames });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative flex justify-center pt-10"> {/* Removed items-center and min-h-screen, added pt-10 for some top padding */}
      <div className="w-full max-w-md">
        <h1 className="text-center mb-4 text-3xl">List your parking spot</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
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
          <label className="w-full">
            <Slider defaultValue={[33]} max={100} step={1} />
          </label>
          <br />
          <div className="flex justify-between w-full">
            <div className="flex items-center">
              <label className="mr-2">Start Date:</label>
              <MyDatePicker />
            </div>
            <div className="flex items-center">
              <label className="mr-2">End Date:</label>
              <MyDatePicker />
            </div>
          </div>
          <br />
          <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListingPage;

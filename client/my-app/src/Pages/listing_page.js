import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';

const ListingPage = () => {
  const id = uuidv4();
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState(null);
  const [moneyRate, setMoneyRate] = useState('');
  const [timeFrames, setTimeFrames] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleMoneyRateChange = (event) => {
    setMoneyRate(event.target.value);
  };

  const handleTimeFramesChange = (event) => {
    setTimeFrames(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TO DO: Send the data to the backend API
    console.log('Form submitted:', {
      address,
      photo,
      moneyRate,
      timeFrames,
    });
  };

  return (
    <div>
      <h1>Register Listing Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" value={address} onChange={handleAddressChange} />
        </label>
        <br />
        <label>
          Upload Photo:
          <input type="file" onChange={handlePhotoChange} />
        </label>
        <br />
        <label>
          Money Rate:
          <input type="number" value={moneyRate} onChange={handleMoneyRateChange} />
        </label>
        <br />
        <label>
          Time Frames:
          <input type="text" value={timeFrames} onChange={handleTimeFramesChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ListingPage;

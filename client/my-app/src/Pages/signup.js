import React, { useState, useRef, useEffect } from 'react';
import User from "../Assets/user_two.png";

function Signup(props) {
  const [photo, setPhoto] = useState(null); // State to store the uploaded photo
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Disable scroll on mount and enable scroll on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scroll

    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scroll when component unmounts
    };
  }, []);

  // Handle image click to trigger file input
  const handleImageClick = () => {
    fileInputRef.current.click(); // Open the file input dialog
  };

  // Handle file selection and preview
  const handlePhotoChange = (event) => {
    if (event.target.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(event.target.files[0]);
      fileReader.onload = (e) => {
        setPhoto(e.target.result); // Set the uploaded photo as base64 data
      };
    }
  };

  return (
    <div className='relative h-screen'> {/* Set relative position on the outer div */}
      <div className='absolute top-1/4 left-0 right-0 flex flex-col items-center w-3/6 mx-auto'>
        <h2 className='mb-5 text-2xl text-customGray'>Create your profile</h2>
        <div>
          {/* Display either the uploaded photo or the default user icon */}
          <img
            className="w-24 h-24 rounded-full object-cover cursor-pointer"
            src={photo || User}
            alt='user'
            onClick={handleImageClick}
          />
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} // Hide the actual file input
            onChange={handlePhotoChange} // Handle the file change
            accept="image/*" // Only allow image file types
          />
        </div>
        <input className="mb-4 p-2 border-b border-gray-300 rounded focus:outline-none" type='text' placeholder='First Name' />
        <input className="mb-4 p-2 border-b border-gray-300 rounded focus:outline-none" type='text' placeholder='Last Name' />
        <button className="p-2 bg-customGray text-white rounded">Signup</button>
      </div>
    </div>
  );
}

export default Signup;

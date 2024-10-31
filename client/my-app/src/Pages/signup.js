import React, { useState, useRef, useEffect } from 'react';
import User from "../Assets/user_two.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [photo, setPhoto] = useState(null); // State to store the uploaded photo
  const fileInputRef = useRef(null); // Reference to the hidden file input
  // const [userName, setUserName] = useState(''); // State for username
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState(''); // State for last name
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Specify that you're sending JSON
        },
        body: JSON.stringify({
          email: user.email,
          first_name: firstName,
          last_name: lastName,
          profile_picture_path: photo, // Send Base64 photo string
          username: "", // Use the username state
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Successfully created user:", data);
      } else {
        console.log("Error creating user:", data);
      }
    } catch (error) {
      console.log(error);
    }

    props.setNeedsAdditionalInfo(false);
    navigate("/");
  };

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
        setPhoto(e.target.result); // Set the uploaded photo as Base64 data
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
        {/* Username Input */}
        {/* <input
          className="mb-4 p-2 border-b border-gray-300 rounded focus:outline-none"
          type='text'
          placeholder='Username'
          value={userName} // Bind state to value
          onChange={(e) => setUserName(e.target.value)} // Update state on input change
        /> */}
        {/* First Name Input */}
        <input
          className="mb-4 p-2 border-b border-gray-300 rounded focus:outline-none"
          type='text'
          placeholder='First Name'
          value={firstName} // Bind state to value
          onChange={(e) => setFirstName(e.target.value)} // Update state on input change
        />
        {/* Last Name Input */}
        <input
          className="mb-4 p-2 border-b border-gray-300 rounded focus:outline-none"
          type='text'
          placeholder='Last Name'
          value={lastName} // Bind state to value
          onChange={(e) => setLastName(e.target.value)} // Update state on input change
        />
        <button className="p-2 bg-customGray text-white rounded" onClick={handleSubmit}>Signup</button>
      </div>
    </div>
  );
}

export default Signup;

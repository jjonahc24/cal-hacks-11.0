import React, { useState } from "react";

const Slider = () => {
  // State to store slider value
  const [value, setValue] = useState(50);

  // Function to handle slider value change
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
        
    <p className="text-gray-700">Rate per hour($): {value}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        className="w-48 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black" // Black thumb and white track
      />
      
    </div>
  );
};

export default Slider;

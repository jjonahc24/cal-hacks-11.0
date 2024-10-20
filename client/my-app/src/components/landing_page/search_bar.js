import React, { useState } from 'react';

const SearchBar = () => {
  const [locationInput, setLocationInput] = useState("");
  const [startDateInput, setStartDateInput] = useState(null);
  const [endDateInput, setEndDateInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <input
          type="text"
          placeholder="Check in"
          className="px-2 py-2 w-36 focus:outline-none"
          value={startDateInput}
          autoComplete="off"
          onChange={(e) => setStartDateInput(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Check out"
          className="px-2 py-2 w-36 focus:outline-none"
          value={endDateInput}
          autoComplete="off"
          onChange={(e) => setEndDateInput(e.target.value)}
        />

        <button className="bg-[#16B364] text-white p-1 rounded-full" type="submit">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

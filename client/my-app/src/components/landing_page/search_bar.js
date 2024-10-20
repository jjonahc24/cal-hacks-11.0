import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="Where"
          className="pl-6 pr-2 py-2 w-48 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Check in"
          className="px-2 py-2 w-36 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Check out"
          className="px-2 py-2 w-36 focus:outline-none"
        />

        <button className="bg-black text-white p-1 rounded-full">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

      </div>
    </div>
  );
};

export default SearchBar;

import React, { useState } from 'react';

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      console.log(`Searching for location: ${location}`);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setLocation('');
  };

  return (
      <form onSubmit={handleSearch} className="flex flex-col items-center space-y-4 w-full max-w-lg bg-white p-6 rounded-md shadow-md">
        <div className="input-box w-full">
          <label htmlFor="location" className="block text-lg font-semibold mb-2">Where</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search destinations"
            required
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
          {error && <div className="text-red-500 text-sm mt-1" id="location-error">{error}</div>}
        </div>
        <div className="search-button flex space-x-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-white rounded-md ${isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none`}
          >
            {isLoading ? (
              <div className="loading-spinner border-t-2 border-white w-5 h-5 rounded-full animate-spin" />
            ) : (
              <i className="fas fa-search" />
            )}
          </button>
          {location && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </form>
  );
};

export default SearchBar;
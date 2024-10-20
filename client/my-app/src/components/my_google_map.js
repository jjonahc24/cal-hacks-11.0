import React, { useCallback } from 'react';
import { GoogleMap as GMap, LoadScript, Marker } from '@react-google-maps/api';


const MyGoogleMap = (props) => {
  // Default center for the map
  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  // Extract coordinates and names from listings
  const getAllCoordinates = useCallback(() => {
    let markerInfo = props.listings.map((listing) => ({
      lat: listing.latitude,
      lng: listing.longitude,
      title: listing.listingName,
    }));

    return markerInfo;
  }, [props.listings]);

  return (
    <div className="flex justify-center items-center w-full h-full rounded-lg shadow-lg overflow-hidden">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={center}
          zoom={10}
        >
          {/* Add markers dynamically for each listing */}
          {getAllCoordinates().map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.title}
            />
          ))}

        </GMap>
      </LoadScript>
    </div>
  );
};

export default MyGoogleMap;
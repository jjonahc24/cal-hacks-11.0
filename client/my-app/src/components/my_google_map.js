import React, {useEffect} from 'react';
import { GoogleMap as GMap, LoadScript } from '@react-google-maps/api';

const MyGoogleMap = () => {
  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };


  return (
    <div className="flex justify-center items-center w-full h-full rounded-lg shadow-lg overflow-hidden">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={10}
          >
            {/* Additional map features like markers can go here */}
          </GMap>
      </LoadScript>
    </div>
  );
};

export default MyGoogleMap;
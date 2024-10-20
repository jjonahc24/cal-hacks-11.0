import React, {useEffect} from 'react';
import { GoogleMap as GMap, LoadScript } from '@react-google-maps/api';

const MyGoogleMap = () => {
  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

    useEffect(() => {
        console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    })
  

  return (
    <div className="flex justify-center items-center">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
        <div className="w-full h-96 rounded-lg shadow-lg overflow-hidden">
          <GMap
            mapContainerStyle={{ width: '140%', height: '100%' }}
            center={center}
            zoom={10}
          >
            {/* Additional map features like markers can go here */}
          </GMap>
        </div>
      </LoadScript>
    </div>
  );
};

export default MyGoogleMap;
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GoogleMap as GMap, LoadScript, Marker } from '@react-google-maps/api';
import expandedMarkerIcon from "../Assets/expanded-marker-icon.svg";
import normalMarkerIcon from "../Assets/normal-marker-icon.svg";

const MyGoogleMap = (props) => {

  const mapRef = useRef(null);
  const defaultZoom = 14;
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Update map center when `center` prop changes
  useEffect(() => {
    if (props.center && mapRef.current) {
      mapRef.current.panTo(props.center);
    }
  }, [props.center]);

  // Set googleLoaded to true when Google Maps API is loaded
  const handleApiLoad = () => {
    if (window.google) {
      console.log("Google Maps API loaded");
      setGoogleLoaded(true);
    }
  };

  // Extract coordinates and names from listings
  const getAllCoordinates = useCallback(() => {
    let markerInfo = props.listings.map((listing) => ({
      lat: listing.latitude,
      lng: listing.longitude,
      title: listing.listingName,
      isExpanded: props.expandedListings.includes(listing._id),
    }));

    return markerInfo;
  }, [props.listings, props.expandedListings]);

  return (
    <div className="flex justify-center items-center w-full h-full rounded-lg shadow-lg overflow-hidden">
      <LoadScript 
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        onLoad={handleApiLoad}
      >
        {googleLoaded && (
        <GMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={props.center}
          zoom={defaultZoom}
          onLoad={(map) => (mapRef.current = map)}
        >
          {/* Add markers dynamically for each listing */}
          {getAllCoordinates().map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.title}
              icon={{
                url: location.isExpanded
                  ? expandedMarkerIcon // Path to the larger marker icon
                  : normalMarkerIcon, // Path to the normal marker icon
                scaledSize: window.google
                  ? new window.google.maps.Size(
                      location.isExpanded ? 50 : 30,
                      location.isExpanded ? 50 : 30
                    )
                  : undefined, // Fallback if `window.google` isn't loaded yet
              }}
            />
          ))}

        </GMap>
        )}
      </LoadScript>
    </div>
  );
};

export default MyGoogleMap;
import googlemaps
from dotenv import load_dotenv
import os

load_dotenv()

test_address = "UC Berkeley"
gmaps = googlemaps.Client(key=os.environ.get("GOOGLE_MAPS_API_KEY"))

# Initialize the client with your API key
def get_address_info(address = test_address):
    # Geocoding an address
    geocode_result = gmaps.geocode(address)

    # Extract latitude and longitude
    location = geocode_result[0]['geometry']['location']
    lat, lng = location['lat'], location['lng']
    print(geocode_result)
    #get full address info
    full_address = geocode_result[0]['formatted_address']
    breakdown = full_address.split(", ")

    street_address, city, state = "", "", ""
    if len(breakdown) == 3:
        city = breakdown[0]                  
        state = breakdown[1]
    elif len(breakdown) == 4:
        street_address = breakdown[0]
        city = breakdown[1]                  
        state_zip = breakdown[2].split(" ")   
        state = state_zip[0] 
    elif len(breakdown) == 5:
        print("5")
        street_address = breakdown[1]
        city = breakdown[2]                  
        state_zip = breakdown[3].split(" ")   
        state = state_zip[0]

    return (lat, lng, street_address, city, state)  

get_address_info()
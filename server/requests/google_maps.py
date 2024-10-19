import googlemaps
from dotenv import load_dotenv
import os

load_dotenv()

test_address = "UC Berkeley"

# Initialize the client with your API key
def address_to_coordinates(address = test_address):
    gmaps = googlemaps.Client(key=os.environ.get("GOOGLE_MAPS_API_KEY"))

    # Geocoding an address
    geocode_result = gmaps.geocode(address)

    # print(geocode_result)

    # Extract latitude and longitude
    location = geocode_result[0]['geometry']['location']
    lat, lng = location['lat'], location['lng']

    print(f"Latitude: {lat}, Longitude: {lng}")

address_to_coordinates()
import math

#radius in km
def calculate_bounding_box(latitude, longitude, radius):
    EARTH_RADIUS_KM = 6371.0
    LATITUDE_DEGREE_KM = 111.0  # Approximate km per degree of latitude

    # Calculate latitude range
    delta_lat = radius / LATITUDE_DEGREE_KM

    # Calculate longitude range, adjusted by the latitude
    delta_lon = radius / (LATITUDE_DEGREE_KM * math.cos(math.radians(latitude)))

    # Calculate min and max latitude and longitude
    min_lat = latitude - delta_lat
    max_lat = latitude + delta_lat
    min_lon = longitude - delta_lon
    max_lon = longitude + delta_lon

    return {
        "min_latitude": min_lat,
        "max_latitude": max_lat,
        "min_longitude": min_lon,
        "max_longitude": max_lon
    }
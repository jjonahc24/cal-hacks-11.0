from extensions.extensions import mongo
from flask import jsonify, request
from models.listings import ListingModel
from utils.google_maps import address_to_coordinates
    
def create(data):
    try:
        #validation
        input_data = ListingModel(**data)
        
        if not input_data.address:
            raise ValueError("Address cannot be empty")
        # convert to long and lat
        lat, lng = address_to_coordinates(input_data.address)

        new_listing = ListingModel(
            owner_id = input_data.owner_id,
            photo_path = input_data.photo_path,
            hourly_rate = input_data.hourly_rate,
            address = input_data.address,
            latitude = lat,
            longitude = lng,
        )
        
        res = mongo.db.Listing.insert_one(new_listing.dict())

        return jsonify({"msg": "success",
                        "user_id": str(res.inserted_id)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
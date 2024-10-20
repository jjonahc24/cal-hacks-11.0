from extensions.extensions import mongo
from flask import jsonify, request
from models.listings import ListingModel, TimeFrameModel
from utils.google_maps import address_to_coordinates
from bson import ObjectId
from utils.google_maps import address_to_coordinates
from utils.location_bounds import calculate_bounding_box
    
def create(data):
    try:
        #validation
        input_data = ListingModel(**data)
        
        if not input_data.address:
            raise ValueError("Address cannot be empty")
        # convert to long and lat
        lat, lng = address_to_coordinates(input_data.address)

        new_listing = ListingModel(
            photo_path = input_data.photo_path,
            hourly_rate = input_data.hourly_rate,
            time_frame = input_data.time_frame,
            address = input_data.address,
            latitude = lat,
            longitude = lng,
            description = input_data.description,
        )

        new_listing = new_listing.dict()
        new_listing['owner_id'] = ObjectId(input_data.owner_id)
        res = mongo.db.Listing.insert_one(new_listing)

        return jsonify({"msg": "success",
                        "listing_id": str(res.inserted_id)}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
def get(id_filter = None, 
        owner_id_filter = None, 
        address_filter = None,
        start_date_filter = None,
        end_date_filter = None):
    try:
        filter_queries = {}

        #construting filter queries
        if id_filter:
            filter_queries['_id'] = ObjectId(id_filter)
        if owner_id_filter:
            filter_queries['owner_id'] = ObjectId(owner_id_filter)
        if address_filter:
            lat, lng = address_to_coordinates(address_filter)
            radius = 1 #1km = 0.6m
            bounding = calculate_bounding_box(lat, lng, radius)
            
            filter_queries["latitude"] = { 
                "$gt": bounding['min_latitude'],
                "$lt": bounding['max_latitude']
            }
            filter_queries["longitude"] = { 
                "$gt": bounding['min_longitude'],
                "$lt": bounding['max_longitude']
            }
        
        #fetch listings
        res = mongo.db.Listing.find(filter_queries)

        #convert ObjectID to strings
        listings = []
        for listing in res:
            listing['_id'] = str(listing['_id'])
            listing['owner_id'] = str(listing['owner_id'])
            listings.append(listing)
        
        #filter date ranges
        if start_date_filter or end_date_filter:
            date_filtered_listings = []
            skip = False
            if start_date_filter and end_date_filter:
                for listing in listings:
                    skip = False
                    for time in listing['time_frame']:
                        if ((time['start_date'] >= start_date_filter) and (time['end_date'] <= end_date_filter)) or \
                            ((time['start_date'] <= start_date_filter) and (time['end_date'] > start_date_filter)) or \
                            ((time['start_date'] < end_date_filter) and (time['end_date'] >= end_date_filter)):
                            print("skipped")
                            skip = True
                            break
                    if not skip:
                        date_filtered_listings.append(listing)
            elif start_date_filter:
                for listing in listings:
                    skip = False
                    for time in listing['time_frame']:
                        if (start_date_filter >= time['start_date']) and (start_date_filter < time['end_date']):
                            skip = True
                            break
                    if not skip:
                        date_filtered_listings.append(listing)
            elif end_date_filter:
                for listing in listings:
                    skip = False
                    for time in listing['time_frame']:
                        if (end_date_filter > time['start_date']) and (end_date_filter <= time['end_date']):
                            skip = True
                            break
                    if not skip:
                        date_filtered_listings.append(listing)

            listings = date_filtered_listings

            
        return jsonify(listings), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
def delete(id):
    try:
        #attempt to delete listing
        res = mongo.db.Listing.delete_one({"_id": ObjectId(id)})

        if res.deleted_count > 0:
            return jsonify({"msg": "success",
                            "deleted_count": res.deleted_count}), 200
        else:
            return jsonify({"error": f"{res.deleted_count} objects deleted."}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 400
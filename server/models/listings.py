from pydantic import BaseModel, confloat
from typing import List
from bson import ObjectId

class TimeFrameModel(BaseModel):
    start_date: str
    end_date: str
    renter_id: str

class ListingModel(BaseModel):
    _id: str = None
    owner_id: str = None
    owner_name: str = None
    owner_picture: str = ""
    listing_name: str = None
    listing_rating: float = 0.0
    photo_path: str = ""
    hourly_rate: float
    time_frame: List[TimeFrameModel] = []
    address: str
    city: str = ""
    state: str = ""
    latitude: float = 0
    longitude: float = 0
    description: str = ""


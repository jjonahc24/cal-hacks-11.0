from pydantic import BaseModel
from typing import List

class TimeFrameModel(BaseModel):
    start_date: str
    end_date: str
    renter_id: str

class ListingModel(BaseModel):
    _id: str
    owner_id: str
    photo_path: str
    hourly_rate: str
    time_frame: List[TimeFrameModel] = []
    address: str
    latitude: str
    longitude: str


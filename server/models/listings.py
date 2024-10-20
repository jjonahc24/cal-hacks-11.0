from pydantic import BaseModel, confloat
from typing import List

class TimeFrameModel(BaseModel):
    start_date: str
    end_date: str
    renter_id: str

class ListingModel(BaseModel):
    _id: str = None
    owner_id: str
    photo_path: str = None
    hourly_rate: float
    time_frame: List[TimeFrameModel] = []
    address: str
    latitude: float = 0
    longitude: float = 0


from pydantic import BaseModel, Field
from typing import List
from bson import ObjectId

class RentHistoryModel(BaseModel):
    listing_id: str
    start_date: str
    end_date: str

class UserModel(BaseModel):
    _id: str = None
    username: str = "default_user"
    first_name: str = "default_fn"
    last_name: str = "default_ln"
    email: str = ""
    profile_picture_path: str = "default_path"
    listings: list[str] = []
    rating: float = 100
    rent_history: list[RentHistoryModel] = []

    class Config:
        allow_population_by_name = True  # Allow using _id as id
        json_encoders = {ObjectId: str}


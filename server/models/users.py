from pydantic import BaseModel
from typing import List

class RentHistoryModel(BaseModel):
    owner_id: str
    start_date: str
    end_date: str

class UserModel(BaseModel):
    _id: str
    username: str = None
    password: str = None
    first_name: str = None
    last_name: str = None
    profile_picture_path: str = None
    listings: list[str] = []
    rating: float = None
    rent_history: RentHistoryModel


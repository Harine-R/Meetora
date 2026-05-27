# schemas.py

from pydantic import BaseModel

# ================= USER SCHEMAS =================

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

# ================= EVENT SCHEMAS =================

class EventCreate(BaseModel):

    title: str
    category: str

    date: str
    time: str

    location: str

    event_mode: str

    description: str

    banner_image: str

    ticket_type: str

    general_price: str
    vip_price: str
    early_bird_price: str

    general_capacity: str
    vip_capacity: str
    early_bird_capacity: str

    discount_code: str
    discount_percentage: str

    early_bird_expiry: str

    owner_id: int

class EventResponse(BaseModel):

    id: int

    title: str
    category: str

    date: str
    time: str

    location: str

    event_mode: str

    description: str

    banner_image: str

    ticket_type: str

    general_price: str
    vip_price: str
    early_bird_price: str

    general_capacity: str
    vip_capacity: str
    early_bird_capacity: str

    discount_code: str
    discount_percentage: str

    early_bird_expiry: str

    owner_id: int

    class Config:
        from_attributes = True
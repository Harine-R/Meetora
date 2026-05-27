# main.py

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import User, Event
from schemas import (
    UserCreate,
    UserLogin,
    EventCreate,
    EventResponse
)
from auth import hash_password, verify_password

app = FastAPI()

# ================= CORS =================

app.add_middleware(
    CORSMiddleware,
  allow_origins=[
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= CREATE TABLES =================

Base.metadata.create_all(bind=engine)

# ================= SIGNUP =================

@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Signup successful",
        "user_id": new_user.id
    }

# ================= LOGIN =================

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    return {
        "message": "Login successful",
        "user_id": existing_user.id,
        "name": existing_user.name
    }

# ================= CREATE EVENT =================

@app.post("/events")
def create_event(
    event: EventCreate,
    db: Session = Depends(get_db)
):

    new_event = Event(
        title=event.title,
        category=event.category,
        date=event.date,
        time=event.time,

        location=event.location,
        event_mode=event.event_mode,

        description=event.description,

        banner_image=event.banner_image,

        ticket_type=event.ticket_type,

        general_price=event.general_price,
        vip_price=event.vip_price,
        early_bird_price=event.early_bird_price,

        general_capacity=event.general_capacity,
        vip_capacity=event.vip_capacity,
        early_bird_capacity=event.early_bird_capacity,

        discount_code=event.discount_code,
        discount_percentage=event.discount_percentage,

        early_bird_expiry=event.early_bird_expiry,

        owner_id=event.owner_id
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return {
        "message": "Event created successfully",
        "event_id": new_event.id
    }

# ================= GET EVENTS =================

@app.get("/events", response_model=list[EventResponse])
def get_events(db: Session = Depends(get_db)):

    events = db.query(Event).all()

    return events

# ================= HEALTH CHECK =================

@app.get("/")
def home():
    return {
        "message": "Meetora backend running 🚀"
    }
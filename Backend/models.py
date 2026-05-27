# models.py

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# ================= USERS TABLE =================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    events = relationship(
        "Event",
        back_populates="owner"
    )

# ================= EVENTS TABLE =================

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)
    category = Column(String)

    date = Column(String)
    time = Column(String)

    location = Column(String)

    event_mode = Column(String)

    description = Column(String)

    banner_image = Column(String)

    ticket_type = Column(String)

    general_price = Column(String)
    vip_price = Column(String)
    early_bird_price = Column(String)

    general_capacity = Column(String)
    vip_capacity = Column(String)
    early_bird_capacity = Column(String)

    discount_code = Column(String)
    discount_percentage = Column(String)

    early_bird_expiry = Column(String)

    owner_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship(
        "User",
        back_populates="events"
    )
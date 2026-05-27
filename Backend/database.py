from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = "postgresql://meetora_user:VQIWune2yd7gubUsJpdSNXI0G8q3YZHR@dpg-d8bauvhakrks73dhhpr0-a.ohio-postgres.render.com/meetora"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import settings
import warnings

try:
    engine = create_engine(settings.DATABASE_URL, pool_pre_ping=True, connect_args={})
    conn = engine.connect()
    conn.close()
    print(f"Connected to database: {settings.DATABASE_URL}")
except Exception as e:
    fallback_url = "sqlite:///./portfolio.db"
    warnings.warn(f"MySQL not available ({e}). Falling back to SQLite: {fallback_url}")
    engine = create_engine(fallback_url, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

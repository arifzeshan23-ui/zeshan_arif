from sqlalchemy import Column, Integer, String, Text, JSON
from app.database import Base


class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(100), nullable=True)
    features = Column(JSON, nullable=True)
    order = Column(Integer, default=0)

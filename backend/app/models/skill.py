from sqlalchemy import Column, Integer, String
from app.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    icon = Column(String(100), nullable=True)
    category = Column(String(50), nullable=True)
    proficiency = Column(Integer, default=0)
    order = Column(Integer, default=0)

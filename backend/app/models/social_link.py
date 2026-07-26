from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class SocialLink(Base):
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    platform = Column(String(100), nullable=False)
    url = Column(String(500), nullable=False)
    icon = Column(String(100), nullable=True)
    is_active = Column(Boolean, default=True)

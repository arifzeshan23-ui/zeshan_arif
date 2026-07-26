from sqlalchemy import Column, Integer, String, Text
from app.database import Base


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    client_name = Column(String(255), nullable=False)
    client_role = Column(String(255), nullable=True)
    client_company = Column(String(255), nullable=True)
    client_image = Column(String(500), nullable=True)
    content = Column(Text, nullable=False)
    rating = Column(Integer, default=5)
    order = Column(Integer, default=0)

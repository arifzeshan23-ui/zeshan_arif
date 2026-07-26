from pydantic import BaseModel
from typing import Optional


class TestimonialBase(BaseModel):
    client_name: str
    client_role: Optional[str] = None
    client_company: Optional[str] = None
    client_image: Optional[str] = None
    content: str
    rating: int = 5
    order: int = 0


class TestimonialCreate(TestimonialBase):
    pass


class TestimonialUpdate(TestimonialBase):
    client_name: Optional[str] = None
    content: Optional[str] = None


class TestimonialOut(TestimonialBase):
    id: int

    class Config:
        from_attributes = True

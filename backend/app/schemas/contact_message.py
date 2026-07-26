from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ContactMessageBase(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str


class ContactMessageCreate(ContactMessageBase):
    pass


class ContactMessageUpdate(BaseModel):
    is_read: bool = True


class ContactMessageOut(ContactMessageBase):
    id: int
    is_read: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

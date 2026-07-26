from pydantic import BaseModel
from typing import Optional


class SocialLinkBase(BaseModel):
    platform: str
    url: str
    icon: Optional[str] = None
    is_active: bool = True


class SocialLinkCreate(SocialLinkBase):
    pass


class SocialLinkUpdate(SocialLinkBase):
    platform: Optional[str] = None
    url: Optional[str] = None


class SocialLinkOut(SocialLinkBase):
    id: int

    class Config:
        from_attributes = True

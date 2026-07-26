from pydantic import BaseModel
from typing import Optional, List


class ServiceBase(BaseModel):
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    features: Optional[List[str]] = None
    order: int = 0


class ServiceCreate(ServiceBase):
    pass


class ServiceUpdate(ServiceBase):
    title: Optional[str] = None


class ServiceOut(ServiceBase):
    id: int

    class Config:
        from_attributes = True

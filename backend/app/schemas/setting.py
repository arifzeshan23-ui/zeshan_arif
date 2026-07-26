from pydantic import BaseModel
from typing import Optional


class SettingBase(BaseModel):
    key: str
    value: Optional[str] = None


class SettingCreate(SettingBase):
    pass


class SettingUpdate(BaseModel):
    value: Optional[str] = None


class SettingOut(SettingBase):
    id: int

    class Config:
        from_attributes = True

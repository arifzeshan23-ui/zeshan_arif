from pydantic import BaseModel
from typing import Optional


class SkillBase(BaseModel):
    name: str
    icon: Optional[str] = None
    category: Optional[str] = None
    proficiency: int = 0
    order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillUpdate(SkillBase):
    name: Optional[str] = None


class SkillOut(SkillBase):
    id: int

    class Config:
        from_attributes = True

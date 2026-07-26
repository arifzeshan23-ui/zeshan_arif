from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ProjectCategoryOut(BaseModel):
    id: int
    name: str
    slug: str

    class Config:
        from_attributes = True


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    image: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    category_id: Optional[int] = None
    featured: bool = False
    order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(ProjectBase):
    title: Optional[str] = None


class ProjectOut(ProjectBase):
    id: int
    created_at: Optional[datetime] = None
    category: Optional[ProjectCategoryOut] = None

    class Config:
        from_attributes = True


class PaginatedResponse(BaseModel):
    data: List
    total: int
    page: int
    limit: int
    pages: int

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.schemas.skill import SkillCreate, SkillUpdate, SkillOut
from app.crud import skill_crud
from app.core.deps import get_current_user
from app.models.user import User
from math import ceil

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("", response_model=dict)
def list_skills(
    category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    filters = {}
    if category:
        filters["category"] = category
    total = skill_crud.count(db, filters)
    skills = skill_crud.get_multi(db, skip=(page - 1) * limit, limit=limit, filters=filters)
    return {
        "data": [SkillOut.model_validate(s).model_dump() for s in skills],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, ceil(total / limit)),
    }


@router.post("", response_model=SkillOut)
def create_skill(
    payload: SkillCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return skill_crud.create(db, payload)


@router.put("/{id}", response_model=SkillOut)
def update_skill(
    id: int,
    payload: SkillUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    skill = skill_crud.get(db, id)
    if not skill:
        from fastapi import HTTPException, status

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Skill not found")
    return skill_crud.update(db, skill, payload)


@router.delete("/{id}")
def delete_skill(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return skill_crud.remove(db, id)

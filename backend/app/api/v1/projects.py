from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut
from app.crud import project_crud, project_category_crud
from app.core.deps import get_current_user
from app.models.user import User
from math import ceil

router = APIRouter(prefix="/projects", tags=["Projects"])


@router.get("", response_model=dict)
def list_projects(
    category: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=100),
    db: Session = Depends(get_db),
):
    filters = {}
    if category:
        cat_obj = project_category_crud.get_by_slug(db, category)
        if cat_obj:
            filters["category_id"] = cat_obj.id
    if search:
        projects = project_crud.search(db, search)
        total = len(projects)
    else:
        total = project_crud.count(db, filters)
        projects = project_crud.get_multi(
            db, skip=(page - 1) * limit, limit=limit, filters=filters
        )
    return {
        "data": [ProjectOut.model_validate(p).model_dump() for p in projects],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, ceil(total / limit)),
    }


@router.get("/{id}", response_model=ProjectOut)
def get_project(id: int, db: Session = Depends(get_db)):
    project = project_crud.get(db, id)
    if not project:
        from fastapi import HTTPException, status

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project


# Admin endpoints
@router.post("", response_model=ProjectOut)
def create_project(
    payload: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return project_crud.create(db, payload)


@router.put("/{id}", response_model=ProjectOut)
def update_project(
    id: int,
    payload: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    project = project_crud.get(db, id)
    if not project:
        from fastapi import HTTPException, status

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project_crud.update(db, project, payload)


@router.delete("/{id}")
def delete_project(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return project_crud.remove(db, id)

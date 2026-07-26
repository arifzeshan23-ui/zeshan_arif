from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceOut
from app.crud import service_crud
from app.core.deps import get_current_user
from app.models.user import User
from math import ceil

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("", response_model=dict)
def list_services(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    total = service_crud.count(db)
    services = service_crud.get_multi(db, skip=(page - 1) * limit, limit=limit)
    return {
        "data": [ServiceOut.model_validate(s).model_dump() for s in services],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, ceil(total / limit)),
    }


@router.post("", response_model=ServiceOut)
def create_service(
    payload: ServiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return service_crud.create(db, payload)


@router.put("/{id}", response_model=ServiceOut)
def update_service(
    id: int,
    payload: ServiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = service_crud.get(db, id)
    if not service:
        from fastapi import HTTPException, status

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return service_crud.update(db, service, payload)


@router.delete("/{id}")
def delete_service(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return service_crud.remove(db, id)

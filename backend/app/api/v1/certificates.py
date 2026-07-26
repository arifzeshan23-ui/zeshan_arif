from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.certificate import CertificateCreate, CertificateUpdate, CertificateOut
from app.crud import certificate_crud
from app.core.deps import get_current_user
from app.models.user import User
from math import ceil

router = APIRouter(prefix="/certificates", tags=["Certificates"])


@router.get("", response_model=dict)
def list_certificates(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    total = certificate_crud.count(db)
    certs = certificate_crud.get_multi(db, skip=(page - 1) * limit, limit=limit)
    return {
        "data": [CertificateOut.model_validate(c).model_dump() for c in certs],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, ceil(total / limit)),
    }


@router.post("", response_model=CertificateOut)
def create_certificate(
    payload: CertificateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return certificate_crud.create(db, payload)


@router.put("/{id}", response_model=CertificateOut)
def update_certificate(
    id: int,
    payload: CertificateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    cert = certificate_crud.get(db, id)
    if not cert:
        from fastapi import HTTPException, status

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Certificate not found")
    return certificate_crud.update(db, cert, payload)


@router.delete("/{id}")
def delete_certificate(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return certificate_crud.remove(db, id)

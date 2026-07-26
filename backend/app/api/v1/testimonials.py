from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate, TestimonialOut
from app.crud import testimonial_crud
from app.core.deps import get_current_user
from app.models.user import User
from math import ceil

router = APIRouter(prefix="/testimonials", tags=["Testimonials"])


@router.get("", response_model=dict)
def list_testimonials(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    db: Session = Depends(get_db),
):
    total = testimonial_crud.count(db)
    testimonials = testimonial_crud.get_multi(db, skip=(page - 1) * limit, limit=limit)
    return {
        "data": [TestimonialOut.model_validate(t).model_dump() for t in testimonials],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, ceil(total / limit)),
    }


@router.post("", response_model=TestimonialOut)
def create_testimonial(
    payload: TestimonialCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return testimonial_crud.create(db, payload)


@router.put("/{id}", response_model=TestimonialOut)
def update_testimonial(
    id: int,
    payload: TestimonialUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    testimonial = testimonial_crud.get(db, id)
    if not testimonial:
        from fastapi import HTTPException, status

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    return testimonial_crud.update(db, testimonial, payload)


@router.delete("/{id}")
def delete_testimonial(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return testimonial_crud.remove(db, id)

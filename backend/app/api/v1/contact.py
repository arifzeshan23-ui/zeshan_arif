from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.contact_message import ContactMessageCreate, ContactMessageOut
from app.crud import contact_message_crud
from app.core.deps import get_current_user
from app.models.user import User
from math import ceil

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("")
def submit_contact(payload: ContactMessageCreate, db: Session = Depends(get_db)):
    contact_message_crud.create(db, payload)
    return {"message": "Message sent successfully"}


# Admin endpoints
@router.get("/messages")
def list_messages(
    page: int = 1,
    limit: int = 50,
    is_read: bool = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    filters = {}
    if is_read is not None:
        filters["is_read"] = is_read
    total = contact_message_crud.count(db, filters)
    messages = contact_message_crud.get_multi(
        db, skip=(page - 1) * limit, limit=limit, filters=filters
    )
    return {
        "data": [ContactMessageOut.model_validate(m).model_dump() for m in messages],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": max(1, ceil(total / limit)),
    }


@router.put("/messages/{id}/read")
def mark_message_read(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    msg = contact_message_crud.mark_as_read(db, id)
    if not msg:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    return {"message": "Marked as read"}


@router.delete("/messages/{id}")
def delete_message(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return contact_message_crud.remove(db, id)

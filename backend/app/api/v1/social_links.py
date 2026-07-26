from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.social_link import SocialLinkCreate, SocialLinkUpdate, SocialLinkOut
from app.crud import social_link_crud
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/social-links", tags=["Social Links"])


@router.get("", response_model=dict)
def list_social_links(db: Session = Depends(get_db)):
    links = social_link_crud.get_multi(db)
    return {"data": [SocialLinkOut.model_validate(l).model_dump() for l in links]}


@router.post("", response_model=SocialLinkOut)
def create_social_link(
    payload: SocialLinkCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return social_link_crud.create(db, payload)


@router.put("/{id}", response_model=SocialLinkOut)
def update_social_link(
    id: int,
    payload: SocialLinkUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    link = social_link_crud.get(db, id)
    if not link:
        from fastapi import HTTPException, status

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Social link not found")
    return social_link_crud.update(db, link, payload)


@router.delete("/{id}")
def delete_social_link(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return social_link_crud.remove(db, id)

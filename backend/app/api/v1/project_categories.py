from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import project_category_crud

router = APIRouter(prefix="/project-categories", tags=["Project Categories"])


@router.get("")
def list_categories(db: Session = Depends(get_db)):
    categories = project_category_crud.get_multi(db)
    return {"data": categories}

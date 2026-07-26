from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.setting import SettingUpdate, SettingOut
from app.crud import setting_crud
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/settings", tags=["Settings"])


@router.get("", response_model=dict)
def get_settings(db: Session = Depends(get_db)):
    settings = setting_crud.get_multi(db)
    data = {s.key: s.value for s in settings}
    return {"data": data}


@router.put("", response_model=dict)
def update_settings(
    payload: dict,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    for key, value in payload.items():
        setting_crud.set_value(db, key, value)
    return {"message": "Settings updated"}

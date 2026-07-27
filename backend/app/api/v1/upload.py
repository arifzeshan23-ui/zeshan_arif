import os
import uuid
import re
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from app.config import settings
from app.database import get_db
from app.core.deps import get_current_user
from app.crud import setting_crud
from app.models.user import User

router = APIRouter(prefix="/upload", tags=["Upload"])

ALLOWED_EXTENSIONS = {
    "images": {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"},
    "cv": {".pdf"},
}


@router.post("")
async def upload_file(
    file: UploadFile = File(...),
    folder: str = "images",
    setting_key: str = "",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ext = os.path.splitext(file.filename)[1].lower()
    allowed = ALLOWED_EXTENSIONS.get(folder, ALLOWED_EXTENSIONS["images"])

    if ext not in allowed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type {ext} not allowed for {folder}",
        )

    # Delete old file if a setting_key is provided and has an existing value
    if setting_key:
        existing = setting_crud.get_by_key(db, setting_key)
        if existing and existing.value:
            match = re.search(rf"/uploads/{folder}/([^/]+)", existing.value)
            if match:
                old_path = os.path.join(
                    settings.UPLOAD_DIR, folder, match.group(1)
                )
                if os.path.exists(old_path):
                    os.remove(old_path)

    upload_dir = os.path.join(settings.UPLOAD_DIR, folder)
    os.makedirs(upload_dir, exist_ok=True)

    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(upload_dir, unique_name)

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    return {
        "url": f"/uploads/{folder}/{unique_name}",
        "filename": unique_name,
    }


@router.delete("/{folder}/{filename}")
def delete_file(
    folder: str,
    filename: str,
    current_user: User = Depends(get_current_user),
):
    file_path = os.path.join(settings.UPLOAD_DIR, folder, filename)
    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="File not found",
        )
    os.remove(file_path)
    return {"message": "File deleted"}

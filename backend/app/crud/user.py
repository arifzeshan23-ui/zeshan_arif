from app.crud.base import CRUDBase
from app.models.user import User
from app.schemas.user import UserLogin
from app.core.security import get_password_hash
from typing import Optional


class CRUDUser(CRUDBase[User, UserLogin, UserLogin]):
    def get_by_username(self, db, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()

    def get_by_email(self, db, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create_admin(self, db, username: str, email: str, password: str) -> User:
        user = User(
            username=username,
            email=email,
            hashed_password=get_password_hash(password),
            is_active=True,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user


user_crud = CRUDUser(User)

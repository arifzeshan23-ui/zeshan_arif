from app.crud.base import CRUDBase
from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessageCreate, ContactMessageUpdate
from typing import Optional, List


class CRUDContactMessage(CRUDBase[ContactMessage, ContactMessageCreate, ContactMessageUpdate]):
    def get_unread(self, db) -> List[ContactMessage]:
        return db.query(ContactMessage).filter(ContactMessage.is_read == False).order_by(ContactMessage.created_at.desc()).all()

    def mark_as_read(self, db, id: int) -> Optional[ContactMessage]:
        msg = self.get(db, id)
        if msg:
            msg.is_read = True
            db.commit()
            db.refresh(msg)
        return msg


contact_message_crud = CRUDContactMessage(ContactMessage)

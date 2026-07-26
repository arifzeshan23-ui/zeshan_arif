from sqlalchemy import Column, Integer, String, Date
from app.database import Base


class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    issuer = Column(String(255), nullable=False)
    issue_date = Column(Date, nullable=True)
    credential_url = Column(String(500), nullable=True)
    image = Column(String(500), nullable=True)
    pdf_url = Column(String(500), nullable=True)
    order = Column(Integer, default=0)

from pydantic import BaseModel
from typing import Optional
from datetime import date


class CertificateBase(BaseModel):
    title: str
    issuer: str
    issue_date: Optional[date] = None
    credential_url: Optional[str] = None
    image: Optional[str] = None
    pdf_url: Optional[str] = None
    order: int = 0


class CertificateCreate(CertificateBase):
    pass


class CertificateUpdate(CertificateBase):
    title: Optional[str] = None
    issuer: Optional[str] = None


class CertificateOut(CertificateBase):
    id: int

    class Config:
        from_attributes = True

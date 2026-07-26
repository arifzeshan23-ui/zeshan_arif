from app.crud.base import CRUDBase
from app.models.certificate import Certificate
from app.schemas.certificate import CertificateCreate, CertificateUpdate


class CRUDCertificate(CRUDBase[Certificate, CertificateCreate, CertificateUpdate]):
    pass


certificate_crud = CRUDCertificate(Certificate)

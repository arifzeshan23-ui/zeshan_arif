from app.crud.base import CRUDBase
from app.models.social_link import SocialLink
from app.schemas.social_link import SocialLinkCreate, SocialLinkUpdate


class CRUDSocialLink(CRUDBase[SocialLink, SocialLinkCreate, SocialLinkUpdate]):
    pass


social_link_crud = CRUDSocialLink(SocialLink)

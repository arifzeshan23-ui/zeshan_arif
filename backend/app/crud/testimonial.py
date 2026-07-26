from app.crud.base import CRUDBase
from app.models.testimonial import Testimonial
from app.schemas.testimonial import TestimonialCreate, TestimonialUpdate


class CRUDTestimonial(CRUDBase[Testimonial, TestimonialCreate, TestimonialUpdate]):
    pass


testimonial_crud = CRUDTestimonial(Testimonial)

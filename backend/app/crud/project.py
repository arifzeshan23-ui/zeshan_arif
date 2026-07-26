from app.crud.base import CRUDBase
from app.models.project import Project, ProjectCategory
from app.schemas.project import ProjectCreate, ProjectUpdate
from typing import Optional, List


class CRUDProject(CRUDBase[Project, ProjectCreate, ProjectUpdate]):
    def get_by_category(self, db, category_slug: str) -> List[Project]:
        return (
            db.query(Project)
            .join(ProjectCategory)
            .filter(ProjectCategory.slug == category_slug)
            .order_by(Project.order, Project.id)
            .all()
        )

    def search(self, db, search_term: str) -> List[Project]:
        return (
            db.query(Project)
            .filter(
                Project.title.ilike(f"%{search_term}%")
                | Project.description.ilike(f"%{search_term}%")
            )
            .order_by(Project.order, Project.id)
            .all()
        )

    def get_featured(self, db, limit: int = 6) -> List[Project]:
        return (
            db.query(Project)
            .filter(Project.featured == True)
            .order_by(Project.order, Project.id)
            .limit(limit)
            .all()
        )


project_crud = CRUDProject(Project)


class CRUDProjectCategory(CRUDBase[ProjectCategory, ProjectCreate, ProjectUpdate]):
    def get_by_slug(self, db, slug: str) -> Optional[ProjectCategory]:
        return db.query(ProjectCategory).filter(ProjectCategory.slug == slug).first()


project_category_crud = CRUDProjectCategory(ProjectCategory)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.config import settings
from app.api.v1 import (
    auth,
    projects,
    project_categories,
    skills,
    certificates,
    services,
    testimonials,
    contact,
    social_links,
    settings as settings_router,
    upload,
)

app = FastAPI(
    title="Zeeshan Arif Portfolio API",
    description="Backend API for Zeeshan Arif's personal portfolio website",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
os.makedirs(os.path.join(settings.UPLOAD_DIR, "images"), exist_ok=True)
os.makedirs(os.path.join(settings.UPLOAD_DIR, "cv"), exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Routes
app.include_router(auth.router, prefix="/api/v1")
app.include_router(projects.router, prefix="/api/v1")
app.include_router(project_categories.router, prefix="/api/v1")
app.include_router(skills.router, prefix="/api/v1")
app.include_router(certificates.router, prefix="/api/v1")
app.include_router(services.router, prefix="/api/v1")
app.include_router(testimonials.router, prefix="/api/v1")
app.include_router(contact.router, prefix="/api/v1")
app.include_router(social_links.router, prefix="/api/v1")
app.include_router(settings_router.router, prefix="/api/v1")
app.include_router(upload.router, prefix="/api/v1")


@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "message": "Zeeshan Arif Portfolio API is running"}


@app.on_event("startup")
def startup():
    try:
        from app.database import Base, engine
        Base.metadata.create_all(bind=engine)

        from app.models import User
        from sqlalchemy.orm import Session
        from app.database import SessionLocal
        from app.core.security import get_password_hash

        db: Session = SessionLocal()
        try:
            admin = db.query(User).filter(User.username == "admin").first()
            if not admin:
                admin_user = User(
                    username="admin",
                    email="arifzeshan23@gmail.com",
                    hashed_password=get_password_hash("admin123"),
                    is_active=True,
                )
                db.add(admin_user)
                db.commit()
                print("Admin user created: admin / admin123")
        finally:
            db.close()
    except Exception as e:
        print(f"Startup error: {e}")

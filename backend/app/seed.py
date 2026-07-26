"""Seed the database with all frontend data so everything shows on the frontend."""
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from datetime import date as date_type
from app.database import SessionLocal, engine, Base
from app.models import (
    User,
    Skill,
    Service,
    Project,
    ProjectCategory,
    Certificate,
    Testimonial,
    SocialLink,
    Setting,
)
from app.core.security import get_password_hash

Base.metadata.create_all(bind=engine)
db = SessionLocal()

try:
    # ── Admin user ──
    admin = db.query(User).filter(User.username == "admin").first()
    if not admin:
        admin = User(
            username="admin",
            email="arifzeshan23@gmail.com",
            hashed_password=get_password_hash("admin123"),
            is_active=True,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print("✅ Admin user created: admin / admin123")
    else:
        print("✓ Admin user already exists")

    # ── Project Categories ──
    categories_data = [
        {"name": "AI", "slug": "ai"},
        {"name": "Web", "slug": "web"},
        {"name": "Automation", "slug": "automation"},
        {"name": "Marketing", "slug": "marketing"},
    ]
    cat_map = {}
    for cd in categories_data:
        cat = db.query(ProjectCategory).filter(ProjectCategory.slug == cd["slug"]).first()
        if not cat:
            cat = ProjectCategory(**cd)
            db.add(cat)
            db.commit()
            db.refresh(cat)
        cat_map[cat.slug] = cat
    print(f"✓ {len(categories_data)} project categories ready")

    # ── Skills ──
    skills_data = [
        {"name": "Generative AI", "category": "ai", "proficiency": 92, "icon": "🧠", "order": 1},
        {"name": "AI Agents", "category": "ai", "proficiency": 88, "icon": "🤖", "order": 2},
        {"name": "AI Automation", "category": "ai", "proficiency": 90, "icon": "⚡", "order": 3},
        {"name": "RAG Systems", "category": "ai", "proficiency": 85, "icon": "🔗", "order": 4},
        {"name": "LangChain", "category": "ai", "proficiency": 87, "icon": "⛓️", "order": 5},
        {"name": "Prompt Engineering", "category": "ai", "proficiency": 95, "icon": "💬", "order": 6},
        {"name": "LLM Integration", "category": "ai", "proficiency": 90, "icon": "🧩", "order": 7},
        {"name": "Python", "category": "development", "proficiency": 90, "icon": "🐍", "order": 8},
        {"name": "FastAPI", "category": "development", "proficiency": 85, "icon": "⚡", "order": 9},
        {"name": "Next.js", "category": "development", "proficiency": 82, "icon": "▲", "order": 10},
        {"name": "API Development", "category": "development", "proficiency": 88, "icon": "🔌", "order": 11},
        {"name": "MySQL", "category": "development", "proficiency": 80, "icon": "🗄️", "order": 12},
        {"name": "Social Media Marketing", "category": "marketing", "proficiency": 85, "icon": "📱", "order": 13},
        {"name": "Meta Ads", "category": "marketing", "proficiency": 82, "icon": "📊", "order": 14},
        {"name": "Google Ads", "category": "marketing", "proficiency": 80, "icon": "🎯", "order": 15},
        {"name": "SEO", "category": "marketing", "proficiency": 85, "icon": "🔍", "order": 16},
    ]
    for sd in skills_data:
        existing = db.query(Skill).filter(Skill.name == sd["name"]).first()
        if not existing:
            db.add(Skill(**sd))
    db.commit()
    print(f"✓ {len(skills_data)} skills seeded")

    # ── Services ──
    services_data = [
        {
            "title": "Generative AI Solutions",
            "description": "Custom AI solutions including chatbots, content generation, and intelligent automation tailored to your business needs.",
            "icon": "Brain",
            "features": ["Custom GPT models", "Content generation", "AI chatbots", "Intelligent automation"],
            "order": 1,
        },
        {
            "title": "AI Automation",
            "description": "Streamline your workflows with AI-powered automation — from data processing to complex multi-step pipelines.",
            "icon": "Zap",
            "features": ["Workflow automation", "Data extraction", "Process optimization", "API integration"],
            "order": 2,
        },
        {
            "title": "Full Stack Development",
            "description": "End-to-end web application development using modern technologies like Next.js, FastAPI, and MySQL.",
            "icon": "Code",
            "features": ["Next.js frontends", "FastAPI backends", "REST/GraphQL APIs", "Database design"],
            "order": 3,
        },
        {
            "title": "Website Development",
            "description": "High-performance, responsive websites with modern UI/UX, optimized for speed and conversions.",
            "icon": "Globe",
            "features": ["Responsive design", "SEO optimization", "Dark/light themes", "Performance tuning"],
            "order": 4,
        },
        {
            "title": "Meta Ads Management",
            "description": "Strategic Meta advertising campaigns optimized for maximum ROI with precise audience targeting.",
            "icon": "Megaphone",
            "features": ["Campaign strategy", "Audience targeting", "A/B testing", "Performance analytics"],
            "order": 5,
        },
        {
            "title": "Google Ads Management",
            "description": "Data-driven Google Ads campaigns that drive qualified traffic and maximize conversion rates.",
            "icon": "BarChart3",
            "features": ["Keyword research", "Ad copywriting", "Bid management", "Conversion tracking"],
            "order": 6,
        },
        {
            "title": "SEO Services",
            "description": "Comprehensive SEO strategies to improve search rankings, increase organic traffic, and grow your online presence.",
            "icon": "Search",
            "features": ["On-page SEO", "Technical SEO", "Content strategy", "Link building"],
            "order": 7,
        },
    ]
    for sd in services_data:
        existing = db.query(Service).filter(Service.title == sd["title"]).first()
        if not existing:
            db.add(Service(**sd))
    db.commit()
    print(f"✓ {len(services_data)} services seeded")

    # ── Projects ──
    projects_data = [
        {
            "title": "AI-Powered Customer Support Agent",
            "description": "Built an intelligent customer support agent using LangChain and RAG that handles complex queries with 95% accuracy. Integrates with multiple knowledge bases and provides real-time responses.",
            "tech_stack": ["Python", "LangChain", "FastAPI", "OpenAI", "MySQL"],
            "github_url": "https://github.com/zeeshanarif",
            "live_url": "#",
            "category_slug": "ai",
            "featured": True,
            "order": 1,
        },
        {
            "title": "AI Automation Dashboard",
            "description": "Full-stack dashboard for managing AI automation workflows. Features drag-and-drop pipeline builder, real-time monitoring, and analytics.",
            "tech_stack": ["Next.js", "Python", "FastAPI", "MySQL", "Docker"],
            "github_url": "https://github.com/zeeshanarif",
            "live_url": "#",
            "category_slug": "web",
            "featured": True,
            "order": 2,
        },
        {
            "title": "RAG-Based Document Search System",
            "description": "Enterprise document search system using Retrieval-Augmented Generation. Supports PDF, DOCX, and web content with semantic search capabilities.",
            "tech_stack": ["Python", "LangChain", "ChromaDB", "FastAPI", "OpenAI"],
            "github_url": "https://github.com/zeeshanarif",
            "live_url": "#",
            "category_slug": "ai",
            "featured": True,
            "order": 3,
        },
        {
            "title": "E-Commerce Platform",
            "description": "Modern e-commerce platform with AI-powered product recommendations, inventory management, and payment integration.",
            "tech_stack": ["Next.js", "FastAPI", "MySQL", "Stripe", "Redis"],
            "github_url": "https://github.com/zeeshanarif",
            "live_url": "#",
            "category_slug": "web",
            "featured": False,
            "order": 4,
        },
        {
            "title": "Social Media Automation Tool",
            "description": "AI-powered social media management tool that auto-generates content, schedules posts, and analyzes engagement metrics across platforms.",
            "tech_stack": ["Python", "FastAPI", "React", "PostgreSQL", "OpenAI"],
            "github_url": "https://github.com/zeeshanarif",
            "live_url": "#",
            "category_slug": "automation",
            "featured": False,
            "order": 5,
        },
        {
            "title": "Lead Generation System",
            "description": "Automated lead generation and qualification system using AI. Features web scraping, lead scoring, and CRM integration.",
            "tech_stack": ["Python", "LangChain", "FastAPI", "MySQL", "Selenium"],
            "github_url": "https://github.com/zeeshanarif",
            "live_url": "#",
            "category_slug": "automation",
            "featured": False,
            "order": 6,
        },
    ]
    for pd_ in projects_data:
        existing = db.query(Project).filter(Project.title == pd_["title"]).first()
        if not existing:
            cat_slug = pd_.pop("category_slug")
            project = Project(
                title=pd_["title"],
                description=pd_["description"],
                tech_stack=pd_["tech_stack"],
                github_url=pd_["github_url"],
                live_url=pd_["live_url"],
                category_id=cat_map[cat_slug].id,
                featured=pd_["featured"],
                order=pd_["order"],
            )
            db.add(project)
    db.commit()
    print(f"✓ {len(projects_data)} projects seeded")

    # ── Certificates ──
    certs_data = [
        {"title": "Generative AI with Large Language Models", "issuer": "DeepLearning.AI", "issue_date": date_type(2024, 12, 1), "credential_url": "#", "order": 1},
        {"title": "LangChain for LLM Application Development", "issuer": "LangChain / DeepLearning.AI", "issue_date": date_type(2024, 11, 15), "credential_url": "#", "order": 2},
        {"title": "Full Stack Web Development", "issuer": "FreeCodeCamp", "issue_date": date_type(2024, 10, 1), "credential_url": "#", "order": 3},
        {"title": "Digital Marketing Fundamentals", "issuer": "Google Digital Garage", "issue_date": date_type(2024, 9, 1), "credential_url": "#", "order": 4},
    ]
    for cd_ in certs_data:
        existing = db.query(Certificate).filter(Certificate.title == cd_["title"]).first()
        if not existing:
            db.add(Certificate(**cd_))
    db.commit()
    print(f"✓ {len(certs_data)} certificates seeded")

    # ── Testimonials ──
    testimonials_data = [
        {
            "client_name": "Ahmed Khan", "client_role": "CEO", "client_company": "TechVentures Inc.",
            "content": "Zeeshan delivered an exceptional AI-powered customer support system for our platform. The integration was seamless, and the results exceeded our expectations. Highly recommended for any AI-related projects.",
            "rating": 5, "order": 1,
        },
        {
            "client_name": "Sarah Ali", "client_role": "Marketing Director", "client_company": "GrowthWise Agency",
            "content": "Working with Zeeshan on our digital marketing campaigns was a game-changer. His data-driven approach combined with AI automation significantly improved our ROI on both Meta and Google Ads.",
            "rating": 5, "order": 2,
        },
        {
            "client_name": "Usman Raza", "client_role": "CTO", "client_company": "DataFlow Solutions",
            "content": "Zeeshan's full-stack development skills are impressive. He built a complex automation dashboard for us that streamlined our entire workflow. The code quality and architecture were production-ready from day one.",
            "rating": 5, "order": 3,
        },
        {
            "client_name": "Fatima Hassan", "client_role": "Project Manager", "client_company": "InnovateTech",
            "content": "The RAG document search system Zeeshan built transformed how we handle internal knowledge management. His understanding of LLM integration and prompt engineering is truly top-notch.",
            "rating": 5, "order": 4,
        },
    ]
    for td in testimonials_data:
        existing = db.query(Testimonial).filter(Testimonial.client_name == td["client_name"]).first()
        if not existing:
            db.add(Testimonial(**td))
    db.commit()
    print(f"✓ {len(testimonials_data)} testimonials seeded")

    # ── Social Links ──
    social_links_data = [
        {"platform": "GitHub", "url": "https://github.com/zeeshanarif", "icon": "github", "is_active": True},
        {"platform": "LinkedIn", "url": "https://linkedin.com/in/zeeshanarif", "icon": "linkedin", "is_active": True},
        {"platform": "WhatsApp", "url": "https://wa.me/923463322480", "icon": "phone", "is_active": True},
        {"platform": "Email", "url": "mailto:arifzeshan23@gmail.com", "icon": "mail", "is_active": True},
    ]
    for sld in social_links_data:
        existing = db.query(SocialLink).filter(SocialLink.platform == sld["platform"]).first()
        if not existing:
            db.add(SocialLink(**sld))
    db.commit()
    print(f"✓ {len(social_links_data)} social links seeded")

    # ── Settings ──
    settings_data = {
        "site_title": "Zeeshan Arif - Generative AI Engineer & Full Stack Developer",
        "site_description": "Building cutting-edge AI solutions, automating workflows, and crafting exceptional digital experiences.",
        "contact_email": "arifzeshan23@gmail.com",
        "contact_phone": "+92 346 3322480",
        "location": "Pakistan",
        "available_for_work": "true",
    }
    for key, value in settings_data.items():
        existing = db.query(Setting).filter(Setting.key == key).first()
        if not existing:
            db.add(Setting(key=key, value=value))
    db.commit()
    print(f"✓ {len(settings_data)} settings seeded")

    print("\n🎉 Database seeding complete!")

except Exception as e:
    db.rollback()
    print(f"❌ Error during seeding: {e}")
    raise
finally:
    db.close()

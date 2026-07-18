from fastapi import FastAPI, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv
from auth import verify_jwt
import resume
import interview
import os

load_dotenv()

app = FastAPI(
    title="AI Interview Coach API",
    description="Backend API for the AI Interview Coach Application",
    version="1.0.0",
)

# Build allowed origins: always include localhost for dev, plus any FRONTEND_URL for production
allowed_origins = ["http://localhost:5173", "http://localhost:3000"]
frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)
app.include_router(interview.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/me")
def get_current_user(payload: dict = Depends(verify_jwt)):
    return {"user_id": payload.get("sub"), "email": payload.get("email")}

# Serve frontend static files if the build directory exists
STATIC_DIR = os.path.join(os.path.dirname(__file__), "static")

if os.path.isdir(STATIC_DIR):
    # Mount static assets (JS, CSS, images) under /assets
    assets_dir = os.path.join(STATIC_DIR, "assets")
    if os.path.isdir(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # Serve other static files (favicon, etc.) 
    @app.get("/favicon.svg")
    async def favicon():
        favicon_path = os.path.join(STATIC_DIR, "favicon.svg")
        if os.path.exists(favicon_path):
            return FileResponse(favicon_path)

    # SPA catch-all: serve index.html for any non-API route
    @app.get("/{full_path:path}")
    async def serve_spa(request: Request, full_path: str):
        # If the file exists in static dir, serve it directly
        file_path = os.path.join(STATIC_DIR, full_path)
        if full_path and os.path.isfile(file_path):
            return FileResponse(file_path)
        # Otherwise serve index.html for client-side routing
        return FileResponse(os.path.join(STATIC_DIR, "index.html"))
else:
    # Fallback when no frontend build is present (dev mode)
    @app.get("/")
    def read_root():
        return {"message": "Welcome to the AI Interview Coach API"}

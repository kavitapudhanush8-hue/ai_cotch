from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/")
def read_root():
    return {"message": "Welcome to the AI Interview Coach API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/me")
def get_current_user(payload: dict = Depends(verify_jwt)):
    return {"user_id": payload.get("sub"), "email": payload.get("email")}

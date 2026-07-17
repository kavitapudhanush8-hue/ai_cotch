import google.generativeai as genai
import os
import json
import asyncio
from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import get_db
from models import Resume, Interview, Question, User
from auth import verify_jwt
from dotenv import load_dotenv

load_dotenv()

# Initialize Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY", "dummy-key-for-dev"))

router = APIRouter(prefix="/api/interview", tags=["interview"])

class InterviewSetupRequest(BaseModel):
    resume_id: int
    role_title: str
    difficulty: str
    technical_focus: str

def generate_questions_with_gemini(role_title: str, resume_text: str, difficulty: str, technical_focus: str) -> list:
    prompt = f"""
    You are an expert Technical Interviewer. Generate exactly 5 highly relevant interview questions for a candidate applying for the role of '{role_title}'.
    Difficulty: {difficulty}
    Technical Focus: {technical_focus}
    
    Candidate Resume context:
    {resume_text}
    
    Return the response as a valid JSON array of objects.
    Each object must have:
    - 'category': one of ['hr', 'behavioral', 'technical', 'coding', 'project-based']
    - 'question_text': The actual question you would ask.
    - 'ideal_answer': A comprehensive ideal answer expected from a strong candidate.
    """
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(prompt)
        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:-3]
        return json.loads(response_text)
    except Exception as e:
        return [
            {
                "category": "behavioral",
                "question_text": "Tell me about a time you faced a significant technical challenge and how you overcame it.",
                "ideal_answer": "STAR method response detailing a complex issue, systematic debugging, and a robust solution."
            },
            {
                "category": "technical",
                "question_text": "Explain how React's Virtual DOM works.",
                "ideal_answer": "The virtual DOM is a lightweight copy of the actual DOM. React compares it with the real DOM and batches updates efficiently."
            }
        ]

@router.post("/setup")
def setup_interview(
    request: InterviewSetupRequest,
    db: Session = Depends(get_db),
    payload: dict = Depends(verify_jwt)
):
    user_id_supabase = payload.get("sub")
    user = db.query(User).filter(User.supabase_id == user_id_supabase).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
        
    resume = db.query(Resume).filter(Resume.id == request.resume_id, Resume.user_id == user.id).first()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    generated_questions = generate_questions_with_gemini(
        role_title=request.role_title,
        resume_text=resume.extracted_text or "",
        difficulty=request.difficulty,
        technical_focus=request.technical_focus
    )
    
    interview = Interview(
        user_id=user.id,
        resume_id=resume.id,
        role_title=request.role_title,
        status="pending"
    )
    db.add(interview)
    db.commit()
    db.refresh(interview)
    
    for q in generated_questions:
        question = Question(
            interview_id=interview.id,
            question_text=q.get("question_text"),
            ideal_answer=q.get("ideal_answer"),
            category=q.get("category")
        )
        db.add(question)
        
    db.commit()
    
    return {
        "message": "Interview generated successfully",
        "interview_id": interview.id,
        "question_count": len(generated_questions)
    }

@router.websocket("/ws/{interview_id}")
async def interview_websocket(websocket: WebSocket, interview_id: int):
    # In a real app, we extract token from query string or headers and verify
    await websocket.accept()
    try:
        # Mocking the interview flow
        await asyncio.sleep(1)
        await websocket.send_json({"type": "question", "text": "Can you start by telling me about a time you faced a significant technical challenge and how you overcame it?"})
        
        for i in range(1, 100):
            await asyncio.sleep(2)
            # Simulate real-time metrics update based on video/audio processing
            await websocket.send_json({
                "type": "metrics",
                "confidence": min(100, 60 + i * 2)
            })
    except WebSocketDisconnect:
        print(f"Client disconnected from interview {interview_id}")

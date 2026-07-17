# AI Interview Coach – Complete Development Roadmap (Phase-wise)

```text
Project Goal
↓
Build MVP
↓
Test Modules
↓
Integrate AI
↓
Deploy
↓
Production Ready
```

---

# Phase 1 — Requirement Analysis

## Objective

Understand the complete project before writing any code.

### Functional Requirements

* User Registration/Login
* Resume Upload
* Resume Analysis
* ATS Score
* AI Question Generator
* Mock Interview
* Camera Access
* Microphone Access
* Speech Recognition
* Face Detection
* Eye Contact
* Emotion Detection
* Body Pose
* Technical Answer Evaluation
* Communication Analysis
* Real-Time Dashboard
* Final Report
* Learning Suggestions
* Interview History

---

### Non Functional Requirements

* Secure Login
* Fast Response
* Real-time Processing
* Mobile Friendly
* Scalable
* Cloud Deployable

---

# Phase 2 — System Design

## High-Level Architecture

```text
                    USER

                      │
                      │
          React Frontend (Vite)
                      │
        REST API (FastAPI Backend)
                      │
 ┌──────────────┬──────────────┬──────────────┐
 │              │              │              │
Resume AI   Interview AI   Vision AI     Database
 │              │              │              │
Gemini      Whisper      MediaPipe     PostgreSQL
```

---

# Folder Structure

```text
AI-Interview-Coach/

frontend/

backend/

database/

models/

uploads/

reports/

static/

docs/

README.md
```

---

# Backend Structure

```text
backend/

app.py

config.py

database.py

requirements.txt

routers/

auth.py

resume.py

interview.py

report.py

history.py

services/

resume_parser.py

ats_score.py

question_generator.py

speech_to_text.py

answer_evaluator.py

emotion_detector.py

eye_contact.py

body_pose.py

voice_analysis.py

confidence.py

communication.py

learning_path.py

models/

schemas/

utils/
```

---

# Frontend Structure

```text
frontend/

src/

pages/

Login

Dashboard

ResumeUpload

Interview

Report

History

components/

Navbar

Sidebar

Camera

ScoreCard

Charts

QuestionBox

FeedbackCard

services/

api.js
```

---

# Database Design

## User Table

```text
id

name

email

password

created_at
```

---

## Resume Table

```text
resume_id

user_id

resume_path

ats_score

resume_score

skills

projects

education
```

---

## Interview Table

```text
interview_id

user_id

date

overall_score

confidence

communication

technical

grammar

eye_contact

body_language
```

---

## Question Table

```text
question_id

interview_id

question

candidate_answer

ideal_answer

score
```

---

# Phase 3 — Authentication

## Flow

```text
Register

↓

Verify Email

↓

Login

↓

JWT Token

↓

Dashboard
```

Technology

* Firebase Auth

OR

* Supabase Auth

---

# Phase 4 — Resume Upload Module

Flow

```text
Upload PDF

↓

Store File

↓

Extract Text

↓

Clean Text

↓

NLP Analysis

↓

Skills Extraction

↓

ATS Score

↓

Store Database
```

Technology

* PyMuPDF
* pdfplumber
* spaCy

---

# Phase 5 — ATS Score

Flow

```text
Resume Text

↓

Check Sections

↓

Skills

↓

Keywords

↓

Formatting

↓

Experience

↓

Projects

↓

Education

↓

Generate ATS Score
```

Output

```text
ATS Score

89/100

Missing Skills

Docker

AWS

CI/CD

Recommended Keywords

REST API

FastAPI

Git
```

---

# Phase 6 — AI Question Generator

Flow

```text
Resume

↓

Extract Skills

↓

Job Role

↓

Gemini Prompt

↓

Generate Questions
```

Example

```text
Python

↓

OOP

↓

REST API

↓

SQL

↓

Projects

↓

Behavioral
```

Output

30–40 questions.

---

# Phase 7 — Mock Interview

Flow

```text
Start Interview

↓

Enable Camera

↓

Enable Microphone

↓

Question Display

↓

Candidate Speaks

↓

Whisper

↓

Text Output
```

---

# Phase 8 — Computer Vision Module

Flow

```text
Camera

↓

Frames

↓

MediaPipe

↓

Face

↓

Eyes

↓

Pose

↓

Hands
```

---

# Face Detection

```text
Camera

↓

Detect Face

↓

Bounding Box

↓

Face Visible?

↓

Yes / No
```

---

# Eye Contact

```text
Eyes

↓

Iris Detection

↓

Camera Direction

↓

Eye Contact %

↓

Score
```

---

# Emotion Detection

```text
Frame

↓

DeepFace

↓

Emotion

↓

Confidence

↓

Store
```

Emotions

* Happy
* Neutral
* Angry
* Fear
* Surprise

---

# Body Language

```text
Pose

↓

Shoulders

↓

Neck

↓

Hands

↓

Movement

↓

Posture Score
```

---

# Phase 9 — Voice Analysis

Flow

```text
Microphone

↓

Audio

↓

Volume

↓

Pitch

↓

Speaking Speed

↓

Pause Detection

↓

Filler Words

↓

Voice Score
```

---

# Phase 10 — Communication Analysis

Flow

```text
Speech Text

↓

Grammar

↓

Vocabulary

↓

Sentence Length

↓

Readability

↓

Fluency

↓

Communication Score
```

Libraries

* spaCy
* LanguageTool
* Transformers

---

# Phase 11 — Technical Answer Evaluation

Flow

```text
Question

↓

Candidate Answer

↓

Gemini

↓

Ideal Answer

↓

Similarity

↓

Accuracy

↓

Technical Score
```

---

# Phase 12 — Confidence Analysis

Inputs

```text
Voice

+

Eye Contact

+

Emotion

+

Posture

+

Speaking Speed
```

↓

Confidence Engine

↓

Confidence Score

---

# Formula

```text
Confidence

=

Eye Contact

30%

+

Voice

20%

+

Emotion

20%

+

Posture

20%

+

Fluency

10%
```

---

# Phase 13 — Real-Time Dashboard

```text
Interview Running

↓

Update Every Second

↓

Charts

↓

Progress Bars

↓

Scores
```

Dashboard

```text
Confidence

Eye Contact

Communication

Emotion

Voice

Technical

Grammar
```

---

# Phase 14 — Final Report

Flow

```text
Interview Ends

↓

Collect Scores

↓

Generate Report

↓

Graphs

↓

Suggestions

↓

Save Database
```

Report Example

```text
Resume

88

ATS

91

Confidence

82

Technical

79

Grammar

94

Eye Contact

80

Emotion

84

Overall

86
```

---

# Phase 15 — Weakness Detection

Rules

```text
Eye Contact <70

↓

Needs Improvement
```

```text
Grammar <60

↓

Improve Grammar
```

```text
Confidence <75

↓

Practice Mock Interviews
```

---

# Phase 16 — Learning Path Generator

Flow

```text
Weakness

↓

Gemini

↓

Generate Resources

↓

Videos

↓

Articles

↓

Coding Practice

↓

Mock Questions
```

---

# Phase 17 — Interview History

Flow

```text
Database

↓

Load Interviews

↓

Charts

↓

Progress

↓

Compare Performance
```

---

# Phase 18 — Deployment

```text
React

↓

Vercel
```

```text
FastAPI

↓

Railway

or

Render
```

```text
Database

↓

Supabase PostgreSQL
```

```text
Media Files

↓

Cloudinary
```

---

# Complete System Workflow

```text
                 START
                    │
                    ▼
            User Registration
                    │
                    ▼
                 Login
                    │
                    ▼
             Upload Resume
                    │
                    ▼
           Resume Text Extraction
                    │
                    ▼
            Resume NLP Analysis
                    │
                    ▼
              ATS Score Generated
                    │
                    ▼
      AI Generates Interview Questions
                    │
                    ▼
          Start Mock Interview
                    │
      ┌─────────────┴─────────────┐
      ▼                           ▼
Camera Starts              Microphone Starts
      │                           │
      ▼                           ▼
Face Detection             Speech Recognition
      │                           │
Eye Contact                 Speech to Text
      │                           │
Emotion Detection           Grammar Analysis
      │                           │
Body Pose                   Technical Evaluation
      └─────────────┬─────────────┘
                    ▼
           Confidence Calculation
                    │
                    ▼
         Real-Time Score Dashboard
                    │
                    ▼
            Interview Completed
                    │
                    ▼
          AI Final Report Generated
                    │
                    ▼
          Weakness Detection Engine
                    │
                    ▼
      Personalized Learning Plan
                    │
                    ▼
         Save History to Database
                    │
                    ▼
                   END
```

# Recommended Development Milestones

| Phase | Deliverable                                    |
| ----- | ---------------------------------------------- |
| 1     | Project setup (React + FastAPI + PostgreSQL)   |
| 2     | Authentication and user dashboard              |
| 3     | Resume upload, parsing, and ATS scoring        |
| 4     | AI question generation                         |
| 5     | Mock interview UI with camera and microphone   |
| 6     | Speech-to-text and answer recording            |
| 7     | Face, eye contact, emotion, and pose analysis  |
| 8     | Communication, voice, and technical evaluation |
| 9     | Real-time scoring dashboard                    |
| 10    | Final AI report with charts                    |
| 11    | Interview history and progress tracking        |
| 12    | Personalized learning recommendations          |
| 13    | Testing, optimization, and cloud deployment    |

This phased approach lets you build a working MVP early (resume analysis + AI interview), then incrementally add real-time computer vision, advanced AI evaluation, analytics, and deployment until you have a complete production-ready AI Interview Coach.

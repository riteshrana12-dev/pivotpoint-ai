from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from .ai_service import analyze_career_path  # Import our AI function

app = FastAPI(title="PivotPoint AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define what the user needs to send us
class AnalysisRequest(BaseModel):
    resume_text: str
    job_description: str

@app.get("/")
def read_root():
    return {"message": "PivotPoint AI Backend is running!"}

# NEW: The Analysis Endpoint
@app.post("/analyze")
async def analyze_resume(request: AnalysisRequest):
    try:
        # Call the Gemini service we built in Step 4
        result = analyze_career_path(request.resume_text, request.job_description)
        return {"status": "success", "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
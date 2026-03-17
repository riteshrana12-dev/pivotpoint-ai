import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_career_path(resume_text, job_description):
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
As a career expert, compare this Resume with this Job Description.
Resume: {resume_text}
Job Description: {job_description}

Return ONLY a JSON object with this exact structure:
{{
  "transferable_skills": ["skill1", "skill2", "skill3"],
  "missing_skills": ["skill1", "skill2", "skill3"],
  "roadmap": [
    {{"week": 1, "focus": "Foundations", "task": "goal"}},
    {{"week": 2, "focus": "Skills", "task": "goal"}},
    {{"week": 3, "focus": "Building", "task": "goal"}},
    {{"week": 4, "focus": "Portfolio", "task": "goal"}}
  ],
  "salary_delta": "+$15,000"
}}
"""
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
    
    Provide a JSON response with:
    1. "transferable_skills": [list of 3 skills]
    2. "missing_skills": [list of 3 skills]
    3. "week_1_plan": "Specific goal for week 1"
    4. "salary_estimate": "Estimated annual salary for this role"
    """
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return {"error": str(e), "message": "API Key missing or invalid"}
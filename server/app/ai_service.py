import os
from genai import Client
from dotenv import load_dotenv

load_dotenv()

# Initialize the new 2026 Client
client = Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_career_path(resume_text, job_description):
    # Using the updated model identifier
    model_id = "gemini-2.0-flash" # Current 2026 standard
    
    prompt = f"""
    Compare this Resume with this Job Description.
    Resume: {resume_text}
    Job Description: {job_description}

    Return ONLY a JSON object with this structure:
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
    
    try:
        # New SDK syntax
        response = client.models.generate_content(
            model=model_id,
            contents=prompt
        )
        
        print("AI Response received!")
        return response.text
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return None
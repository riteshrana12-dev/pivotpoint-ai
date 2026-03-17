import os
from google import genai  # <--- Change this line
from dotenv import load_dotenv

load_dotenv()

# Update the client initialization
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def analyze_career_path(resume_text, job_description):
    model_id = "gemini-2.0-flash" 
    
    # ... (rest of your prompt code)

    try:
        # Update the call syntax slightly for the google.genai SDK
        response = client.models.generate_content(
            model=model_id,
            contents=prompt
        )
        
        print("AI Response received!")
        return response.text
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return None
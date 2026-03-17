from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PivotPoint AI API")

# Setup CORS so our React frontend can talk to this backend later
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, you'd limit this to your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "PivotPoint AI Backend is running!"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "1.0.0"}
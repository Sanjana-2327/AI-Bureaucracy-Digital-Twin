from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import json
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Bureaucracy Digital Twin", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class UserGoalRequest(BaseModel):
    user_goal: str

SYSTEM_PROMPT = """You are an expert AI assistant specializing in Indian government bureaucratic processes and compliance.
Your role is to help citizens navigate government procedures by providing accurate, structured guidance.

You MUST respond with ONLY valid JSON. No markdown, no explanation, no preamble — just raw JSON.

The JSON must follow this exact schema:
{
  "process_overview": "string describing the overall process",
  "workflow": [
    {
      "stage": "Stage name",
      "description": "What to do in this stage",
      "documents_required": ["doc1", "doc2"],
      "estimated_time": "X days/weeks",
      "approval_dependency": "Which authority/department approves this"
    }
  ],
  "required_documents_checklist": ["document 1", "document 2"],
  "risk_warnings": ["risk 1", "risk 2"],
  "timeline_estimation": "Total estimated timeline",
  "escalation_path": "Step-by-step escalation guide if things go wrong",
  "official_reference_note": "Relevant Acts, Rules, government portals to reference"
}

Be specific to Indian government processes, mention actual ministries, portals (like MCA21, Udyam, FSSAI, etc.), and relevant legislation."""

def build_user_prompt(user_goal: str) -> str:
    return f"""The user wants to: {user_goal}

Analyze this goal and generate a comprehensive governance process roadmap for India.
Include all relevant regulatory requirements, approvals needed, and official channels.
Focus on practical, actionable steps a citizen or entrepreneur would need to follow.

Respond with ONLY the JSON object as specified. No additional text."""

@app.post("/generate-process")
async def generate_process(request: UserGoalRequest):
    if not request.user_goal or len(request.user_goal.strip()) < 5:
        raise HTTPException(status_code=400, detail="Please provide a valid goal description.")

    if len(request.user_goal) > 500:
        raise HTTPException(status_code=400, detail="Goal description too long. Please keep it under 500 characters.")

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": build_user_prompt(request.user_goal)}
            ],
            temperature=0.3,
            max_tokens=4096,
        )

        raw_response = completion.choices[0].message.content.strip()

        # Clean potential markdown code blocks
        if raw_response.startswith("```"):
            raw_response = raw_response.split("```")[1]
            if raw_response.startswith("json"):
                raw_response = raw_response[4:]
        if raw_response.endswith("```"):
            raw_response = raw_response[:-3]

        parsed = json.loads(raw_response.strip())

        # Validate required keys
        required_keys = [
            "process_overview", "workflow", "required_documents_checklist",
            "risk_warnings", "timeline_estimation", "escalation_path", "official_reference_note"
        ]
        for key in required_keys:
            if key not in parsed:
                return {"error": "Unable to generate structured response. Please retry."}

        return parsed

    except json.JSONDecodeError:
        return {"error": "Unable to generate structured response. Please retry."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Service error: {str(e)}")

@app.get("/health")
async def health():
    return {"status": "ok", "service": "AI Bureaucracy Digital Twin"}

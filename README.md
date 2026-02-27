# 🇮🇳 AI Bureaucracy Digital Twin

**GenAI-powered Governance Process Intelligence Assistant for India**

Navigate Indian government bureaucracy with AI-generated procedural roadmaps, document checklists, risk warnings, and official references.

---

## 📁 Folder Structure

```
ai-bureaucracy/
├── backend/
│   ├── main.py              # FastAPI app + Groq integration
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variable template
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── api/
        │   └── index.js
        └── components/
            ├── Navbar.jsx
            ├── Sidebar.jsx
            ├── SearchBar.jsx
            ├── WorkflowAccordion.jsx
            ├── ResultDashboard.jsx
            ├── LoadingState.jsx
            └── EmptyState.jsx
```

---

## 🚀 Setup Instructions

### Prerequisites
- Python 3.10+
- Node.js 18+
- A [Groq API Key](https://console.groq.com) (free)

---

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate        # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# Run backend
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

---

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔐 Environment Variables

Create `backend/.env`:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get your free key at: https://console.groq.com

---

## 🧠 How It Works

1. User enters a goal (e.g., "Start a food business in Karnataka")
2. Frontend sends POST to `/generate-process`
3. Backend builds a structured prompt for Groq LLaMA 3 70B
4. LLM returns JSON with process overview, workflow, documents, risks, timeline, escalation path, and official references
5. Frontend renders the structured data in a dashboard

---

## 📡 API Reference

### POST `/generate-process`

**Request:**
```json
{
  "user_goal": "I want to start a small food business in Karnataka"
}
```

**Response:**
```json
{
  "process_overview": "...",
  "workflow": [...],
  "required_documents_checklist": [...],
  "risk_warnings": [...],
  "timeline_estimation": "...",
  "escalation_path": "...",
  "official_reference_note": "..."
}
```

---

## ⚠️ Disclaimer

This system provides **informational guidance only**. Always verify requirements with official government portals. This is **not legal advice**.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Python + FastAPI |
| AI | Groq API (LLaMA 3 70B) |
| HTTP Client | Axios |

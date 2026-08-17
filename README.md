# CrisisSync AI — Rapid Crisis Response in Hospitality
  
## Vision
Hospitality venues face unpredictable, high-stakes emergencies that demand instantaneous, coordinated reactions. **CrisisSync AI** eliminates fragmented communication by creating a reliable bridge between distressed individuals, on-site staff, and emergency services using Google's Gemini AI.

## Live Deployment & Repository 
- **GitHub Repository**: [https://github.com/Aayush9-spec/CrisisSync-AI](https://github.com/Aayush9-spec/CrisisSync-AI)
- **Frontend (Live App)**: [https://crisis-sync-frontend-112365499000.us-central1.run.app](https://crisis-sync-frontend-112365499000.us-central1.run.app)
- **Backend API**: [https://crisis-sync-backend-112365499000.us-central1.run.app](https://crisis-sync-backend-112365499000.us-central1.run.app)
- **API Documentation**: [https://crisis-sync-backend-112365499000.us-central1.run.app/docs](https://crisis-sync-backend-112365499000.us-central1.run.app/docs)

## Key Features 
- **AI-Powered Incident Detection**: Leverages Google Gemini to analyze reports, classify severity, and auto-assign response teams.
- **Real-Time Command Dashboard**: Live WebSocket-powered coordination hub for management and security.
- **Instant SOS Portal**: One-tap emergency reporting for guests with integrated AI safety guidance.
- **Smart Response Recommendations**: AI-driven action items based on incident type and severity.
- **Performance Analytics**: Track response times and incident patterns to improve safety protocols.

## Tech Stack
- **AI**: Google Gemini 2.0 Flash (for analysis and chat)
- **Backend**: FastAPI (Python), WebSockets
- **Frontend**: React, Vite, Framer Motion, Lucide Icons
- **Design**: Premium Glassmorphism UI / Dark Mode

## Setup Instructions

### Prerequisites
- Python 3.9+ 
- Node.js 18+
- [Optional] Google Gemini API Key

### Backend Setup
1. `cd backend`
2. `pip install -r requirements.txt` 
3. Create `.env` and add `GEMINI_API_KEY=your_key`
4. `uvicorn main:app --reload`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Demo Mode
If no API key is provided, the system automatically enters **Simulation Mode**, providing pre-recorded but realistic AI analysis scenarios to demonstrate full platform capabilities.

---
Built for **Google Solution Challenge 2026 India - Build with AI**

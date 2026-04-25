# CrisisSync AI — Agent Build Specification

## Goal
You are a senior product designer + frontend engineer.
Build a **production-ready, hackathon-winning** AI-powered crisis response system for hospitality venues that leverages Google technologies (Gemini AI, Google Cloud, Firebase) to instantly detect, report, and coordinate emergency responses across a decentralized hospitality ecosystem.

## Hackathon Context
- **Event**: Google Solution Challenge 2026 India — Build with AI (via Hack2skill)
- **Theme**: Rapid Crisis Response — Accelerated Emergency Response and Crisis Coordination in Hospitality
- **Track**: Open Innovation under the theme
- **Judging Criteria**: Innovation, Impact, Technical Depth (Google AI/ML), Scalability, Presentation Quality

## Core Problem
Hospitality venues face unpredictable, high-stakes emergencies. Critical information is siloed, fracturing communication between distressed guests, on-site staff, and first responders.

## Solution: CrisisSync AI
An AI-powered crisis coordination platform that provides:
1. **AI-Powered Incident Detection** — Gemini AI analyzes reports, classifies severity, and auto-assigns responders
2. **Real-Time Coordination Dashboard** — Live WebSocket-powered command center with role-based views
3. **Guest SOS Portal** — One-tap emergency reporting with location awareness
4. **Smart Notification Engine** — Push alerts to the right people at the right time
5. **Incident State Machine** — Full lifecycle tracking (REPORTED → ACTIVE → IN_PROGRESS → RESOLVED)
6. **Interactive Venue Map** — Visual incident tracking on property layout
7. **AI Chatbot** — Gemini-powered emergency guidance for guests and staff

## Architecture

### Frontend (React + Vite)
- Modern glassmorphism UI with dark theme
- Real-time WebSocket connection for live updates
- Role-based views: Guest, Staff, Manager, First Responder
- Interactive map with incident markers
- AI chat interface powered by Gemini

### Backend (FastAPI + Python)
- RESTful API for CRUD operations
- WebSocket manager for real-time broadcasting
- Gemini AI integration for incident analysis
- In-memory store (demo-ready, easily swappable to Supabase/Firebase)
- Event engine with priority classification
- Notification service

### Google Technologies Used
- **Google Gemini AI** — Incident analysis, severity classification, response recommendations
- **Google Cloud Run** — Scalable deployment
- **Firebase Cloud Messaging** — Push notifications
- **Google Maps API** — Venue mapping (optional enhancement)

## Project Structure
```
crisis-response-ai/
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GuestPortal.jsx
│   │   │   ├── StaffView.jsx
│   │   │   └── Analytics.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── IncidentCard.jsx
│   │   │   ├── SOSButton.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   ├── VenueMap.jsx
│   │   │   ├── StatusBadge.jsx
│   │   │   └── NotificationBell.jsx
│   │   └── services/
│   │       ├── api.js
│   │       └── socket.js
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── app/
│       ├── __init__.py
│       ├── routes/
│       │   ├── events.py
│       │   ├── incidents.py
│       │   └── ai.py
│       ├── services/
│       │   ├── event_engine.py
│       │   ├── gemini_service.py
│       │   └── notification.py
│       ├── websockets/
│       │   └── manager.py
│       └── models/
│           └── schema.py
├── .env
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
└── README.md
```

## Demo Flow (What judges see)
1. Guest opens SOS portal → presses emergency button
2. AI (Gemini) instantly classifies incident type, severity, and recommended response
3. Dashboard updates in real-time via WebSocket
4. Staff receives notification and clicks "Respond"
5. Status transitions: REPORTED → ACTIVE → IN_PROGRESS → RESOLVED
6. AI chatbot provides emergency guidance to guest
7. Analytics show response time metrics

## Non-Functional Requirements
- Response time < 2 seconds
- Zero console errors
- Mobile-responsive design
- Accessible (WCAG 2.1 AA)
- Production-grade error handling

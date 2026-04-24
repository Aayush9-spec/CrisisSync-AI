"""
CrisisSync AI — Gemini AI Service
Integrates Google Gemini for intelligent incident analysis, severity classification,
and response recommendations.
"""

import os
import json
import structlog
from typing import Optional

logger = structlog.get_logger()

# Try to import google.generativeai — graceful fallback if not available
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    logger.warning("google-generativeai not installed, using AI simulation mode")


def _configure_gemini():
    """Configure Gemini API with key from environment."""
    api_key = os.getenv("GEMINI_API_KEY", "")
    if api_key and GEMINI_AVAILABLE:
        genai.configure(api_key=api_key)
        return True
    return False


GEMINI_CONFIGURED = _configure_gemini()


ANALYSIS_PROMPT = """You are CrisisSync AI, an emergency response coordinator for hospitality venues.
Analyze the following incident report and provide a structured JSON response.

Incident Report:
- Type: {type}
- Location: {location}
- Description: {description}
- Floor: {floor}
- Room: {room}
- Guests Affected: {guests_affected}
- Reporter: {reporter_name} ({reporter_role})

Respond ONLY with valid JSON in this exact format:
{{
  "severity": "CRITICAL|HIGH|MEDIUM|LOW",
  "analysis": "Brief 1-2 sentence analysis of the situation",
  "recommendations": [
    "Specific action item 1",
    "Specific action item 2",
    "Specific action item 3"
  ],
  "assigned_teams": ["security", "medical", "fire_department", "management", "engineering", "housekeeping"],
  "estimated_response_time_minutes": 5,
  "evacuation_needed": true/false,
  "guest_communication": "Brief message to communicate to affected guests"
}}

Select assigned_teams from: security, medical, fire_department, management, engineering, housekeeping.
Be specific and actionable in recommendations. Consider guest safety as top priority."""


CHAT_PROMPT = """You are CrisisSync AI, an emergency assistant for a hospitality venue.
You help guests and staff during crisis situations with clear, calm, actionable guidance.

Current context: {context}

User role: {role}
User message: {message}

Provide a helpful, concise response. If this is an emergency, prioritize safety instructions.
Keep responses under 150 words. Be calm, clear, and actionable."""


async def analyze_incident(event_data: dict) -> dict:
    """
    Use Gemini AI to analyze an incident and provide severity classification,
    response recommendations, and team assignments.
    """
    if GEMINI_CONFIGURED:
        try:
            model = genai.GenerativeModel("gemini-2.0-flash")
            prompt = ANALYSIS_PROMPT.format(
                type=event_data.get("type", "UNKNOWN"),
                location=event_data.get("location", "Unknown"),
                description=event_data.get("description", "No description"),
                floor=event_data.get("floor", "N/A"),
                room=event_data.get("room", "N/A"),
                guests_affected=event_data.get("guests_affected", "Unknown"),
                reporter_name=event_data.get("reporter_name", "Anonymous"),
                reporter_role=event_data.get("reporter_role", "guest"),
            )
            response = await model.generate_content_async(prompt)
            text = response.text.strip()

            # Extract JSON from response (handle markdown code blocks)
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            elif "```" in text:
                text = text.split("```")[1].split("```")[0].strip()

            result = json.loads(text)
            logger.info("gemini_analysis_complete", incident_type=event_data.get("type"))
            return result

        except Exception as e:
            logger.error("gemini_analysis_failed", error=str(e))
            return _simulate_analysis(event_data)
    else:
        return _simulate_analysis(event_data)


async def chat_response(message: str, role: str = "guest", context: str = "", incident_id: Optional[str] = None) -> str:
    """Generate an AI chat response for emergency guidance."""
    if GEMINI_CONFIGURED:
        try:
            model = genai.GenerativeModel("gemini-2.0-flash")
            prompt = CHAT_PROMPT.format(
                context=context or "General emergency assistance",
                role=role,
                message=message,
            )
            response = await model.generate_content_async(prompt)
            return response.text.strip()
        except Exception as e:
            logger.error("gemini_chat_failed", error=str(e))
            return _simulate_chat(message, role)
    else:
        return _simulate_chat(message, role)


def _simulate_analysis(event_data: dict) -> dict:
    """Fallback AI simulation when Gemini is not configured."""
    incident_type = event_data.get("type", "OTHER").upper()

    severity_map = {
        "FIRE": "CRITICAL",
        "NATURAL_DISASTER": "CRITICAL",
        "HAZMAT": "CRITICAL",
        "EVACUATION": "HIGH",
        "MEDICAL": "HIGH",
        "SECURITY": "HIGH",
        "STRUCTURAL": "MEDIUM",
        "OTHER": "MEDIUM",
    }

    teams_map = {
        "FIRE": ["fire_department", "security", "management"],
        "MEDICAL": ["medical", "management"],
        "SECURITY": ["security", "management"],
        "NATURAL_DISASTER": ["security", "fire_department", "management", "engineering"],
        "STRUCTURAL": ["engineering", "security", "management"],
        "HAZMAT": ["fire_department", "security", "engineering"],
        "EVACUATION": ["security", "management", "fire_department"],
        "OTHER": ["security", "management"],
    }

    recommendations_map = {
        "FIRE": [
            "Activate fire alarm and begin floor evacuation immediately",
            "Contact fire department — provide exact location and floor details",
            "Deploy on-site fire suppression team to affected area",
            "Open all emergency exits and guide guests to assembly points",
            "Account for all registered guests in the affected zone",
        ],
        "MEDICAL": [
            "Dispatch on-site medical team to the location immediately",
            "Call emergency medical services (EMS) — provide patient details",
            "Clear the area to allow medical access",
            "Prepare AED and first-aid equipment",
            "Notify guest's emergency contact if available",
        ],
        "SECURITY": [
            "Deploy security team to the incident location",
            "Initiate lockdown of affected area if threat is active",
            "Contact local law enforcement with incident details",
            "Review CCTV footage of the area",
            "Secure all entry and exit points",
        ],
        "NATURAL_DISASTER": [
            "Activate natural disaster emergency protocol",
            "Move all guests to designated safe zones",
            "Shut down non-essential building systems",
            "Establish communication with local emergency management",
            "Begin headcount of all guests and staff",
        ],
    }

    severity = severity_map.get(incident_type, "MEDIUM")
    teams = teams_map.get(incident_type, ["security", "management"])
    recs = recommendations_map.get(incident_type, [
        "Assess the situation and secure the area",
        "Notify management and relevant response teams",
        "Document the incident with photos and details",
        "Ensure guest safety and provide assistance",
    ])

    return {
        "severity": severity,
        "analysis": f"AI Analysis: {incident_type} incident detected at {event_data.get('location', 'unknown location')}. "
                    f"Severity classified as {severity}. Immediate response teams have been assigned.",
        "recommendations": recs,
        "assigned_teams": teams,
        "estimated_response_time_minutes": 3 if severity == "CRITICAL" else 5 if severity == "HIGH" else 10,
        "evacuation_needed": incident_type in ("FIRE", "NATURAL_DISASTER", "HAZMAT", "EVACUATION"),
        "guest_communication": f"Attention: A {incident_type.lower().replace('_', ' ')} situation has been reported. "
                               f"Please remain calm and follow staff instructions.",
    }


def _simulate_chat(message: str, role: str) -> str:
    """Fallback chat when Gemini is not available."""
    msg_lower = message.lower()

    if any(word in msg_lower for word in ["fire", "smoke", "burning"]):
        return ("🔥 **Fire Emergency Detected.** Stay calm. Do NOT use elevators. "
                "Move to the nearest emergency exit. Cover your nose and mouth. "
                "Our security team has been alerted and is en route to your location. "
                "If you're trapped, stay near a window and signal for help.")

    if any(word in msg_lower for word in ["medical", "hurt", "injured", "pain", "heart", "breathing"]):
        return ("🏥 **Medical emergency noted.** Stay with the affected person. "
                "Our medical team is being dispatched now. Do not move the person unless they are in immediate danger. "
                "If they're unconscious, check for breathing and pulse. AED locations are marked on each floor.")

    if any(word in msg_lower for word in ["security", "threat", "suspicious", "weapon", "attack"]):
        return ("🔒 **Security alert acknowledged.** Stay in your room and lock the door. "
                "Do not attempt to confront the threat. Security team is responding. "
                "If in a public area, move to the nearest safe zone calmly.")

    if any(word in msg_lower for word in ["earthquake", "flood", "storm", "tsunami"]):
        return ("⚠️ **Natural disaster protocol activated.** Move away from windows and heavy objects. "
                "Take cover under sturdy furniture. Follow staff instructions to safe zones. "
                "Do NOT use elevators. Emergency supplies are located at each floor station.")

    if any(word in msg_lower for word in ["help", "emergency", "sos", "danger"]):
        return ("🆘 **Your emergency has been registered.** Help is on the way. "
                "Please stay where you are if safe. A team member will contact you shortly. "
                "If you're in immediate danger, move to the nearest exit.")

    return ("I'm CrisisSync AI, your emergency assistant. I can help you with:\n"
            "• **Report an emergency** — Fire, medical, security, or other emergencies\n"
            "• **Get safety instructions** — Evacuation routes, first aid, safe zones\n"
            "• **Check incident status** — Track active incidents and response progress\n"
            "• **Contact staff** — Connect with on-site security or management\n\n"
            "How can I assist you?")

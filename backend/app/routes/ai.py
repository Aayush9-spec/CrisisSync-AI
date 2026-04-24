"""
CrisisSync AI — AI Chat Routes
Endpoints for AI-powered emergency chat assistance.
"""

from fastapi import APIRouter
from app.services.gemini_service import chat_response
from app.models.schema import ChatMessage

router = APIRouter(prefix="/api", tags=["ai"])


@router.post("/chat")
async def chat(msg: ChatMessage):
    """Send a message to the AI emergency assistant."""
    response = await chat_response(
        message=msg.message,
        role=msg.role,
        context=msg.context or "",
        incident_id=msg.incident_id,
    )
    return {
        "response": response,
        "role": msg.role,
    }


@router.get("/ai/status")
def ai_status():
    """Check if Gemini AI is configured and available."""
    from app.services.gemini_service import GEMINI_CONFIGURED
    return {
        "gemini_configured": GEMINI_CONFIGURED,
        "mode": "live" if GEMINI_CONFIGURED else "simulation",
        "model": "gemini-2.0-flash",
    }

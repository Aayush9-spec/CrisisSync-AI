"""
CrisisSync AI — Data Models & Schemas
Pydantic models for incident lifecycle management.
"""

from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
import uuid


class IncidentType(str, Enum):
    FIRE = "FIRE"
    MEDICAL = "MEDICAL"
    SECURITY = "SECURITY"
    NATURAL_DISASTER = "NATURAL_DISASTER"
    STRUCTURAL = "STRUCTURAL"
    HAZMAT = "HAZMAT"
    EVACUATION = "EVACUATION"
    OTHER = "OTHER"


class Severity(str, Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class Status(str, Enum):
    REPORTED = "REPORTED"
    ACTIVE = "ACTIVE"
    IN_PROGRESS = "IN_PROGRESS"
    RESOLVED = "RESOLVED"
    FALSE_ALARM = "FALSE_ALARM"


class Role(str, Enum):
    GUEST = "guest"
    STAFF = "staff"
    MANAGER = "manager"
    FIRST_RESPONDER = "first_responder"


class EventCreate(BaseModel):
    """Schema for creating a new crisis event."""
    type: str = Field(..., description="Type of emergency (FIRE, MEDICAL, etc.)")
    location: str = Field(..., description="Location within the venue")
    description: str = Field(default="", description="Detailed description of the incident")
    reporter_name: str = Field(default="Anonymous Guest", description="Name of the person reporting")
    reporter_role: str = Field(default="guest", description="Role of the reporter")
    floor: Optional[str] = Field(default=None, description="Floor number")
    room: Optional[str] = Field(default=None, description="Room number")
    guests_affected: Optional[int] = Field(default=None, description="Estimated number of affected guests")


class Incident(BaseModel):
    """Full incident record with AI analysis."""
    id: str = Field(default_factory=lambda: str(uuid.uuid4())[:8])
    type: str
    severity: str = "MEDIUM"
    status: str = "REPORTED"
    location: str
    description: str = ""
    reporter_name: str = "Anonymous Guest"
    reporter_role: str = "guest"
    floor: Optional[str] = None
    room: Optional[str] = None
    guests_affected: Optional[int] = None
    assigned_to: List[str] = Field(default_factory=list)
    ai_analysis: Optional[str] = None
    ai_rationale: Optional[str] = None
    ai_recommendations: List[str] = Field(default_factory=list)
    priority_score: int = 5
    guest_communication: Optional[str] = None
    response_actions: List[str] = Field(default_factory=list)
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())
    updated_at: Optional[str] = None
    resolved_at: Optional[str] = None
    response_time_seconds: Optional[float] = None
    coordinates: Optional[dict] = None  # {"lat": float, "lng": float}


class StatusUpdate(BaseModel):
    """Schema for updating incident status."""
    status: str
    note: Optional[str] = None
    updated_by: str = "system"


class ChatMessage(BaseModel):
    """Schema for AI chat messages."""
    message: str
    incident_id: Optional[str] = None
    role: str = "guest"
    context: Optional[str] = None

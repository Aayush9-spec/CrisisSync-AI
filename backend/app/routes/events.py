"""
CrisisSync AI — Event Routes
Endpoints for creating and simulating crisis events.
"""

from fastapi import APIRouter
from app.services.event_engine import process_event
from app.models.schema import EventCreate
import random

router = APIRouter(prefix="/api", tags=["events"])


@router.post("/events")
async def create_event(event: EventCreate):
    """Create a new crisis event — triggers AI analysis and real-time broadcast."""
    return await process_event(event.model_dump())


@router.post("/events/quick")
async def quick_event(event: dict):
    """Quick event creation with minimal data (for SOS button)."""
    return await process_event(event)


@router.post("/simulate")
async def simulate_event():
    """Simulate a random crisis event for demo purposes."""
    scenarios = [
        {
            "type": "FIRE",
            "location": "Kitchen — Ground Floor",
            "description": "Smoke detected in main kitchen area. Fire suppression system partially activated.",
            "reporter_name": "Chef Raman",
            "reporter_role": "staff",
            "floor": "G",
            "room": "Kitchen-A",
            "guests_affected": 45,
        },
        {
            "type": "MEDICAL",
            "location": "Pool Area — Level 2",
            "description": "Guest collapsed near the swimming pool. Appears to be having difficulty breathing.",
            "reporter_name": "Lifeguard Priya",
            "reporter_role": "staff",
            "floor": "2",
            "room": "Pool-Main",
            "guests_affected": 3,
        },
        {
            "type": "SECURITY",
            "location": "Lobby — Main Entrance",
            "description": "Unauthorized individual attempting to access restricted areas. Aggressive behavior reported.",
            "reporter_name": "Front Desk",
            "reporter_role": "staff",
            "floor": "G",
            "room": "Lobby",
            "guests_affected": 20,
        },
        {
            "type": "NATURAL_DISASTER",
            "location": "Entire Property",
            "description": "Earthquake tremors detected. Building structural assessment needed.",
            "reporter_name": "Building Sensors",
            "reporter_role": "system",
            "floor": "ALL",
            "guests_affected": 200,
        },
        {
            "type": "STRUCTURAL",
            "location": "Ballroom B — Level 1",
            "description": "Ceiling panel fell during conference event. Area needs immediate inspection.",
            "reporter_name": "Event Manager Ankit",
            "reporter_role": "manager",
            "floor": "1",
            "room": "Ballroom-B",
            "guests_affected": 80,
        },
        {
            "type": "HAZMAT",
            "location": "Laundry Room — Basement",
            "description": "Chemical spill detected. Staff reporting strong fumes and irritation.",
            "reporter_name": "Housekeeping Lead",
            "reporter_role": "staff",
            "floor": "B1",
            "room": "Laundry",
            "guests_affected": 5,
        },
        {
            "type": "MEDICAL",
            "location": "Restaurant — Level 1",
            "description": "Multiple guests reporting food allergy reactions. Possible contamination in buffet.",
            "reporter_name": "Restaurant Manager",
            "reporter_role": "manager",
            "floor": "1",
            "room": "Restaurant-Main",
            "guests_affected": 12,
        },
        {
            "type": "FIRE",
            "location": "Room 504 — Level 5",
            "description": "Smoke alarm triggered in guest room. Guest reports electrical sparking from outlet.",
            "reporter_name": "Guest — Room 504",
            "reporter_role": "guest",
            "floor": "5",
            "room": "504",
            "guests_affected": 2,
        },
    ]

    scenario = random.choice(scenarios)
    return await process_event(scenario)
@router.post("/events/{incident_id}/visual-intel")
async def add_visual_intel(incident_id: str, data: dict):
    """Analyze an image for an existing incident and add visual intelligence."""
    from app.services.event_engine import add_visual_intel_to_incident
    return await add_visual_intel_to_incident(incident_id, data.get("image_data"))

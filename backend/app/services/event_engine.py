"""
CrisisSync AI — Event Processing Engine
Core business logic for processing crisis events, classifying severity,
assigning response teams, and managing the incident lifecycle.
"""

from datetime import datetime
import structlog
from app.services.gemini_service import analyze_incident
from app.websockets.manager import manager
from app.models.schema import Incident

logger = structlog.get_logger()

# In-memory incident store (production: swap with database)
incidents_store: list[dict] = []


async def process_event(event_data: dict) -> dict:
    """
    Process a new crisis event:
    1. Run AI analysis (Gemini or simulation)
    2. Create incident record
    3. Broadcast to all connected clients via WebSocket
    4. Return the processed incident
    """
    # Step 1: AI Analysis
    ai_result = await analyze_incident(event_data)

    # Step 2: Create incident record
    incident = Incident(
        type=event_data.get("type", "OTHER").upper(),
        location=event_data.get("location", "Unknown"),
        description=event_data.get("description", ""),
        reporter_name=event_data.get("reporter_name", "Anonymous Guest"),
        reporter_role=event_data.get("reporter_role", "guest"),
        floor=event_data.get("floor"),
        room=event_data.get("room"),
        guests_affected=event_data.get("guests_affected"),
        severity=ai_result.get("severity", "MEDIUM"),
        priority_score=ai_result.get("priority_score", 5),
        status="ACTIVE",
        assigned_to=ai_result.get("assigned_teams", []),
        ai_analysis=ai_result.get("analysis", ""),
        ai_rationale=ai_result.get("rationale", ""),
        ai_recommendations=ai_result.get("recommendations", []),
        guest_communication=ai_result.get("guest_communication", ""),
        coordinates=event_data.get("coordinates"),
    )

    incident_dict = incident.model_dump()
    incidents_store.append(incident_dict)

    logger.info(
        "incident_created",
        id=incident.id,
        type=incident.type,
        severity=incident.severity,
        location=incident.location,
    )

    # Step 3: Broadcast to all connected clients
    await manager.broadcast({
        "type": "NEW_INCIDENT",
        "data": incident_dict,
    })

    # Step 4: Send targeted notifications based on severity
    if ai_result.get("severity") == "CRITICAL":
        await manager.broadcast({
            "type": "CRITICAL_ALERT",
            "data": {
                "message": f"⚠️ CRITICAL: {incident.type} at {incident.location}",
                "incident_id": incident.id,
                "evacuation_needed": ai_result.get("evacuation_needed", False),
                "guest_communication": ai_result.get("guest_communication", ""),
            },
        })

    return {
        "status": "processed",
        "incident": incident_dict,
        "ai_analysis": ai_result,
    }


async def update_incident_status(incident_id: str, new_status: str, note: str = "", updated_by: str = "system") -> dict:
    """Update the status of an existing incident."""
    for incident in incidents_store:
        if incident["id"] == incident_id:
            old_status = incident["status"]
            incident["status"] = new_status
            incident["updated_at"] = datetime.now().isoformat()

            if new_status == "IN_PROGRESS":
                # Calculate response time
                created = datetime.fromisoformat(incident["timestamp"])
                now = datetime.now()
                incident["response_time_seconds"] = (now - created).total_seconds()

            if new_status == "RESOLVED":
                incident["resolved_at"] = datetime.now().isoformat()

            if note:
                incident["response_actions"].append(f"[{updated_by}] {note}")

            # Broadcast status update
            await manager.broadcast({
                "type": "STATUS_UPDATE",
                "data": {
                    "incident_id": incident_id,
                    "old_status": old_status,
                    "new_status": new_status,
                    "updated_by": updated_by,
                    "note": note,
                    "incident": incident,
                },
            })

            logger.info(
                "incident_status_updated",
                id=incident_id,
                old_status=old_status,
                new_status=new_status,
            )

            return {"status": "updated", "incident": incident}

    return {"status": "error", "message": f"Incident {incident_id} not found"}


def get_all_incidents() -> list[dict]:
    """Get all incidents, most recent first."""
    return sorted(incidents_store, key=lambda x: x["timestamp"], reverse=True)


def get_incident_by_id(incident_id: str) -> dict | None:
    """Get a specific incident by ID."""
    for incident in incidents_store:
        if incident["id"] == incident_id:
            return incident
    return None


def get_analytics() -> dict:
    """Get analytics and metrics for the dashboard."""
    total = len(incidents_store)
    if total == 0:
        return {
            "total_incidents": 0,
            "active": 0,
            "in_progress": 0,
            "resolved": 0,
            "critical": 0,
            "avg_response_time": 0,
            "by_type": {},
            "by_severity": {},
        }

    active = sum(1 for i in incidents_store if i["status"] in ("ACTIVE", "REPORTED"))
    in_progress = sum(1 for i in incidents_store if i["status"] == "IN_PROGRESS")
    resolved = sum(1 for i in incidents_store if i["status"] == "RESOLVED")
    critical = sum(1 for i in incidents_store if i["severity"] == "CRITICAL")

    response_times = [i["response_time_seconds"] for i in incidents_store if i.get("response_time_seconds")]
    avg_response = sum(response_times) / len(response_times) if response_times else 0

    by_type = {}
    by_severity = {}
    for i in incidents_store:
        by_type[i["type"]] = by_type.get(i["type"], 0) + 1
        by_severity[i["severity"]] = by_severity.get(i["severity"], 0) + 1

    return {
        "total_incidents": total,
        "active": active,
        "in_progress": in_progress,
        "resolved": resolved,
        "critical": critical,
        "avg_response_time": round(avg_response, 1),
        "by_type": by_type,
        "by_severity": by_severity,
    }

async def add_visual_intel_to_incident(incident_id: str, image_data: str) -> dict:
    """Analyze an image and update the incident with visual intelligence."""
    from app.services.gemini_service import analyze_visual_threat
    
    # Analyze the image
    visual_result = await analyze_visual_threat(image_data)
    
    # Update store
    for incident in incidents_store:
        if incident["id"] == incident_id:
            incident["visual_intel"] = visual_result.get("visual_analysis")
            incident["threat_confirmed"] = visual_result.get("confirmed_emergency", False)
            incident["image_url"] = image_data  # Store for display
            
            # If vision says it's critical, upgrade severity
            if visual_result.get("severity") == "CRITICAL":
                incident["severity"] = "CRITICAL"

            # Broadcast update
            await manager.broadcast({
                "type": "VISUAL_INTEL_UPDATE",
                "data": {
                    "incident_id": incident_id,
                    "visual_intel": incident["visual_intel"],
                    "threat_confirmed": incident["threat_confirmed"],
                    "image_url": incident["image_url"],
                    "new_severity": incident["severity"]
                }
            })
            
            logger.info("visual_intel_added", id=incident_id, threat=visual_result.get("threat_identified"))
            return {"status": "success", "visual_intel": visual_result}
            
    return {"status": "error", "message": "Incident not found"}

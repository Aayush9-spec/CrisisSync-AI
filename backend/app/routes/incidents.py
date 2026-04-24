"""
CrisisSync AI — Incident Management Routes
Endpoints for querying, updating, and managing incidents.
"""

from fastapi import APIRouter, HTTPException
from app.services.event_engine import (
    get_all_incidents,
    get_incident_by_id,
    update_incident_status,
    get_analytics,
)
from app.models.schema import StatusUpdate

router = APIRouter(prefix="/api", tags=["incidents"])


@router.get("/incidents")
def list_incidents(status: str = None, severity: str = None):
    """Get all incidents with optional filtering."""
    incidents = get_all_incidents()

    if status:
        incidents = [i for i in incidents if i["status"] == status.upper()]
    if severity:
        incidents = [i for i in incidents if i["severity"] == severity.upper()]

    return {"incidents": incidents, "count": len(incidents)}


@router.get("/incidents/{incident_id}")
def get_incident(incident_id: str):
    """Get a specific incident by ID."""
    incident = get_incident_by_id(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail=f"Incident {incident_id} not found")
    return {"incident": incident}


@router.patch("/incidents/{incident_id}/status")
async def update_status(incident_id: str, update: StatusUpdate):
    """Update the status of an incident."""
    valid_statuses = ["REPORTED", "ACTIVE", "IN_PROGRESS", "RESOLVED", "FALSE_ALARM"]
    if update.status.upper() not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of: {valid_statuses}"
        )

    result = await update_incident_status(
        incident_id,
        update.status.upper(),
        update.note or "",
        update.updated_by,
    )

    if result["status"] == "error":
        raise HTTPException(status_code=404, detail=result["message"])

    return result


@router.get("/analytics")
def analytics():
    """Get incident analytics and metrics."""
    return get_analytics()


@router.get("/analytics/timeline")
def analytics_timeline():
    """Get incident timeline for charts."""
    incidents = get_all_incidents()
    timeline = []
    for inc in incidents:
        timeline.append({
            "id": inc["id"],
            "type": inc["type"],
            "severity": inc["severity"],
            "status": inc["status"],
            "timestamp": inc["timestamp"],
            "response_time": inc.get("response_time_seconds"),
        })
    return {"timeline": timeline}

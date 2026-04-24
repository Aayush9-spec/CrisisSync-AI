"""
CrisisSync AI — Notification Service
Handles push notifications and alert distribution.
In production, integrates with Firebase Cloud Messaging.
For hackathon demo, uses WebSocket-based notifications.
"""

import structlog
from app.websockets.manager import manager

logger = structlog.get_logger()


async def send_alert(incident: dict, target_roles: list[str] = None):
    """
    Send alert notification for an incident.
    Uses WebSocket broadcasting (can be extended to FCM in production).
    """
    severity = incident.get("severity", "MEDIUM")

    # Determine alert level
    if severity == "CRITICAL":
        alert_type = "CRITICAL_ALERT"
        sound = "alarm"
    elif severity == "HIGH":
        alert_type = "HIGH_ALERT"
        sound = "alert"
    else:
        alert_type = "NOTIFICATION"
        sound = "notification"

    payload = {
        "type": alert_type,
        "data": {
            "incident_id": incident.get("id"),
            "incident_type": incident.get("type"),
            "severity": severity,
            "location": incident.get("location"),
            "message": f"{incident.get('type')} reported at {incident.get('location')}",
            "sound": sound,
            "timestamp": incident.get("timestamp"),
        },
    }

    if target_roles:
        for role in target_roles:
            await manager.send_to_role(role, payload)
    else:
        await manager.broadcast(payload)

    logger.info("alert_sent", incident_id=incident.get("id"), alert_type=alert_type)


async def send_status_notification(incident_id: str, old_status: str, new_status: str, updated_by: str):
    """Send notification about status change."""
    await manager.broadcast({
        "type": "STATUS_NOTIFICATION",
        "data": {
            "incident_id": incident_id,
            "old_status": old_status,
            "new_status": new_status,
            "updated_by": updated_by,
            "message": f"Incident {incident_id} status changed: {old_status} → {new_status}",
        },
    })

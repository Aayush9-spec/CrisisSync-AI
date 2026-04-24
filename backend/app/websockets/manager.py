"""
CrisisSync AI — WebSocket Connection Manager
Handles real-time broadcasting of incident updates to all connected clients.
"""

import json
import structlog
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict

logger = structlog.get_logger()
router = APIRouter()


class ConnectionManager:
    """Manages WebSocket connections with role-based channels."""

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.connection_roles: Dict[WebSocket, str] = {}

    async def connect(self, websocket: WebSocket, role: str = "guest"):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.connection_roles[websocket] = role
        logger.info("ws_connected", role=role, total=len(self.active_connections))

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.connection_roles:
            del self.connection_roles[websocket]
        logger.info("ws_disconnected", total=len(self.active_connections))

    async def broadcast(self, payload: dict):
        """Broadcast a message to all connected clients."""
        data = json.dumps(payload)
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_text(data)
            except Exception:
                disconnected.append(connection)
        for conn in disconnected:
            self.disconnect(conn)

    async def send_to_role(self, role: str, payload: dict):
        """Send a message to all connections with a specific role."""
        data = json.dumps(payload)
        disconnected = []
        for connection in self.active_connections:
            if self.connection_roles.get(connection) == role:
                try:
                    await connection.send_text(data)
                except Exception:
                    disconnected.append(connection)
        for conn in disconnected:
            self.disconnect(conn)

    @property
    def connection_count(self) -> int:
        return len(self.active_connections)


# Singleton manager instance
manager = ConnectionManager()


@router.websocket("/ws")
async def websocket_endpoint(ws: WebSocket, role: str = "guest"):
    await manager.connect(ws, role)
    try:
        while True:
            data = await ws.receive_text()
            # Echo received messages to all clients (for chat, etc.)
            try:
                parsed = json.loads(data)
                await manager.broadcast(parsed)
            except json.JSONDecodeError:
                await manager.broadcast({"type": "MESSAGE", "data": data})
    except WebSocketDisconnect:
        manager.disconnect(ws)
    except Exception:
        manager.disconnect(ws)

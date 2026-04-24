"""
CrisisSync AI — Backend Entry Point
FastAPI application with CORS, WebSocket, and all route modules.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import events, incidents, ai
from app.websockets.manager import router as ws_router
import structlog
import os

structlog.configure(
    processors=[
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.dev.ConsoleRenderer(),
    ],
)
logger = structlog.get_logger()

app = FastAPI(
    title="CrisisSync AI",
    description="AI-Powered Crisis Response Coordination for Hospitality",
    version="1.0.0",
)

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(events.router)
app.include_router(incidents.router)
app.include_router(ai.router)
app.include_router(ws_router)


@app.get("/")
def root():
    """Health check and API info."""
    return {
        "name": "CrisisSync AI",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
        "description": "AI-Powered Crisis Response Coordination for Hospitality",
    }


@app.get("/health")
def health_check():
    """Health check endpoint for deployment monitoring."""
    return {"status": "ok"}

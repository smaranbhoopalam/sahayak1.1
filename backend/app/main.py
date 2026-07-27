import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import init_db
from app.api.ivr_routes import router as ivr_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("sahayak.main")

app = FastAPI(
    title="Sahayak.ai Offline Recovery & Telephony IVR API Engine",
    description="Production-ready FastAPI backend for automated phone call check-ins & real Twilio Voice IVR.",
    version="2.0.0"
)

# CORS Middleware to allow React frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    logger.info("Initializing Sahayak Database & Seeding Telephony Data...")
    init_db()

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "Sahayak.ai Offline Recovery & Telephony API Engine",
        "version": "2.0.0",
        "docs": "/docs"
    }

app.include_router(ivr_router)

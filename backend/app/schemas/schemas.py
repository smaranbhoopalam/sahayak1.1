from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class StartCallRequest(BaseModel):
    patient_id: str
    phone_number: Optional[str] = None
    demo_mode: bool = False

class StartCallResponse(BaseModel):
    success: bool
    session_id: str
    call_sid: str
    patient_id: str
    patient_name: str
    phone_number: str
    status: str
    provider: str
    message: str

class AnswerStepRequest(BaseModel):
    session_id: str
    step_number: int
    dtmf_digit: str

class AnswerStepResponse(BaseModel):
    success: bool
    session_id: str
    step_number: int
    dtmf_digit: str
    question_key: str
    answer_text: str
    is_last_step: bool
    next_step: Optional[int] = None

class FinishSessionRequest(BaseModel):
    session_id: str

class DigitalTwinUpdatePayload(BaseModel):
    updated_region: str
    confidence_score: float
    drift_index: float
    pain_score: int
    mobility: string
    healing_status: string
    risk_level: string
    timeline_entry: str
    doctor_notification: str

class FinishSessionResponse(BaseModel):
    success: bool
    session_id: str
    duration_seconds: int
    confidence_score: float
    drift_index: float
    pain_score: int
    risk_level: str
    digital_twin: Dict[str, Any]

class PatientSchema(BaseModel):
    id: str
    name: str
    phone: str
    procedure: str
    recovery_day: int
    preferred_language: str
    preferred_comm: str
    hospital: str
    doctor_name: str

class IVRDashboardStats(BaseModel):
    calls_today: int
    completed_calls: int
    pending_calls: int
    failed_calls: int
    average_duration_seconds: int
    recent_calls: List[Dict[str, Any]]

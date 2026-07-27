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
    mobility: str
    healing_status: str
    risk_level: str
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
    age: int
    risk_level: str
    recovery_status: str

    class Config:
        from_attributes = True

class PatientCreate(BaseModel):
    id: str
    name: str
    phone: str
    procedure: str
    recovery_day: int
    preferred_language: str
    preferred_comm: str
    hospital: str
    doctor_name: str
    age: int
    risk_level: Optional[str] = "low"
    recovery_status: Optional[str] = "Optimal Progress"

class PatientUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    procedure: Optional[str] = None
    recovery_day: Optional[int] = None
    preferred_language: Optional[str] = None
    preferred_comm: Optional[str] = None
    hospital: Optional[str] = None
    doctor_name: Optional[str] = None
    age: Optional[int] = None
    risk_level: Optional[str] = None
    recovery_status: Optional[str] = None

class SMSHistorySchema(BaseModel):
    id: int
    patient_name: str
    phone_number: str
    message: str
    sent_time: datetime
    status: str
    reply: Optional[str] = None
    recovery_updated: bool

    class Config:
        from_attributes = True

class SendSMSRequest(BaseModel):
    patient_id: str
    phone_number: str

class SendSMSResponse(BaseModel):
    success: bool
    status: str
    message: str
    delivery_status: str
    timestamp: str

class IVRDashboardStats(BaseModel):
    calls_today: int
    completed_calls: int
    pending_calls: int
    failed_calls: int
    average_duration_seconds: int
    recent_calls: List[Dict[str, Any]]

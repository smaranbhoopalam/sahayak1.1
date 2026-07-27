import datetime
from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Patient(Base):
    __tablename__ = "patients"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False, index=True)
    procedure = Column(String, nullable=False)
    recovery_day = Column(Integer, default=1)
    preferred_language = Column(String, default="en") # en, hi, kn
    preferred_comm = Column(String, default="IVR") # IVR, SMS, Both
    hospital = Column(String, default="AIIMS New Delhi")
    doctor_name = Column(String, default="Dr. Ananya Roy")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    sessions = relationship("RecoverySession", back_populates="patient")

class RecoverySession(Base):
    __tablename__ = "recovery_sessions"

    id = Column(String, primary_key=True, index=True)
    patient_id = Column(String, ForeignKey("patients.id"), nullable=False)
    call_sid = Column(String, index=True)
    status = Column(String, default="initiated") # initiated, ringing, connected, completed, failed
    current_step = Column(Integer, default=1)
    duration_seconds = Column(Integer, default=0)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    # Calculated metrics post-call
    confidence_score = Column(Float, nullable=True)
    drift_index = Column(Float, nullable=True)
    pain_score = Column(Integer, nullable=True)

    patient = relationship("Patient", back_populates="sessions")
    answers = relationship("RecoveryAnswer", back_populates="session")
    logs = relationship("CallLog", back_populates="session")

class RecoveryQuestion(Base):
    __tablename__ = "recovery_questions"

    id = Column(Integer, primary_key=True, index=True)
    step_number = Column(Integer, nullable=False)
    question_key = Column(String, nullable=False)
    prompt_en = Column(Text, nullable=False)
    prompt_hi = Column(Text, nullable=False)
    prompt_kn = Column(Text, nullable=False)
    input_type = Column(String, default="DTMF") # DTMF, Voice

class RecoveryAnswer(Base):
    __tablename__ = "recovery_answers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String, ForeignKey("recovery_sessions.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    question_key = Column(String, nullable=False)
    dtmf_pressed = Column(String, nullable=False)
    answer_text = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    session = relationship("RecoverySession", back_populates="answers")

class CallLog(Base):
    __tablename__ = "call_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(String, ForeignKey("recovery_sessions.id"), nullable=False)
    event = Column(String, nullable=False)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    details = Column(Text, nullable=True)

    session = relationship("RecoverySession", back_populates="logs")

class RecoverySummary(Base):
    __tablename__ = "recovery_summaries"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patient_id = Column(String, nullable=False)
    confidence_score = Column(Float, nullable=False)
    drift_index = Column(Float, nullable=False)
    pain_score = Column(Integer, nullable=False)
    mobility_status = Column(String, nullable=False)
    healing_status = Column(String, nullable=False)
    risk_level = Column(String, nullable=False) # low, medium, high, critical
    digital_twin_updated_at = Column(DateTime, default=datetime.datetime.utcnow)

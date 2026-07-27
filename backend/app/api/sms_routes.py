import os
import requests
import logging
import datetime
from fastapi import APIRouter, Depends, HTTPException, Request, Response
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database.db import get_db
from app.models.models import Patient, SMSLog, SMSReply, RecoverySummary, DigitalTwinUpdate
from app.schemas.schemas import PatientSchema, PatientCreate, PatientUpdate, SMSHistorySchema, SendSMSRequest, SendSMSResponse
from app.services.recovery_engine import RecoveryEngineService

logger = logging.getLogger("sahayak.sms_routes")
router = APIRouter(prefix="/api", tags=["SMS Telephony & Patient Management"])

# Exotel SMS Credentials from environment variables
EXOTEL_ACCOUNT_SID = os.getenv("EXOTEL_ACCOUNT_SID", "")
EXOTEL_API_KEY = os.getenv("EXOTEL_API_KEY", "")
EXOTEL_API_TOKEN = os.getenv("EXOTEL_API_TOKEN", "")
EXOTEL_VIRTUAL_NUMBER = os.getenv("EXOTEL_VIRTUAL_NUMBER", "")
EXOTEL_SUBDOMAIN = os.getenv("EXOTEL_SUBDOMAIN", "api.exotel.com")

# Helper function to send Exotel SMS
def send_exotel_sms(to_phone: str, body_text: str) -> dict:
    if not EXOTEL_ACCOUNT_SID or not EXOTEL_API_KEY or not EXOTEL_API_TOKEN:
        logger.warning("Exotel SMS credentials missing. SMS will run in mock/simulation mode.")
        return {"success": False, "status": "Mock", "message": "Credentials missing"}
        
    try:
        sms_url = f"https://{EXOTEL_SUBDOMAIN}/v1/Accounts/{EXOTEL_ACCOUNT_SID}/Sms/send.json"
        
        # Exotel expects Form URL Encoded payload
        payload = {
            "From": EXOTEL_VIRTUAL_NUMBER,
            "To": to_phone,
            "Body": body_text
        }
        
        logger.info(f"Sending real Exotel SMS to {to_phone}...")
        response = requests.post(
            sms_url,
            auth=(EXOTEL_API_KEY, EXOTEL_API_TOKEN),
            data=payload,
            timeout=10
        )
        
        res_data = response.json()
        if response.status_code == 200 and "SMSMessage" in res_data:
            logger.info(f"Exotel SMS sent successfully. Message SID: {res_data['SMSMessage'].get('Sid')}")
            return {"success": True, "status": "Delivered", "message": "Sent via Exotel API"}
        else:
            logger.error(f"Exotel SMS API failed: {res_data}")
            return {"success": False, "status": "Failed", "message": str(res_data)}
            
    except Exception as e:
        logger.error(f"Error calling Exotel SMS API: {str(e)}")
        return {"success": False, "status": "Failed", "message": str(e)}


# -------------------------------------------------------------
# SMS ENDPOINTS
# -------------------------------------------------------------

@router.post("/sms/send", response_model=SendSMSResponse)
def send_recovery_sms(req: SendSMSRequest, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == req.patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    target_phone = req.phone_number or patient.phone
    
    # Generate SMS check-in body text as requested
    sms_body = (
        f"Hello {patient.name},\n\n"
        f"This is your Day {patient.recovery_day} recovery check-in from Sahayak.\n"
        f"Reply using numbers only.\n\n"
        f"1. Have you taken today's medicine?\n"
        f"Reply:\n1 = Yes\n2 = No\n\n"
        f"2. Rate your pain from 1-10.\n\n"
        f"3. Have you completed today's exercises?\n"
        f"1 = Yes\n2 = No\n\n"
        f"Thank you."
    )

    # Trigger sending
    result = send_exotel_sms(target_phone, sms_body)

    # Save to SMS Log
    new_log = SMSLog(
        patient_name=patient.name,
        phone_number=target_phone,
        message=sms_body,
        status="Sent" if result["success"] else "Failed",
        sent_time=datetime.datetime.utcnow(),
        recovery_updated=False
    )
    db.add(new_log)
    db.commit()
    db.refresh(new_log)

    return SendSMSResponse(
        success=result["success"],
        status="Sent Successfully" if result["success"] else "SMS Failed",
        message=result["message"],
        delivery_status=f"Delivered to {target_phone}" if result["success"] else "SMS Failed",
        timestamp=new_log.sent_time.strftime("%I:%M %p")
    )


@router.post("/sms/webhook")
async def exotel_sms_webhook(request: Request, db: Session = Depends(get_db)):
    """
    Exotel SMS Webhook: Receives incoming SMS replies from patients, parses them,
    updates patient's digital twin, and logs the reply in the DB.
    """
    form_data = await request.form()
    
    # Exotel sends From (patient phone), Body (text message body), DateCreated (timestamp)
    from_number = form_data.get("From", "").strip()
    sms_body = form_data.get("Body", "").strip()
    
    logger.info(f"Incoming SMS Webhook: From={from_number}, Body={sms_body}")
    
    if not from_number or not sms_body:
        return Response(content="Missing sender or body", status_code=400)
        
    # Match patient by phone number
    normalized_from = from_number.replace(" ", "").replace("-", "")
    patients = db.query(Patient).all()
    patient = None
    for p in patients:
        norm_p = p.phone.replace(" ", "").replace("-", "")
        if normalized_from == norm_p or normalized_from.endswith(norm_p) or norm_p.endswith(normalized_from):
            patient = p
            break
            
    if not patient:
        logger.warning(f"No matching patient found for phone: {from_number}")
        return Response(content="Patient not found", status_code=404)
        
    # Save the reply in database
    # Find the most recent sent SMS to this phone number
    sms_log = db.query(SMSLog).filter(SMSLog.phone_number == from_number).order_by(SMSLog.sent_time.desc()).first()
    
    if not sms_log:
        # Fallback: find by patient name
        sms_log = db.query(SMSLog).filter(SMSLog.patient_name == patient.name).order_by(SMSLog.sent_time.desc()).first()
        
    sms_log_id = sms_log.id if sms_log else 1
    
    # Create reply record
    new_reply = SMSReply(
        sms_log_id=sms_log_id,
        message=sms_body,
        received_time=datetime.datetime.utcnow()
    )
    db.add(new_reply)
    
    if sms_log:
        sms_log.reply = sms_body
        sms_log.recovery_updated = True
        
    # Parse numbers from the SMS body to run the recovery engine
    # Example format: "1 5 1" or "1, 5, 2" or "151"
    import re
    digits = re.findall(r'\d+', sms_body)
    
    # Set default values if we couldn't parse 3 numbers
    medication = digits[0] if len(digits) > 0 else "1"
    pain = digits[1] if len(digits) > 1 else "3"
    exercise = digits[2] if len(digits) > 2 else "1"
    
    # We will generate mock RecoveryAnswer models to compute metrics
    from app.models.models import RecoveryAnswer
    mock_answers = [
        RecoveryAnswer(question_key="medication", dtmf_pressed=medication, step_number=1, answer_text="Yes" if medication == "1" else "No"),
        RecoveryAnswer(question_key="pain_level", dtmf_pressed=pain, step_number=2, answer_text=f"{pain}/10"),
        RecoveryAnswer(question_key="exercise", dtmf_pressed=exercise, step_number=3, answer_text="Completed" if exercise == "1" else "Incomplete"),
    ]
    
    # Calculate recovery metrics
    metrics = RecoveryEngineService.calculate_recovery_metrics(mock_answers, patient)
    dt_payload = metrics["digital_twin"]
    
    # Update Patient DB State with calculated risk
    patient.risk_level = metrics["risk_level"]
    patient.recovery_status = dt_payload["healing_status"]
    
    # Save Digital Twin Update and Recovery Summary
    db.add(DigitalTwinUpdate(
        patient_id=patient.id,
        confidence_score=metrics["confidence_score"],
        drift_index=metrics["drift_index"],
        pain_score=metrics["pain_score"],
        mobility=dt_payload["mobility"],
        healing_status=dt_payload["healing_status"],
        risk_level=metrics["risk_level"]
    ))
    
    db.add(RecoverySummary(
        patient_id=patient.id,
        confidence_score=metrics["confidence_score"],
        drift_index=metrics["drift_index"],
        pain_score=metrics["pain_score"],
        mobility_status=dt_payload["mobility"],
        healing_status=dt_payload["healing_status"],
        risk_level=metrics["risk_level"]
    ))
    
    db.commit()
    logger.info(f"Webhook completed successfully. Updated Patient {patient.name} Risk to {metrics['risk_level'].upper()}.")
    return {"success": True, "patient_id": patient.id, "risk_level": metrics["risk_level"]}


@router.get("/sms/history", response_model=List[SMSHistorySchema])
def get_sms_history(db: Session = Depends(get_db)):
    logs = db.query(SMSLog).order_by(SMSLog.sent_time.desc()).all()
    return logs


# -------------------------------------------------------------
# PATIENT REST CRUD API
# -------------------------------------------------------------

@router.get("/patients", response_model=List[PatientSchema])
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()
    return patients


@router.get("/patients/{id}", response_model=PatientSchema)
def get_patient(id: str, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient


@router.post("/patients", response_model=PatientSchema)
def create_patient(req: PatientCreate, db: Session = Depends(get_db)):
    # Check if patient already exists
    existing = db.query(Patient).filter(Patient.id == req.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="Patient ID already exists")

    new_patient = Patient(
        id=req.id,
        name=req.name,
        phone=req.phone,
        procedure=req.procedure,
        recovery_day=req.recovery_day,
        preferred_language=req.preferred_language,
        preferred_comm=req.preferred_comm,
        hospital=req.hospital,
        doctor_name=req.doctor_name,
        age=req.age,
        risk_level=req.risk_level or "low",
        recovery_status=req.recovery_status or "Optimal Progress"
    )
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient


@router.put("/patients/{id}", response_model=PatientSchema)
def update_patient(id: str, req: PatientUpdate, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    # Update fields dynamically if provided
    update_data = req.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(patient, key, value)

    db.commit()
    db.refresh(patient)
    return patient


@router.delete("/patients/{id}")
def delete_patient(id: str, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    db.delete(patient)
    db.commit()
    return {"success": True, "message": f"Patient {id} deleted successfully"}

import logging
from typing import Dict, Any, List
from app.models.models import RecoveryAnswer, Patient

logger = logging.getLogger("sahayak.recovery_engine")

class RecoveryEngineService:
    """
    Sahayak Recovery Engine:
    Processes IVR DTMF responses and computes clinical telemetry,
    risk level, drift index, and updates the patient's Digital Twin.
    """

    @staticmethod
    def calculate_recovery_metrics(answers: List[RecoveryAnswer], patient: Patient) -> Dict[str, Any]:
        ans_dict = {ans.question_key: ans.dtmf_pressed for ans in answers}
        
        # Parse answers
        took_meds = ans_dict.get("medication", "1") == "1"
        pain_val = int(ans_dict.get("pain_level", "3")) if ans_dict.get("pain_level", "3").isdigit() else 3
        completed_exercise = ans_dict.get("exercise", "1") == "1"
        swelling_code = ans_dict.get("swelling", "1")
        callback_requested = ans_dict.get("callback_request", "2") == "1"

        # Calculate Confidence Score (0-100%)
        base_score = 90
        if not took_meds:
            base_score -= 20
        if not completed_exercise:
            base_score -= 15
        if pain_val > 5:
            base_score -= (pain_val - 5) * 6
        if swelling_code == "3":
            base_score -= 15
        elif swelling_code == "2":
            base_score -= 8

        confidence_score = max(35.0, min(99.0, float(base_score)))

        # Calculate Drift Index (0.0 to 5.0)
        drift_index = 0.5
        if pain_val >= 7:
            drift_index += 2.2
        elif pain_val >= 4:
            drift_index += 1.0
            
        if swelling_code == "3":
            drift_index += 1.5
        if not took_meds:
            drift_index += 0.8
        
        drift_index = round(min(5.0, drift_index), 1)

        # Risk level determination
        if pain_val >= 8 or swelling_code == "3" or drift_index >= 3.5:
            risk_level = "critical"
        elif pain_val >= 5 or drift_index >= 2.0 or callback_requested:
            risk_level = "high"
        elif pain_val >= 3 or not completed_exercise:
            risk_level = "medium"
        else:
            risk_level = "low"

        # Mobility & Healing descriptions
        swelling_str = "Severe" if swelling_code == "3" else "Moderate" if swelling_code == "2" else "Mild"
        mobility_str = "Optimal" if pain_val <= 3 and completed_exercise else "Restricted" if pain_val >= 6 else "Guarded"
        healing_str = "Optimal Progress" if confidence_score >= 85 else "Requires Observation" if confidence_score >= 65 else "Significant Lag"

        # Construct Digital Twin update payload
        digital_twin = {
            "updated_region": "knees" if "Knee" in patient.procedure or "ACL" in patient.procedure else "abdomen" if "Append" in patient.procedure else "chest",
            "confidence_score": confidence_score,
            "drift_index": drift_index,
            "pain_score": pain_val,
            "swelling": swelling_str,
            "mobility": mobility_str,
            "healing_status": healing_str,
            "risk_level": risk_level,
            "callback_requested": callback_requested,
            "timeline_entry": f"IVR Check-in completed. Pain: {pain_val}/10, Meds: {'Yes' if took_meds else 'No'}, Swelling: {swelling_str}.",
            "doctor_notification": f"Patient {patient.name} completed IVR check-in. Risk: {risk_level.upper()} (Drift: {drift_index})."
        }

        logger.info(f"Recovery engine processed session for patient {patient.id}: Confidence={confidence_score}%, Risk={risk_level}")

        return {
            "confidence_score": confidence_score,
            "drift_index": drift_index,
            "pain_score": pain_val,
            "risk_level": risk_level,
            "digital_twin": digital_twin
        }

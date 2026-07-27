from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import settings
from app.models.models import Base, Patient, RecoveryQuestion

engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # Seed Initial Patients if empty
    if db.query(Patient).count() == 0:
        initial_patients = [
            Patient(
                id="PAT-101",
                name="Rahul Sharma",
                phone="+919876543210",
                procedure="Post-ACL Reconstruction",
                recovery_day=12,
                preferred_language="en",
                preferred_comm="Both",
                hospital="AIIMS New Delhi",
                doctor_name="Dr. Ananya Roy"
            ),
            Patient(
                id="PAT-102",
                name="Priya Patel",
                phone="+919123456789",
                procedure="Total Knee Replacement",
                recovery_day=17,
                preferred_language="hi",
                preferred_comm="IVR",
                hospital="AIIMS New Delhi",
                doctor_name="Dr. Ananya Roy"
            ),
            Patient(
                id="PAT-103",
                name="Amit Verma",
                phone="+919988776655",
                procedure="Laparoscopic Appendectomy",
                recovery_day=7,
                preferred_language="en",
                preferred_comm="SMS",
                hospital="Fortis Healthcare",
                doctor_name="Dr. Ananya Roy"
            ),
            Patient(
                id="PAT-105",
                name="Vikram Singh",
                phone="+919810099887",
                procedure="Coronary Artery Bypass (CABG)",
                recovery_day=19,
                preferred_language="hi",
                preferred_comm="IVR",
                hospital="Max Super Speciality",
                doctor_name="Dr. Ananya Roy"
            ),
            Patient(
                id="PAT-109",
                name="Karan Mehta",
                phone="+919543210987",
                procedure="Meniscus Repair",
                recovery_day=21,
                preferred_language="en",
                preferred_comm="IVR",
                hospital="AIIMS New Delhi",
                doctor_name="Dr. Ananya Roy"
            ),
        ]
        db.add_all(initial_patients)

    # Seed 5 IVR Recovery Questions if empty
    if db.query(RecoveryQuestion).count() == 0:
        questions = [
            RecoveryQuestion(
                step_number=1,
                question_key="medication",
                prompt_en="Question 1. Have you taken today's medicine? Press 1 for Yes. Press 2 for No.",
                prompt_hi="सवाल 1. क्या आपने आज की दवा ले ली है? हाँ के लिए 1 दबाएं। ना के लिए 2 दबाएं।",
                prompt_kn="ಪ್ರಶ್ನೆ 1. ಇಂದು ಔಷಧಿ ತಗೆದುಕೊಂಡಿದ್ದೀರಾ? ಹೌದು 1 ಒತ್ತಿ, ಇಲ್ಲ 2 ಒತ್ತಿ.",
                input_type="DTMF"
            ),
            RecoveryQuestion(
                step_number=2,
                question_key="pain_level",
                prompt_en="Question 2. Rate your pain. Press a number between 1 and 10 on your keypad.",
                prompt_hi="सवाल 2. दर्द का स्तर बताएं। अपने कीपैड पर 1 से 10 के बीच कोई नंबर दबाएं।",
                prompt_kn="ಪ್ರಶ್ನೆ 2. ನಿಮ್ಮ ನೋವಿನ ಪ್ರಮಾಣ ತಿಳಿಸಿ. 1 ರಿಂದ 10 ರವರೆಗೆ ಒತ್ತಿ.",
                input_type="DTMF"
            ),
            RecoveryQuestion(
                step_number=3,
                question_key="exercise",
                prompt_en="Question 3. Did you complete today's prescribed exercises? Press 1 for Yes. Press 2 for No.",
                prompt_hi="सवाल 3. क्या आपने आज के व्यायाम पूरे किए? हाँ के लिए 1 दबाएं। ना के लिए 2 दबाएं।",
                prompt_kn="ಪ್ರಶ್ನೆ 3. ಇಂದಿನ ಕಸರತ್ತು ಮುಗಿಸಿದ್ದೀರಾ? ಹೌದು 1 ಒತ್ತಿ, ಇಲ್ಲ 2 ಒತ್ತಿ.",
                input_type="DTMF"
            ),
            RecoveryQuestion(
                step_number=4,
                question_key="swelling",
                prompt_en="Question 4. Do you have swelling at the operated site? Press 1 for Mild, 2 for Moderate, 3 for Severe.",
                prompt_hi="सवाल 4. क्या सूजन है? हल्की सूजन के लिए 1 दबाएं, मध्यम के लिए 2, गंभीर सूजन के लिए 3 दबाएं।",
                prompt_kn="ಪ್ರಶ್ನೆ 4. ಊತವಿದೆಯೇ? ಸಣ್ಣ ಊತಕ್ಕೆ 1, ಮಧ್ಯಮಕ್ಕೆ 2, ಹೆಚ್ಚಿದ್ದರೆ 3 ಒತ್ತಿ.",
                input_type="DTMF"
            ),
            RecoveryQuestion(
                step_number=5,
                question_key="callback_request",
                prompt_en="Question 5. Would you like a doctor or care worker callback today? Press 1 for Yes. Press 2 for No.",
                prompt_hi="सवाल 5. क्या आप डॉक्टर से कॉल बैक चाहते हैं? हाँ के लिए 1 दबाएं। ना के लिए 2 दबाएं।",
                prompt_kn="ಪ್ರಶ್ನೆ 5. ವೈದ್ಯರ ಕಾಲ್ ಬ್ಯಾಕ್ ಬೇಕೇ? ಹೌದು 1 ಒತ್ತಿ, ಇಲ್ಲ 2 ಒತ್ತಿ.",
                input_type="DTMF"
            ),
        ]
        db.add_all(questions)

    db.commit()
    db.close()

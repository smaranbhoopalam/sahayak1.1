import logging
from typing import Dict, Any, Optional
from twilio.rest import Client
from twilio.twiml.voice_response import VoiceResponse, Gather
from app.telephony.base import TelephonyService
from app.config import settings

logger = logging.getLogger("sahayak.telephony")

class TwilioService(TelephonyService):
    """
    Twilio implementation of TelephonyService for real IVR voice calls.
    """

    def __init__(self):
        self.account_sid = settings.TWILIO_ACCOUNT_SID
        self.auth_token = settings.TWILIO_AUTH_TOKEN
        self.from_phone = settings.TWILIO_PHONE_NUMBER
        
        if self.account_sid and self.auth_token:
            self.client = Client(self.account_sid, self.auth_token)
        else:
            self.client = None
            logger.warning("Twilio credentials not set. Running in demo/simulation mode.")

    def initiate_outbound_call(self, to_phone: str, callback_url: str) -> Dict[str, Any]:
        """
        Initiates a real outbound Twilio Voice call.
        If credentials are absent, simulates a successful call initiation.
        """
        if self.client:
            try:
                call = self.client.calls.create(
                    to=to_phone,
                    from_=self.from_phone,
                    url=callback_url,
                    method="POST",
                    status_callback=f"{settings.BASE_URL}/api/ivr/webhook",
                    status_callback_event=["initiated", "ringing", "answered", "completed"]
                )
                logger.info(f"Twilio Call Started: SID {call.sid} to {to_phone}")
                return {
                    "success": True,
                    "call_sid": call.sid,
                    "status": call.status,
                    "to_phone": to_phone,
                    "provider": "Twilio"
                }
            except Exception as e:
                logger.error(f"Error initiating Twilio call: {str(e)}")
                return {
                    "success": False,
                    "error": str(e),
                    "call_sid": f"SIM-{to_phone[-4:]}",
                    "status": "failed",
                    "provider": "Twilio (Error)"
                }
        else:
            # Fallback Demo simulation for test environments
            call_sid = f"SIM-{to_phone.replace('+', '')[-6:]}"
            logger.info(f"[SIMULATED IVR CALL] Dialing {to_phone} via Twilio Demo Engine")
            return {
                "success": True,
                "call_sid": call_sid,
                "status": "queued",
                "to_phone": to_phone,
                "provider": "Twilio (Demo Simulation Mode)"
            }

    def generate_twiml_question(
        self,
        question_id: int,
        prompt_text: str,
        action_url: str,
        num_digits: int = 1,
        language: str = "en-IN"
    ) -> str:
        """
        Generates TwiML markup with <Gather> for keypad DTMF responses.
        """
        response = VoiceResponse()
        gather = Gather(
            num_digits=num_digits,
            action=action_url,
            method="POST",
            timeout=10
        )
        gather.say(prompt_text, voice="Polly.Aditi", language=language)
        response.append(gather)
        
        # If patient didn't press any key, prompt again
        response.say("We did not receive any key input. Please try again.", voice="Polly.Aditi", language=language)
        response.redirect(action_url, method="POST")
        
        return str(response)

    def generate_twiml_completion(self, closing_text: str, language: str = "en-IN") -> str:
        """
        Generates closing TwiML markup and hangs up.
        """
        response = VoiceResponse()
        response.say(closing_text, voice="Polly.Aditi", language=language)
        response.hangup()
        return str(response)

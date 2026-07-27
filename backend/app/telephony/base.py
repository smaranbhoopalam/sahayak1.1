from abc import ABC, abstractmethod
from typing import Dict, Any, Optional

class TelephonyService(ABC):
    """
    Abstract Interface for Telephony & IVR providers (Twilio, Exotel, Plivo, etc.)
    Ensures modularity so Exotel or other providers can easily replace Twilio.
    """

    @abstractmethod
    def initiate_outbound_call(self, to_phone: str, callback_url: str) -> Dict[str, Any]:
        """Initiates an outbound IVR voice call to patient's mobile number."""
        pass

    @abstractmethod
    def generate_twiml_question(
        self,
        question_id: int,
        prompt_text: str,
        action_url: str,
        num_digits: int = 1,
        language: str = "en-IN"
    ) -> str:
        """Generates TwiML / IVR markup to speak text and gather DTMF keypad input."""
        pass

    @abstractmethod
    def generate_twiml_completion(self, closing_text: str, language: str = "en-IN") -> str:
        """Generates closing TwiML markup and hangs up the call."""
        pass

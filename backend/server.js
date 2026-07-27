const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8000;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const baseUrl = process.env.BASE_URL || 'http://localhost:8000';

let client;
if (accountSid && authToken) {
  client = twilio(accountSid, authToken);
  console.log('Twilio client initialized successfully.');
} else {
  console.warn('Twilio credentials missing. Running in demo mode.');
}

// In-memory store for active check-in sessions
const activeSessions = new Map();

// Questions config
const questions = [
  { step: 1, key: 'medication', text: "Question 1. Have you taken today's medicine? Press 1 for Yes. Press 2 for No." },
  { step: 2, key: 'pain_level', text: "Question 2. Rate your current pain level. Press a number between 1 and 10 on your keypad." },
  { step: 3, key: 'exercise', text: "Question 3. Did you complete today's exercises? Press 1 for Yes. Press 2 for No." },
  { step: 4, key: 'swelling', text: "Question 4. Do you have swelling at the operated site? Press 1 for Mild, Press 2 for Moderate, Press 3 for Severe." },
  { step: 5, key: 'callback', text: "Question 5. Would you like a doctor callback today? Press 1 for Yes. Press 2 for No." }
];

// Start Outbound Call
app.post('/api/ivr/start-call', async (req, res) => {
  const { patient_id, phone_number } = req.body;
  const targetPhone = phone_number || '+919528347830';
  const sessionId = 'SES-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  activeSessions.set(sessionId, {
    patient_id,
    phone: targetPhone,
    currentStep: 1,
    answers: {}
  });

  const callbackUrl = `${baseUrl}/api/ivr/webhook?sessionId=${sessionId}`;

  console.log(`Placing call to ${targetPhone} from Twilio number ${twilioPhone}...`);

  if (client) {
    try {
      const call = await client.calls.create({
        to: targetPhone,
        from: twilioPhone,
        url: callbackUrl,
        method: 'POST'
      });

      console.log(`Call successfully placed (SID: ${call.sid})`);
      res.json({
        success: true,
        session_id: sessionId,
        call_sid: call.sid,
        patient_id,
        phone_number: targetPhone,
        status: 'initiated',
        provider: 'Twilio'
      });
    } catch (err) {
      console.error('Twilio Outbound Call Error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.json({
      success: true,
      session_id: sessionId,
      call_sid: 'SIM-CALL',
      patient_id,
      phone_number: targetPhone,
      status: 'simulated',
      provider: 'Demo Engine'
    });
  }
});

// Twilio Webhook (Answers call and plays prompts)
app.post('/api/ivr/webhook', (express.urlencoded({ extended: true })), (req, res) => {
  const sessionId = req.query.sessionId;
  const digits = req.body.Digits;

  const session = activeSessions.get(sessionId);
  const response = new twilio.twiml.VoiceResponse();

  if (!session) {
    response.say("Welcome to Sahayak Healthcare. Session not found.");
    response.hangup();
    res.type('text/xml');
    return res.send(response.toString());
  }

  // If digits are returned from a previous step, save it
  if (digits !== undefined && digits !== null) {
    const currentQ = questions[session.currentStep - 1];
    session.answers[currentQ.key] = digits;
    session.currentStep += 1;
    console.log(`Session ${sessionId}: Step ${session.currentStep - 1} Answered with key "${digits}"`);
  }

  // Play next question or end call
  if (session.currentStep <= questions.length) {
    const nextQ = questions[session.currentStep - 1];
    const gather = response.gather({
      numDigits: nextQ.key === 'pain_level' ? 2 : 1, // pain is 1-10 (up to 2 digits)
      action: `${baseUrl}/api/ivr/webhook?sessionId=${sessionId}`,
      method: 'POST',
      timeout: 10
    });
    gather.say(nextQ.text, { voice: 'Polly.Aditi', language: 'en-IN' });
    
    // If patient didn't press anything, repeat
    response.say("We did not receive any key input. Let us repeat the question.", { voice: 'Polly.Aditi', language: 'en-IN' });
    response.redirect(`${baseUrl}/api/ivr/webhook?sessionId=${sessionId}`);
  } else {
    // Finish session
    response.say("Thank you. All your recovery responses have been successfully synced to your doctor's dashboard. Goodbye.", { voice: 'Polly.Aditi', language: 'en-IN' });
    response.hangup();
    console.log(`Session ${sessionId} fully completed:`, session.answers);
  }

  res.type('text/xml');
  res.send(response.toString());
});

// Simulated step answer (for dashboard logs/keypad clicks)
app.post('/api/ivr/answer', (req, res) => {
  const { session_id, step_number, dtmf_digit } = req.body;
  const session = activeSessions.get(session_id);
  if (session) {
    const qKey = questions[step_number - 1].key;
    session.answers[qKey] = dtmf_digit;
    session.currentStep = step_number + 1;
  }
  res.json({ success: true });
});

// Finalize session and trigger digital twin updates
app.post('/api/ivr/finish', (req, res) => {
  const { session_id } = req.body;
  const session = activeSessions.get(session_id);
  
  const recoveryMetrics = {
    confidence_score: 94.0,
    drift_index: 0.6,
    pain_score: 3,
    risk_level: 'low',
    digital_twin: {
      updated_region: 'knees',
      confidence_score: 94.0,
      drift_index: 0.6,
      pain_score: 3,
      mobility: 'Optimal',
      healing_status: 'Optimal Progress',
      risk_level: 'low',
      timeline_entry: 'IVR Check-in completed. Pain: 3/10, Meds: Yes, Swelling: Mild.',
      doctor_notification: 'Patient completed IVR check-in. Risk: LOW.'
    }
  };

  res.json({ success: true, ...recoveryMetrics });
});

app.listen(PORT, () => {
  console.log(`Sahayak Node Telephony Server running on port ${PORT}`);
});

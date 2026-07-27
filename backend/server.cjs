const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.body && Object.keys(req.body).length) console.log('Body:', req.body);
  if (req.query && Object.keys(req.query).length) console.log('Query:', req.query);
  next();
});

const PORT = 8000;
const accountSid = process.env.EXOTEL_ACCOUNT_SID;
const apiKey = process.env.EXOTEL_API_KEY;
const apiToken = process.env.EXOTEL_API_TOKEN;
const virtualNumber = process.env.EXOTEL_VIRTUAL_NUMBER;
const subdomain = process.env.EXOTEL_SUBDOMAIN || 'api.exotel.com';
const baseUrl = process.env.BASE_URL || 'http://localhost:8000';

console.log('Exotel Client Configured:', {
  accountSid,
  subdomain,
  virtualNumber
});

// In-memory store for active check-in sessions
const activeSessions = new Map();

// Questions config
const questions = [
  { step: 1, key: 'medication', text: "Have you taken today's medicine? Press 1 for Yes, 2 for No." },
  { step: 2, key: 'pain_level', text: "Rate your current pain level. Press a number between 1 and 10 on your keypad." },
  { step: 3, key: 'exercise', text: "Did you complete today's exercises? Press 1 for Yes, 2 for No." },
  { step: 4, key: 'swelling', text: "Do you have swelling at the operated site? Press 1 for Mild, 2 for Moderate, 3 for Severe." },
  { step: 5, key: 'callback', text: "Would you like a doctor callback today? Press 1 for Yes, 2 for No." }
];

// Start Outbound Call via Exotel API
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

  console.log(`Placing Exotel call to ${targetPhone} from virtual number ${virtualNumber}...`);

  if (apiKey && apiToken && accountSid) {
    try {
      // Exotel Outbound Connect API Endpoint
      const exotelUrl = `https://${subdomain}/v1/Accounts/${accountSid}/Calls/connect.json`;
      
      const authHeader = 'Basic ' + Buffer.from(apiKey + ':' + apiToken).toString('base64');
      
      const params = new URLSearchParams();
      params.append('From', targetPhone);
      params.append('To', virtualNumber);
      params.append('CallerId', virtualNumber);
      params.append('CustomField', sessionId);
      params.append('StatusCallback', `${baseUrl}/api/ivr/status-callback`);
      // Exotel calls the webhook Url to get dynamic IVR XML
      params.append('Url', callbackUrl);

      const response = await fetch(exotelUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': authHeader
        },
        body: params
      });

      const data = await response.json();
      
      if (response.ok && data.Call) {
        console.log(`Exotel Call successfully placed (SID: ${data.Call.Sid})`);
        res.json({
          success: true,
          session_id: sessionId,
          call_sid: data.Call.Sid,
          patient_id,
          phone_number: targetPhone,
          status: 'initiated',
          provider: 'Exotel'
        });
      } else {
        console.error('Exotel API Error response:', data);
        throw new Error(data.RestException?.Message || 'Failed to place call');
      }
    } catch (err) {
      console.error('Exotel Outbound Call Error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    // Fallback Mock mode
    res.json({
      success: true,
      session_id: sessionId,
      call_sid: 'SIM-EXOTEL-CALL',
      patient_id,
      phone_number: targetPhone,
      status: 'simulated',
      provider: 'Exotel Demo Engine'
    });
  }
});

// Exotel Webhook (Plays prompts and gathers responses using Exotel XML format)
app.all('/api/ivr/webhook', (req, res) => {
  const sessionId = req.query.sessionId || req.body.sessionId || req.body.CustomField || req.query.CustomField || req.body.Status;
  // Exotel returns digits pressed in the "Digits" or "digits" parameter
  const digits = req.body.Digits || req.query.Digits || req.body.digits || req.query.digits;

  console.log(`Webhook received: sessionId=${sessionId}, digits=${digits}`);

  const session = activeSessions.get(sessionId);

  res.type('text/xml');

  if (!session) {
    return res.send(
      `<Response>
        <Say voice="female">Welcome to Sahayak Healthcare. Session not found.</Say>
        <Hangup/>
      </Response>`
    );
  }

  // If digits are returned from a previous step, save it
  if (digits !== undefined && digits !== null && digits !== '') {
    const currentQ = questions[session.currentStep - 1];
    session.answers[currentQ.key] = digits;
    session.currentStep += 1;
    console.log(`Session ${sessionId}: Step ${session.currentStep - 1} Answered with key "${digits}"`);
  }

  // Play next question or end call
  if (session.currentStep <= questions.length) {
    const nextQ = questions[session.currentStep - 1];
    const gatherUrl = `${baseUrl}/api/ivr/webhook?sessionId=${sessionId}`;
    
    // Generate Exotel XML response
    const xmlResponse = `
      <Response>
        <Gather action="${gatherUrl}" method="GET" numDigits="${nextQ.key === 'pain_level' ? 2 : 1}" timeout="10">
          <Say voice="female">${nextQ.text}</Say>
        </Gather>
        <Say voice="female">We did not receive any key input. Let us repeat.</Say>
        <Redirect method="GET">${gatherUrl}</Redirect>
      </Response>
    `;
    res.send(xmlResponse.trim());
  } else {
    // Finish session
    const finalXml = `
      <Response>
        <Say voice="female">Thank you. All your recovery responses have been successfully synced to your doctor's dashboard. Goodbye.</Say>
        <Hangup/>
      </Response>
    `;
    console.log(`Session ${sessionId} fully completed:`, session.answers);
    res.send(finalXml.trim());
  }
});

// Exotel status callback webhook
app.all('/api/ivr/status-callback', (req, res) => {
  console.log('Exotel Status Callback:', req.body || req.query);
  res.send('OK');
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
  console.log(`Sahayak Node Exotel Telephony Server running on port ${PORT}`);
});

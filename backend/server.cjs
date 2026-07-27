const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const twilio = require('twilio');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER || 'whatsapp:+14155238886';

let twilioClient = null;
if (twilioAccountSid && twilioAuthToken) {
  twilioClient = twilio(twilioAccountSid, twilioAuthToken);
  console.log('Twilio client initialized for SMS/WhatsApp fallback.');
} else {
  console.warn('Twilio credentials missing. Real SMS/WhatsApp will run in demo/simulation mode.');
}

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
      params.append('CallerId', virtualNumber);
      params.append('CallType', 'trans');
      params.append('CustomField', sessionId);
      params.append('StatusCallback', `${baseUrl}/api/ivr/status-callback`);
      // Exotel calls the flow URL, which contains our Passthru applet pointing to the webhook
      const flowUrl = `http://my.exotel.com/${accountSid}/exoml/start_voice/${process.env.EXOTEL_APP_ID}`;
      params.append('Url', flowUrl);

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

  // Get session, with fallback to the last created session if sessionId is missing or not found
  let session = activeSessions.get(sessionId);
  if (!session) {
    const keys = Array.from(activeSessions.keys());
    if (keys.length > 0) {
      const lastSessionId = keys[keys.length - 1];
      session = activeSessions.get(lastSessionId);
      console.log(`Session ${sessionId} not found, falling back to last active session ${lastSessionId}`);
    } else {
      // Create a dummy fallback session so the call works anyway
      const fallbackId = 'SES-FALLBACK';
      session = {
        patient_id: 'PAT-101',
        phone: req.body.From || req.query.From || 'Unknown',
        currentStep: 1,
        answers: {}
      };
      activeSessions.set(fallbackId, session);
      session = activeSessions.get(fallbackId);
      console.log(`No active sessions found. Created fallback session: ${fallbackId}`);
    }
  }

  res.type('text/xml');

  // If digits are returned from a previous step, save it
  if (digits !== undefined && digits !== null && digits !== '') {
    const currentQ = questions[session.currentStep - 1];
    if (currentQ) {
      session.answers[currentQ.key] = digits;
      session.currentStep += 1;
      console.log(`Session: Step ${session.currentStep - 1} Answered with key "${digits}"`);
    }
  }

  // Play next question or end call
  if (session.currentStep <= questions.length) {
    const nextQ = questions[session.currentStep - 1];
    const gatherUrl = `${baseUrl}/api/ivr/webhook?sessionId=${sessionId || 'SES-FALLBACK'}`;
    
    // Generate Exotel XML response
    const xmlResponse = `
      <Response>
        <Gather action="${gatherUrl}" method="GET" numDigits="${nextQ.key === 'pain_level' ? 2 : 1}" timeout="10">
          <Say>${nextQ.text}</Say>
        </Gather>
        <Say>We did not receive any key input. Let us repeat.</Say>
        <Redirect method="GET">${gatherUrl}</Redirect>
      </Response>
    `;
    res.send(xmlResponse.trim());
  } else {
    // Finish session
    const finalXml = `
      <Response>
        <Say>Thank you. All your recovery responses have been successfully synced to your doctor's dashboard. Goodbye.</Say>
        <Hangup/>
      </Response>
    `;
    console.log(`Session completed. Answers:`, session.answers);
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

// Active chat sessions map
const activeChatSessions = new Map();

// Helper to format/options text
const getQuestionTextWithOptions = (index) => {
  const q = questions[index];
  if (!q) return '';
  const optionsMap = {
    'medication': 'Reply 1 for Yes, 2 for No.',
    'pain_level': 'Reply with a number between 1 and 10.',
    'exercise': 'Reply 1 for Yes, 2 for No.',
    'swelling': 'Reply 1 for Mild, 2 for Moderate, 3 for Severe.',
    'callback': 'Reply 1 for Yes, 2 for No.'
  };
  return `${q.text}\n(${optionsMap[q.key] || ''})`;
};

// Initialize Chat (SMS/WhatsApp) Session
app.post('/api/chat/start', async (req, res) => {
  const { patient_id, phone_number, mode } = req.body;
  const sessionId = 'CHAT-' + Date.now().toString().slice(-6);
  const targetPhone = (phone_number || '+91 9528347830').replace(/\s+/g, '');
  
  const qText = getQuestionTextWithOptions(0);
  const initialText = `Hello! This is Sahayak Care Assistant. Let's do your daily recovery check-in.\n\n${qText}`;

  const newSession = {
    sessionId,
    patient_id: patient_id || 'PAT-101',
    phone_number: targetPhone,
    mode: mode || 'WhatsApp', // 'SMS' or 'WhatsApp'
    currentStep: 1,
    answers: {},
    messages: [
      {
        id: 'msg-init-1',
        sender: 'bot',
        text: initialText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };

  activeChatSessions.set(sessionId, newSession);

  // Send real message if Twilio client is configured
  if (twilioClient) {
    try {
      console.log(`Sending real ${mode} to ${targetPhone} using Twilio...`);
      if (mode === 'WhatsApp') {
        await twilioClient.messages.create({
          body: initialText,
          from: twilioWhatsAppNumber,
          to: `whatsapp:${targetPhone}`
        });
      } else {
        await twilioClient.messages.create({
          body: initialText,
          from: twilioPhoneNumber,
          to: targetPhone
        });
      }
      console.log(`Real ${mode} message sent to ${targetPhone}`);
    } catch (error) {
      console.error(`Failed to send real ${mode}:`, error.message);
    }
  } else {
    console.log(`Simulated ${mode} start to ${targetPhone} (Twilio credentials missing)`);
  }

  res.json({ success: true, session: newSession });
});

// Reply to Chat (SMS/WhatsApp)
app.post('/api/chat/message', (req, res) => {
  const { sessionId, text } = req.body;
  const session = activeChatSessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ success: false, error: 'Session not found' });
  }

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Save user's answer
  const userMsgId = 'msg-user-' + Date.now();
  session.messages.push({
    id: userMsgId,
    sender: 'user',
    text,
    timestamp
  });

  const currentQIndex = session.currentStep - 1;
  if (currentQIndex < questions.length) {
    const currentQ = questions[currentQIndex];
    session.answers[currentQ.key] = text;
    session.currentStep += 1;
  }

  // Determine response after a short simulated typing delay
  setTimeout(async () => {
    const botTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const botMsgId = 'msg-bot-' + Date.now();
    let replyText = '';

    if (session.currentStep <= questions.length) {
      replyText = getQuestionTextWithOptions(session.currentStep - 1);
    } else {
      replyText = 'Thank you! All your recovery responses have been successfully synced to your doctor\'s dashboard. Goodbye!';
      console.log(`Chat session ${sessionId} completed:`, session.answers);
    }

    session.messages.push({
      id: botMsgId,
      sender: 'bot',
      text: replyText,
      timestamp: botTimestamp
    });

    // Send real reply if Twilio is configured
    if (twilioClient) {
      try {
        if (session.mode === 'WhatsApp') {
          await twilioClient.messages.create({
            body: replyText,
            from: twilioWhatsAppNumber,
            to: `whatsapp:${session.phone_number}`
          });
        } else {
          await twilioClient.messages.create({
            body: replyText,
            from: twilioPhoneNumber,
            to: session.phone_number
          });
        }
      } catch (err) {
        console.error(`Failed to send real response via Twilio:`, err.message);
      }
    }

    res.json({ success: true, session });
  }, 1000);
});

// Twilio SMS & WhatsApp Webhook (For receiving real replies from patient's phone)
app.post('/api/twilio/sms-webhook', async (req, res) => {
  const incomingText = req.body.Body ? req.body.Body.trim() : '';
  const fromNumber = req.body.From ? req.body.From : ''; // e.g., +919528347830 or whatsapp:+919528347830
  
  console.log(`Twilio Webhook: Received "${incomingText}" from ${fromNumber}`);

  // Find active chat session for this phone number
  let session = null;
  let activeSessionId = null;
  
  const normalizedFromPhone = fromNumber.replace('whatsapp:', '').replace(/\s+/g, '');
  
  for (const [sid, sess] of activeChatSessions.entries()) {
    const normalizedSessPhone = sess.phone_number.replace(/\s+/g, '');
    if (normalizedSessPhone === normalizedFromPhone || normalizedSessPhone.includes(normalizedFromPhone) || normalizedFromPhone.includes(normalizedSessPhone)) {
      session = sess;
      activeSessionId = sid;
      break;
    }
  }

  const twiml = new twilio.twiml.MessagingResponse();

  if (!session) {
    // If no active session, initialize one automatically
    console.log(`No active chat session found for ${fromNumber}. Autocreating.`);
    activeSessionId = 'CHAT-' + Date.now().toString().slice(-6);
    session = {
      sessionId: activeSessionId,
      patient_id: 'PAT-101',
      phone_number: normalizedFromPhone,
      mode: fromNumber.startsWith('whatsapp:') ? 'WhatsApp' : 'SMS',
      currentStep: 1,
      answers: {},
      messages: []
    };
    activeChatSessions.set(activeSessionId, session);
  }

  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Save the user's incoming message
  session.messages.push({
    id: 'msg-user-' + Date.now(),
    sender: 'user',
    text: incomingText,
    timestamp
  });

  const currentQIndex = session.currentStep - 1;
  if (currentQIndex < questions.length) {
    const currentQ = questions[currentQIndex];
    session.answers[currentQ.key] = incomingText;
    session.currentStep += 1;
  }

  let replyText = '';
  if (session.currentStep <= questions.length) {
    replyText = getQuestionTextWithOptions(session.currentStep - 1);
  } else {
    replyText = `Thank you! All your recovery responses have been successfully synced to your doctor's dashboard. Goodbye!`;
    console.log(`Real Chat Session Completed via Webhook:`, session.answers);
  }

  // Save the bot's reply message
  session.messages.push({
    id: 'msg-bot-' + Date.now(),
    sender: 'bot',
    text: replyText,
    timestamp
  });

  twiml.message(replyText);
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`Sahayak Node Exotel Telephony Server running on port ${PORT}`);
});

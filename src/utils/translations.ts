export type Language = 'en' | 'hi' | 'kn';

export interface Translations {
  languageName: string;
  postOpRecovery: string;
  selectLanguage: string;
  signIn: string;
  selectRole: string;
  patient: string;
  doctor: string;
  guardian: string;
  emailAddress: string;
  password: string;
  forgotPassword: string;
  loginAs: string;
  continueWithGoogle: string;
  needAccount: string;
  registerAsPatient: string;
  registerAsDoctor: string;
  subtitle: string;
  or: string;
  // Dashboard & Navigation items
  dashboard: string;
  dailyUpdate: string;
  timeline: string;
  healthReport: string;
  settings: string;
  confidenceScore: string;
  driftIndex: string;
  emergencyCare: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    languageName: 'English',
    postOpRecovery: 'POST-OP RECOVERY',
    selectLanguage: 'Language',
    signIn: 'Sign In',
    selectRole: 'SELECT LOGIN PORTAL ROLE',
    patient: 'Patient',
    doctor: 'Doctor',
    guardian: 'Guardian',
    emailAddress: 'Email Address',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    loginAs: 'Login as',
    continueWithGoogle: 'Continue with Google',
    needAccount: 'Need an account?',
    registerAsPatient: 'Register as Patient',
    registerAsDoctor: 'Register as Doctor',
    subtitle: 'Sign in to access your Sahayak portal',
    or: 'OR',
    dashboard: 'Dashboard',
    dailyUpdate: 'Daily Recovery Update',
    timeline: 'Recovery Timeline',
    healthReport: 'Full Health Report',
    settings: 'Settings',
    confidenceScore: 'Recovery Confidence Score',
    driftIndex: 'Recovery Drift Index',
    emergencyCare: 'Emergency Care Line',
  },
  hi: {
    languageName: 'हिंदी (Hindi)',
    postOpRecovery: 'सर्जरी पश्चात् रिकवरी',
    selectLanguage: 'भाषा (Language)',
    signIn: 'साइन इन',
    selectRole: 'लॉगिन पोर्टल भूमिका चुनें',
    patient: 'मरीज़ (Patient)',
    doctor: 'डॉक्टर (Doctor)',
    guardian: 'अभिभावक (Guardian)',
    emailAddress: 'ईमेल पता (Email)',
    password: 'पासवर्ड (Password)',
    forgotPassword: 'पासवर्ड भूल गए?',
    loginAs: 'लॉगिन करें:',
    continueWithGoogle: 'गूगल के साथ जारी रखें',
    needAccount: 'नया खाता चाहिए?',
    registerAsPatient: 'मरीज़ का पंजीकरण',
    registerAsDoctor: 'डॉक्टर का पंजीकरण',
    subtitle: 'अपने सहायक (Sahayak) पोर्टल में प्रवेश करें',
    or: 'या',
    dashboard: 'डैशबोर्ड',
    dailyUpdate: 'दैनिक रिकवरी अपडेट',
    timeline: 'रिकवरी टाइमलाइन',
    healthReport: 'स्वास्थ्य रिपोर्ट',
    settings: 'सेटिंग्स',
    confidenceScore: 'रिकवरी आत्मविश्वास स्कोर',
    driftIndex: 'रिकवरी ड्रिफ्ट इंडेक्स',
    emergencyCare: 'आपातकालीन सहायता हेल्पलाइन',
  },
  kn: {
    languageName: 'ಕನ್ನಡ (Kannada)',
    postOpRecovery: 'ಶಸ್ತ್ರಚಿಕಿತ್ಸೆಯ ನಂತರದ ಚೇತರಿಕೆ',
    selectLanguage: 'ಭಾಷೆ (Language)',
    signIn: 'ಸೈನ್ ಇನ್',
    selectRole: 'ಲಾಗಿನ್ ಪೋರ್ಟಲ್ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    patient: 'ರೋಗಿ (Patient)',
    doctor: 'ವೈದ್ಯರು (Doctor)',
    guardian: 'ಪೋಷಕರು (Guardian)',
    emailAddress: 'ಇಮೇಲ್ ವಿಳಾಸ (Email)',
    password: 'ಪಾಸ್‌ವರ್ಡ್ (Password)',
    forgotPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿದ್ದೀರಾ?',
    loginAs: 'ಲಾಗಿನ್ ಮಾಡಿ:',
    continueWithGoogle: 'Google ಮೂಲಕ ಮುಂದುವರಿಯಿರಿ',
    needAccount: 'ಹೊಸ ಖಾತೆ ಬೇಕೇ?',
    registerAsPatient: 'ರೋಗಿಯಾಗಿ ನೋಂದಾಯಿಸಿ',
    registerAsDoctor: 'ವೈದ್ಯರಾಗಿ ನೋಂದಾಯಿಸಿ',
    subtitle: 'ನಿಮ್ಮ ಸಹಾಯಕ್ (Sahayak) ಪೋರ್ಟಲ್‌ಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
    or: 'ಅಥವಾ',
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    dailyUpdate: 'ದೈನಂದಿನ ಚೇತರಿಕೆಯ ಅಪ್‌ಡೇಟ್',
    timeline: 'ಚೇತರಿಕೆಯ ಟೈಮ್‌ಲೈನ್',
    healthReport: 'ಆರೋಗ್ಯ ವರದಿ',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    confidenceScore: 'ಚೇತರಿಕೆಯ ವಿಶ್ವಾಸಾರ್ಹತೆ ಸ್ಕೋರ್',
    driftIndex: 'ಚೇತರಿಕೆಯ ಡ್ರಿಫ್ಟ್ ಸೂಚ್ಯಂಕ',
    emergencyCare: 'ತುರ್ತು ಆರೈಕೆ ಸಹಾಯವಾಣಿ',
  },
};

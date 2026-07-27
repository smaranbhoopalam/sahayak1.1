export type UserRole = 'patient' | 'doctor' | 'guardian';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  hospital: string;
  doctorCode: string;
  condition: string;
  surgeryDate?: string;
  recoveryDay: number;
  riskLevel: RiskLevel;
  confidenceScore: number; // e.g., 94 (out of 100)
  driftIndex: number; // e.g., 1.2 (out of 5.0)
  assignedDoctorName?: string;
  lastUpdated?: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  hospital: string;
  department: string;
  specialization: string;
  registrationNumber: string;
  activePatientsCount: number;
  pendingAlertsCount: number;
}

export interface DailyUpdate {
  id: string;
  patientId: string;
  date: string;
  painLevel: number; // 1 to 10
  medicationTaken: boolean;
  temperature: number; // in °C or °F
  walkingSteps: number;
  notes: string;
}

export interface TimelineItem {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  vitalSummary?: string;
  painLevel?: number;
  medicationAdherence?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'reminder' | 'info';
  actionUrl?: string;
}

export interface AdminAnalytics {
  totalPatients: number;
  highRiskPatients: number;
  recoverySuccessRate: number; // percentage
  readmissionRate: number; // percentage
  activeDoctors: number;
}

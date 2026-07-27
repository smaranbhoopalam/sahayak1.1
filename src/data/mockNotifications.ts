export interface DoctorNotification {
  id: string;
  type: 'high_risk' | 'medication_missed' | 'recovery_improved' | 'appointment';
  patientId: string;
  patientName: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'urgent' | 'normal' | 'low';
}

export const mockNotifications: DoctorNotification[] = [
  {
    id: 'NOTIF-01',
    type: 'high_risk',
    patientId: 'PAT-102',
    patientName: 'Priya Patel',
    title: 'High Risk Alert: Recovery Drift Exceeded',
    message: 'Drift index spiked to 3.4 (+1.8 in 24h). Severe flexor stiffness reported.',
    timestamp: '10 mins ago',
    read: false,
    priority: 'urgent',
  },
  {
    id: 'NOTIF-02',
    type: 'medication_missed',
    patientId: 'PAT-109',
    patientName: 'Karan Mehta',
    title: 'Medication Missed Alert',
    message: 'Patient missed 2 consecutive doses of Anti-inflammatory Rx & Rehab session.',
    timestamp: '45 mins ago',
    read: false,
    priority: 'normal',
  },
  {
    id: 'NOTIF-03',
    type: 'recovery_improved',
    patientId: 'PAT-101',
    patientName: 'Rahul Sharma',
    title: 'Recovery Confidence Milestone Achieved',
    message: 'Recovery confidence score reached 92% (Target: >90%). Mobility velocity verified.',
    timestamp: '2 hours ago',
    read: true,
    priority: 'low',
  },
  {
    id: 'NOTIF-04',
    type: 'appointment',
    patientId: 'PAT-105',
    patientName: 'Vikram Singh',
    title: 'Tele-Consultation Request',
    message: 'Patient scheduled an urgent post-CABG follow-up for 02:30 PM today.',
    timestamp: '3 hours ago',
    read: false,
    priority: 'urgent',
  },
  {
    id: 'NOTIF-05',
    type: 'recovery_improved',
    patientId: 'PAT-106',
    patientName: 'Ananya Gupta',
    title: 'Digital Twin ROM Milestone',
    message: 'Shoulder abduction ROM increased by +15° in digital twin motion capture.',
    timestamp: '5 hours ago',
    read: true,
    priority: 'low',
  },
];

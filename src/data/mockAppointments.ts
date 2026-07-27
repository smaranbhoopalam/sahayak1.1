export interface DoctorAppointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatarBg: string;
  time: string;
  duration: string;
  procedure: string;
  type: 'Video Teleconsult' | 'In-Person Visit' | 'Post-Op Review';
  status: 'Upcoming' | 'In-Progress' | 'Completed';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export const mockAppointments: DoctorAppointment[] = [
  {
    id: 'APT-101',
    patientId: 'PAT-102',
    patientName: 'Priya Patel',
    patientAvatarBg: 'bg-rose-500',
    time: '11:30 AM',
    duration: '25 mins',
    procedure: 'Total Knee Replacement',
    type: 'Video Teleconsult',
    status: 'Upcoming',
    riskLevel: 'critical',
  },
  {
    id: 'APT-102',
    patientId: 'PAT-105',
    patientName: 'Vikram Singh',
    patientAvatarBg: 'bg-rose-500',
    time: '02:30 PM',
    duration: '30 mins',
    procedure: 'Coronary Artery Bypass (CABG)',
    type: 'Video Teleconsult',
    status: 'Upcoming',
    riskLevel: 'high',
  },
  {
    id: 'APT-103',
    patientId: 'PAT-101',
    patientName: 'Rahul Sharma',
    patientAvatarBg: 'bg-emerald-500',
    time: '04:00 PM',
    duration: '20 mins',
    procedure: 'Post-ACL Reconstruction Surgery',
    type: 'Post-Op Review',
    status: 'Upcoming',
    riskLevel: 'low',
  },
  {
    id: 'APT-104',
    patientId: 'PAT-103',
    patientName: 'Amit Verma',
    patientAvatarBg: 'bg-amber-500',
    time: '05:15 PM',
    duration: '15 mins',
    procedure: 'Laparoscopic Appendectomy',
    type: 'In-Person Visit',
    status: 'Upcoming',
    riskLevel: 'medium',
  },
];

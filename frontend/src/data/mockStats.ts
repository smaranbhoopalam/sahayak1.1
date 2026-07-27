export interface SummaryStat {
  id: string;
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  trend: string;
  trendType: 'positive' | 'negative' | 'neutral';
  description: string;
  iconName: string;
  sparkline: number[];
}

export const mockStats: SummaryStat[] = [
  {
    id: 'stat-1',
    title: 'Total Patients',
    value: 128,
    trend: '+12%',
    trendType: 'positive',
    description: 'vs last month',
    iconName: 'Users',
    sparkline: [40, 52, 68, 75, 90, 110, 128],
  },
  {
    id: 'stat-2',
    title: 'Critical Patients',
    value: 3,
    trend: '-2',
    trendType: 'positive',
    description: 'requires immediate care',
    iconName: 'AlertTriangle',
    sparkline: [8, 6, 7, 5, 4, 4, 3],
  },
  {
    id: 'stat-3',
    title: 'Recovering Normally',
    value: 104,
    trend: '81.2%',
    trendType: 'positive',
    description: 'on predicted timeline',
    iconName: 'Activity',
    sparkline: [70, 75, 82, 88, 95, 100, 104],
  },
  {
    id: 'stat-4',
    title: 'Pending Reviews',
    value: 6,
    trend: 'Due Today',
    trendType: 'neutral',
    description: 'daily check-ins to verify',
    iconName: 'FileCheck',
    sparkline: [12, 10, 15, 9, 8, 7, 6],
  },
  {
    id: 'stat-5',
    title: 'Avg Recovery Confidence',
    value: 86.4,
    suffix: '%',
    trend: '+3.2%',
    trendType: 'positive',
    description: 'Sahayak AI Engine score',
    iconName: 'ShieldCheck',
    sparkline: [78, 80, 81, 83, 85, 85.5, 86.4],
  },
];

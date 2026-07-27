export interface RegionMetrics {
  pain: number; // 0-10
  swelling: 'None' | 'Minimal' | 'Moderate' | 'Severe';
  temperature: number; // °C
  mobility: string;
  healingPct: number;
  rom: string; // Range of Motion
  strength: string;
  medImpact: string;
  notes: string;
  status: 'healthy' | 'healing' | 'attention' | 'critical';
}

export interface TimelineDataPoint {
  day: number;
  confidenceScore: number;
  driftIndex: number;
  medAdherence: number;
  stage: string;
  vitals: {
    hr: number;
    bp: string;
    spo2: number;
    temp: number;
    steps: number;
  };
  metrics: {
    flexibility: string;
    pain: number;
    swellingPct: number;
    tissueTemp: number;
    muscleActivation: string;
    speed: string;
  };
  regions: Record<string, RegionMetrics>;
  aiInsight: {
    summary: string;
    details: string;
    positives: string[];
  };
}

export const mockTwinTimeline: Record<number, TimelineDataPoint> = {
  1: {
    day: 1,
    confidenceScore: 42,
    driftIndex: 3.8,
    medAdherence: 80,
    stage: 'Acute Post-Op',
    vitals: { hr: 98, bp: '135/88', spo2: 96, temp: 38.2, steps: 120 },
    metrics: {
      flexibility: '15° Flexion',
      pain: 8,
      swellingPct: 85,
      tissueTemp: 38.5,
      muscleActivation: '10% (Trace)',
      speed: '0.1 m/s',
    },
    regions: {
      head: { pain: 2, swelling: 'None', temperature: 37.0, mobility: 'Normal', healingPct: 90, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal recovery', status: 'healthy' },
      neck: { pain: 1, swelling: 'None', temperature: 36.8, mobility: 'Normal', healingPct: 95, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal recovery', status: 'healthy' },
      chest: { pain: 0, swelling: 'None', temperature: 36.6, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal recovery', status: 'healthy' },
      abdomen: { pain: 2, swelling: 'None', temperature: 36.9, mobility: 'Normal', healingPct: 90, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Slight post-anesthesia nausea', status: 'healthy' },
      leftArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal recovery', status: 'healthy' },
      rightArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal recovery', status: 'healthy' },
      leftLeg: { pain: 1, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 95, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal recovery', status: 'healthy' },
      rightLeg: { pain: 4, swelling: 'Minimal', temperature: 37.2, mobility: 'Guarded', healingPct: 40, rom: 'Limited', strength: '3/5', medImpact: 'Pain diminished by block', notes: 'Referred muscle ache', status: 'healing' },
      knees: { pain: 9, swelling: 'Severe', temperature: 38.5, mobility: 'Blocked', healingPct: 10, rom: '15° Flexion', strength: '0/5', medImpact: 'Block active but fading', notes: 'Incision site inflamed. Joint effusion present.', status: 'critical' },
      feet: { pain: 0, swelling: 'Minimal', temperature: 36.2, mobility: 'Normal', healingPct: 90, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Mild dependent edema', status: 'healthy' },
    },
    aiInsight: {
      summary: 'Critical early inflammation detected.',
      details: 'Post-op day 1 parameters demonstrate expected hyper-inflammatory response.',
      positives: ['Nerve block functioning', 'Oxygenation normal'],
    },
  },
  6: {
    day: 6,
    confidenceScore: 68,
    driftIndex: 2.1,
    medAdherence: 95,
    stage: 'Early Mobility',
    vitals: { hr: 84, bp: '124/80', spo2: 98, temp: 37.4, steps: 1200 },
    metrics: {
      flexibility: '45° Flexion',
      pain: 5,
      swellingPct: 50,
      tissueTemp: 37.6,
      muscleActivation: '30% (Partial)',
      speed: '0.4 m/s',
    },
    regions: {
      head: { pain: 1, swelling: 'None', temperature: 36.8, mobility: 'Normal', healingPct: 95, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal', status: 'healthy' },
      neck: { pain: 0, swelling: 'None', temperature: 36.6, mobility: 'Normal', healingPct: 98, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal', status: 'healthy' },
      chest: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal', status: 'healthy' },
      abdomen: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 98, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal', status: 'healthy' },
      leftArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal', status: 'healthy' },
      rightArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal', status: 'healthy' },
      leftLeg: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 98, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Normal', status: 'healthy' },
      rightLeg: { pain: 2, swelling: 'None', temperature: 36.8, mobility: 'Fair', healingPct: 65, rom: 'Normal', strength: '4/5', medImpact: 'NSAID effective', notes: 'Compensating gait stress', status: 'healing' },
      knees: { pain: 6, swelling: 'Moderate', temperature: 37.6, mobility: 'Restricted', healingPct: 35, rom: '45° Flexion', strength: '2/5', medImpact: 'Analgesics essential', notes: 'Stiffness persists. Daily exercises initiated.', status: 'attention' },
      feet: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 98, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Edema resolved', status: 'healthy' },
    },
    aiInsight: {
      summary: 'Rehab progression on track. Swelling reduced.',
      details: 'Patient has begun weight-bearing exercises with assistive crutches.',
      positives: ['Temperature normalized', 'Swelling down 35%'],
    },
  },
  12: {
    day: 12,
    confidenceScore: 92,
    driftIndex: 0.8,
    medAdherence: 100,
    stage: 'Mid Rehab',
    vitals: { hr: 72, bp: '118/74', spo2: 99, temp: 36.7, steps: 3500 },
    metrics: {
      flexibility: '85° Flexion',
      pain: 3,
      swellingPct: 20,
      tissueTemp: 36.9,
      muscleActivation: '65% (Good)',
      speed: '0.8 m/s',
    },
    regions: {
      head: { pain: 0, swelling: 'None', temperature: 36.6, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      neck: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      chest: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      abdomen: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      leftArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      rightArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      leftLeg: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      rightLeg: { pain: 1, swelling: 'None', temperature: 36.7, mobility: 'Good', healingPct: 80, rom: 'Full', strength: '4+/5', medImpact: 'Zero dependency', notes: 'Gait symmetry recovering', status: 'healing' },
      knees: { pain: 3, swelling: 'Minimal', temperature: 36.9, mobility: 'Functional', healingPct: 75, rom: '85° Flexion', strength: '4/5', medImpact: 'PRN NSAIDs only', notes: 'ACL graft stabilizing. Minor stiffness in extension.', status: 'healing' },
      feet: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
    },
    aiInsight: {
      summary: 'Optimal recovery velocity. Low risk.',
      details: 'Confidence index at 92%. Active extension lag decreased to less than 5 degrees.',
      positives: ['Better Mobility', 'Pain Reduced', 'Medication Compliance'],
    },
  },
  30: {
    day: 30,
    confidenceScore: 98,
    driftIndex: 0.2,
    medAdherence: 100,
    stage: 'Late Recovery',
    vitals: { hr: 68, bp: '115/70', spo2: 99, temp: 36.6, steps: 8500 },
    metrics: {
      flexibility: '135° Flexion',
      pain: 0,
      swellingPct: 0,
      tissueTemp: 36.6,
      muscleActivation: '95% (Excellent)',
      speed: '1.4 m/s',
    },
    regions: {
      head: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      neck: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      chest: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      abdomen: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      leftArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      rightArm: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      leftLeg: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
      rightLeg: { pain: 0, swelling: 'None', temperature: 36.6, mobility: 'Optimal', healingPct: 100, rom: 'Full', strength: '5/5', medImpact: 'N/A', notes: 'Perfect symmetry', status: 'healthy' },
      knees: { pain: 0, swelling: 'None', temperature: 36.6, mobility: 'Optimal', healingPct: 98, rom: '135° Flexion', strength: '5/5', medImpact: 'N/A', notes: 'Full extension achieved. Normal squat pattern verified.', status: 'healthy' },
      feet: { pain: 0, swelling: 'None', temperature: 36.5, mobility: 'Normal', healingPct: 100, rom: 'Full', strength: 'Normal', medImpact: 'N/A', notes: 'Optimal', status: 'healthy' },
    },
    aiInsight: {
      summary: 'Complete recovery milestone achieved!',
      details: 'All sensor telemetry matches healthy control databases. Safe for athletic discharge.',
      positives: ['100% Range of Motion', 'Full Muscle Strength', 'Zero Pain Reported'],
    },
  },
};

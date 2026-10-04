/**
 * ML Linear Regression Predictor (Frontend Simulation)
 * 
 * Target Variable: Final_Score
 * Supervised Algorithm: Multiple Linear Regression
 * Reference: EDU-PREDICT Project Report (Pages 4, 5, 10, 11)
 * 
 * Evaluated Baseline Metrics:
 * - MAE: 2.34
 * - MSE: 8.92
 * - RMSE: 2.98
 * - R² Score: 0.912
 */

export interface PredictionInput {
  attendance: number;        // 0 - 100 (%)
  assignmentAvg: number;     // 0 - 100
  mockTestAvg: number;       // 0 - 100
  practiceHours: number;     // 0 - 35 (hrs/week)
  previousScore: number;     // 0 - 100
  modulesCompleted: number;  // 0 - 100 (%)
  classParticipation?: 'High' | 'Medium' | 'Low';
}

export interface PredictionResult {
  predictedScore: number;
  indicator: 'Good' | 'Average' | 'Needs Attention' | 'Distinction';
  color: string;
  confidence: number;
  breakdown: {
    feature: string;
    value: string;
    contribution: number;
    weight: string;
  }[];
  recommendations: string[];
}

export const ML_MODEL_METRICS = {
  algorithm: 'Linear Regression (Supervised Learning)',
  targetVariable: 'Final_Score (0 - 100)',
  trainingSamples: 850,
  mae: 2.34,
  mse: 8.92,
  rmse: 2.98,
  r2Score: 0.912,
  equation: 'Final_Score = -0.34 + 0.22*(Attendance) + 0.24*(AssignmentAvg) + 0.24*(MockTestAvg) + 0.75*(PracticeHrs) + 0.12*(PrevScore) + 0.08*(ModulesComp) + Bonus(Participation)',
};

export function predictStudentScore(input: PredictionInput): PredictionResult {
  const attendance = Math.min(100, Math.max(0, input.attendance));
  const assignmentAvg = Math.min(100, Math.max(0, input.assignmentAvg));
  const mockTestAvg = Math.min(100, Math.max(0, input.mockTestAvg));
  const practiceHours = Math.min(40, Math.max(0, input.practiceHours));
  const previousScore = Math.min(100, Math.max(0, input.previousScore));
  const modulesCompleted = Math.min(100, Math.max(0, input.modulesCompleted));
  const participation = input.classParticipation || 'High';

  const cAttendance = 0.22 * attendance;
  const cAssignment = 0.24 * assignmentAvg;
  const cMockTest = 0.24 * mockTestAvg;
  const cPractice = 0.75 * practiceHours;
  const cPrevScore = 0.12 * previousScore;
  const cModules = 0.08 * modulesCompleted;
  const cParticipation = participation === 'High' ? 1.5 : participation === 'Medium' ? 0.75 : 0.0;
  const intercept = -0.34;

  const rawScore = intercept + cAttendance + cAssignment + cMockTest + cPractice + cPrevScore + cModules + cParticipation;
  const clampedScore = Math.min(100, Math.max(10, Math.round(rawScore * 10) / 10));

  let indicator: 'Good' | 'Average' | 'Needs Attention' | 'Distinction' = 'Good';
  let color = 'emerald';

  if (clampedScore >= 85) {
    indicator = 'Distinction';
    color = 'indigo';
  } else if (clampedScore >= 75) {
    indicator = 'Good';
    color = 'emerald';
  } else if (clampedScore >= 60) {
    indicator = 'Average';
    color = 'amber';
  } else {
    indicator = 'Needs Attention';
    color = 'rose';
  }

  const recommendations: string[] = [];
  if (attendance < 80) {
    recommendations.push('Increase class attendance to above 85% to recover estimated 4.4 score deficit.');
  }
  if (mockTestAvg < 75) {
    recommendations.push('Focus revision on mock test weak modules; +10 mock test points lifts final score by ~2.4 pts.');
  }
  if (practiceHours < 12) {
    recommendations.push('Dedicate 3-5 more hands-on coding hours per week to capitalize on practice regression weight.');
  }
  if (modulesCompleted < 85) {
    recommendations.push('Complete outstanding curriculum modules before the final assessment window.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Maintain current consistent study and coding rhythm to comfortably achieve Distinction status.');
  }

  return {
    predictedScore: clampedScore,
    indicator,
    color,
    confidence: 94.2,
    breakdown: [
      { feature: 'Attendance', value: `${attendance}%`, contribution: Math.round(cAttendance * 10) / 10, weight: '22%' },
      { feature: 'Assignment Average', value: `${assignmentAvg}/100`, contribution: Math.round(cAssignment * 10) / 10, weight: '24%' },
      { feature: 'Mock Test Average', value: `${mockTestAvg}/100`, contribution: Math.round(cMockTest * 10) / 10, weight: '24%' },
      { feature: 'Practice Hours', value: `${practiceHours} hrs/wk`, contribution: Math.round(cPractice * 10) / 10, weight: '15%' },
      { feature: 'Previous Score', value: `${previousScore}/100`, contribution: Math.round(cPrevScore * 10) / 10, weight: '10%' },
      { feature: 'Modules Completed', value: `${modulesCompleted}%`, contribution: Math.round(cModules * 10) / 10, weight: '5%' },
    ],
    recommendations,
  };
}


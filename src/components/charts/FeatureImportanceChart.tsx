import React from 'react';

interface FeatureWeight {
  feature: string;
  weight: number; // percentage
  coefficient: number;
  description: string;
  impact: 'High' | 'Medium' | 'Foundational';
}

const FEATURES: FeatureWeight[] = [
  { feature: 'Assignment Performance', weight: 24, coefficient: 0.24, description: 'Measures continuous comprehension of homework and lab exercises', impact: 'High' },
  { feature: 'Mock Test / Assessment Average', weight: 24, coefficient: 0.24, description: 'Timed exam simulation capturing exam readiness under pressure', impact: 'High' },
  { feature: 'Class Attendance Percentage', weight: 22, coefficient: 0.22, description: 'Direct measure of lecture exposure and mentor engagement', impact: 'High' },
  { feature: 'Weekly Practice Hours', weight: 15, coefficient: 0.75, description: 'Hours spent coding in IDE outside scheduled classroom lectures', impact: 'Medium' },
  { feature: 'Previous Academic Score', weight: 10, coefficient: 0.12, description: 'Baseline academic benchmark and prerequisite foundation', impact: 'Foundational' },
  { feature: 'Curriculum Modules Completed', weight: 5, coefficient: 0.08, description: 'Coverage of required syllabus topics and milestone tasks', impact: 'Foundational' },
];

export const FeatureImportanceChart: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Linear Regression Feature Weights</h4>
          <p className="text-xs text-slate-500">Supervised model parameter weights normalized to 100%</p>
        </div>
        <span className="text-[11px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-semibold border border-indigo-100">
          R² = 0.912
        </span>
      </div>

      <div className="space-y-3">
        {FEATURES.map((item, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {item.feature}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">coef: {item.coefficient}</span>
                <span className="font-bold text-slate-900 font-mono w-8 text-right">{item.weight}%</span>
              </div>
            </div>

            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700"
                style={{ width: `${item.weight * 3.5}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 group-hover:text-slate-600 transition-colors">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};


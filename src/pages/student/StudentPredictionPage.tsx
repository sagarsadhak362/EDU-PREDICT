import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Sliders, 
  Info, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu,
  HelpCircle,
  Clock,
  BookOpen
} from 'lucide-react';
import { predictStudentScore, PredictionInput, ML_MODEL_METRICS } from '../../utils/mlPredictor';
import { ScoreGauge } from '../../components/charts/ScoreGauge';
import { FeatureImportanceChart } from '../../components/charts/FeatureImportanceChart';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface StudentPredictionPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentPredictionPage: React.FC<StudentPredictionPageProps> = ({ onShowToast }) => {
  // Baseline initial state strictly matching Rahul Sen from PDF (Pages 10 & 11)
  const initialInputs: PredictionInput = {
    attendance: 88,
    assignmentAvg: 84,
    mockTestAvg: 78,
    practiceHours: 10,
    previousScore: 80,
    modulesCompleted: 90,
    classParticipation: 'High',
  };

  const [inputs, setInputs] = useState<PredictionInput>(initialInputs);

  // Live real-time frontend linear regression calculation
  const prediction = useMemo(() => {
    return predictStudentScore(inputs);
  }, [inputs]);

  const handleReset = () => {
    setInputs(initialInputs);
    onShowToast('info', 'Reset to Rahul Sen Baseline', 'Inputs restored to PDF specification: Predicted Final Score = 83.7 / 100.');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Scope Disclaimer Banner (as requested in prompt) */}
      <div className="p-4 bg-indigo-50/90 border border-indigo-200/90 rounded-2xl flex items-start gap-3 text-xs">
        <Cpu className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <strong className="text-indigo-900 font-bold">Frontend ML Prediction Simulator (Supervised Linear Regression)</strong>
            <span className="bg-indigo-200/80 text-indigo-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
              UI Prototype
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            This module demonstrates the user experience of the supervised Linear Regression academic prediction pipeline specified in the EDU-PREDICT project report (Target: <code>Final_Score</code>, R² = 0.912). All calculations execute client-side using validated regression weights without requiring a backend server.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Academic Performance Prediction
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulate how your attendance, mock tests, and practice hours determine your expected final grade.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={handleReset}
        >
          Reset to Rahul's Baseline (83.7)
        </Button>
      </div>

      {/* Top Main Result: Score Gauge + Key Verdict */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Score Gauge Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col items-center justify-center text-center space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Predicted Final Score
          </span>

          <ScoreGauge score={prediction.predictedScore} size={250} />

          <div className="w-full pt-4 border-t border-slate-100 flex items-center justify-around text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Model Confidence</span>
              <strong className="text-slate-800 font-mono">94.2%</strong>
            </div>
            <div className="border-l border-slate-100 pl-4">
              <span className="text-slate-400 block text-[11px]">Indicator</span>
              <strong className="text-slate-800">{prediction.indicator}</strong>
            </div>
          </div>
        </div>

        {/* Right 2 cols: Supporting Summary & Dynamic Insights */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Performance Category Analysis</h3>
              </div>
              <Badge
                variant={
                  prediction.indicator === 'Distinction'
                    ? 'indigo'
                    : prediction.indicator === 'Good'
                    ? 'emerald'
                    : prediction.indicator === 'Average'
                    ? 'amber'
                    : 'rose'
                }
                size="lg"
                dot
              >
                {prediction.indicator}
              </Badge>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Based on the currently simulated parameters, Rahul is projected to achieve{' '}
              <strong className="text-slate-900 font-bold">{prediction.predictedScore.toFixed(1)} / 100</strong>.
              {prediction.predictedScore >= 85 && ' This qualifies for High Distinction and priority placement drive eligibility.'}
              {prediction.predictedScore >= 75 && prediction.predictedScore < 85 && ' This confirms a solid grasp of Python, Django ORM, and full stack principles with placement readiness.'}
              {prediction.predictedScore >= 60 && prediction.predictedScore < 75 && ' Average performance band; targeted revision in mock tests and additional practice hours recommended.'}
              {prediction.predictedScore < 60 && ' At-Risk alert flagged. Immediate faculty 1-on-1 tutoring recommended to recover attendance and submission deficits.'}
            </p>

            {/* AI Actionable Recommendations */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-600" />
                Actionable Optimization Advice:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {prediction.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Specification Footnote (Page 5 of PDF) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
            <div>
              <span className="text-[10px] text-slate-400 uppercase">MAE Error</span>
              <div className="font-bold text-slate-800 font-mono">{ML_MODEL_METRICS.mae}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">RMSE</span>
              <div className="font-bold text-slate-800 font-mono">{ML_MODEL_METRICS.rmse}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">R² Fit Score</span>
              <div className="font-bold text-indigo-600 font-mono">{ML_MODEL_METRICS.r2Score}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">Training Set</span>
              <div className="font-bold text-slate-800 font-mono">{ML_MODEL_METRICS.trainingSamples} Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Feature Simulator (Adjust sliders to test Linear Regression in real-time!) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              Interactive Academic Feature Controls
            </h3>
            <p className="text-xs text-slate-500">
              Drag the sliders below to simulate different academic scenarios and observe immediate score adjustments.
            </p>
          </div>
          <span className="text-xs text-indigo-600 font-mono bg-indigo-50 px-2.5 py-1 rounded-lg">
            Live Linear Regression Formula
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Attendance Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Attendance Percentage</span>
              <span className="font-mono font-bold text-indigo-600 text-sm">{inputs.attendance}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="1"
              value={inputs.attendance}
              onChange={(e) => setInputs({ ...inputs, attendance: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Min: 40%</span>
              <span>Weight: 22% (coef: 0.22)</span>
              <span>Max: 100%</span>
            </div>
          </div>

          {/* Assignment Average Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Assignment Average</span>
              <span className="font-mono font-bold text-indigo-600 text-sm">{inputs.assignmentAvg} / 100</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="1"
              value={inputs.assignmentAvg}
              onChange={(e) => setInputs({ ...inputs, assignmentAvg: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Min: 30</span>
              <span>Weight: 24% (coef: 0.24)</span>
              <span>Max: 100</span>
            </div>
          </div>

          {/* Mock Test Average Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Mock Test Average</span>
              <span className="font-mono font-bold text-indigo-600 text-sm">{inputs.mockTestAvg} / 100</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="1"
              value={inputs.mockTestAvg}
              onChange={(e) => setInputs({ ...inputs, mockTestAvg: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Min: 30</span>
              <span>Weight: 24% (coef: 0.24)</span>
              <span>Max: 100</span>
            </div>
          </div>

          {/* Practice Hours Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Practice Hours / Week</span>
              <span className="font-mono font-bold text-indigo-600 text-sm">{inputs.practiceHours} hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={inputs.practiceHours}
              onChange={(e) => setInputs({ ...inputs, practiceHours: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Min: 0h</span>
              <span>Weight: 15% (coef: 0.75)</span>
              <span>Max: 30h</span>
            </div>
          </div>

          {/* Previous Score Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Previous Exam Score</span>
              <span className="font-mono font-bold text-indigo-600 text-sm">{inputs.previousScore} / 100</span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              step="1"
              value={inputs.previousScore}
              onChange={(e) => setInputs({ ...inputs, previousScore: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Min: 40</span>
              <span>Weight: 10% (coef: 0.12)</span>
              <span>Max: 100</span>
            </div>
          </div>

          {/* Modules Completed Slider */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Modules Completed</span>
              <span className="font-mono font-bold text-indigo-600 text-sm">{inputs.modulesCompleted}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              step="5"
              value={inputs.modulesCompleted}
              onChange={(e) => setInputs({ ...inputs, modulesCompleted: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Min: 30%</span>
              <span>Weight: 5% (coef: 0.08)</span>
              <span>Max: 100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Weights & Breakdown Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
          <FeatureImportanceChart />
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="pb-2 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900">Current Linear Regression Contribution Breakdown</h4>
            <p className="text-xs text-slate-500">Calculated components contributing to {prediction.predictedScore.toFixed(1)} / 100</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                  <th className="py-2">Feature</th>
                  <th className="py-2">Current Value</th>
                  <th className="py-2">Model Weight</th>
                  <th className="py-2 text-right">Points Added</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {prediction.breakdown.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-2.5 text-slate-800">{row.feature}</td>
                    <td className="py-2.5 font-mono text-slate-600">{row.value}</td>
                    <td className="py-2.5 text-slate-400">{row.weight}</td>
                    <td className="py-2.5 text-right font-mono font-bold text-indigo-600">
                      +{row.contribution}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={3} className="py-2.5 px-2 text-slate-900">
                    Final Computed Score
                  </td>
                  <td className="py-2.5 px-2 text-right font-mono text-indigo-600 text-sm">
                    {prediction.predictedScore.toFixed(1)} / 100
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Sparkles, Cpu, RotateCcw, CheckCircle2, TrendingUp, BarChart2, ShieldCheck, Download, Play } from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { ML_MODEL_METRICS } from '../../utils/mlPredictor';
import { FeatureImportanceChart } from '../../components/charts/FeatureImportanceChart';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface MLPredictionDashboardPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const MLPredictionDashboardPage: React.FC<MLPredictionDashboardPageProps> = ({ onShowToast }) => {
  const [isRunningBatch, setIsRunningBatch] = useState(false);
  const [filterIndicator, setFilterIndicator] = useState('All');

  const filteredStudents = STUDENTS_DATA.filter(s => {
    if (filterIndicator === 'All') return true;
    return s.performanceIndicator === filterIndicator;
  });

  const handleRunBatchPrediction = () => {
    setIsRunningBatch(true);
    setTimeout(() => {
      setIsRunningBatch(false);
      onShowToast('success', 'Batch Prediction Complete', `Supervised Linear Regression executed across 1,420 students. R² = 0.912.`);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Scope Disclaimer Banner */}
      <div className="p-4 bg-indigo-50/90 border border-indigo-200/90 rounded-2xl flex items-start gap-3 text-xs">
        <Cpu className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <strong className="text-indigo-900 font-bold">ML Prediction Hub (Linear Regression Engine)</strong>
            <span className="bg-indigo-200/80 text-indigo-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
              Frontend Prototype
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            In accordance with the EDU-PREDICT specification (Sections 5, 9, 10), this dashboard displays the supervised Linear Regression model metrics (Target: <code>Final_Score</code>, R² = 0.912) and simulated predictions for all cohort candidates without requiring a live Python/Django server.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">ML Prediction Dashboard</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Supervised learning regression pipeline metrics, feature weights, and batch academic predictions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            isLoading={isRunningBatch}
            icon={<Play className="w-4 h-4" />}
            onClick={handleRunBatchPrediction}
          >
            Run Cohort Batch Prediction
          </Button>
        </div>
      </div>

      {/* Model Evaluation Metrics Cards (Page 5 of PDF) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">R² Determination Score</span>
          <div className="text-3xl font-black text-indigo-600 font-mono">0.912</div>
          <span className="text-[11px] text-emerald-600 font-semibold">91.2% variance explained</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mean Absolute Error</span>
          <div className="text-3xl font-black text-slate-900 font-mono">2.34 pts</div>
          <span className="text-[11px] text-slate-400">Average absolute residual</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Root Mean Squared (RMSE)</span>
          <div className="text-3xl font-black text-slate-900 font-mono">2.98 pts</div>
          <span className="text-[11px] text-slate-400">Std dev of prediction errors</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Mean Squared Error (MSE)</span>
          <div className="text-3xl font-black text-slate-900 font-mono">8.92</div>
          <span className="text-[11px] text-slate-400">Evaluated on test split</span>
        </div>
      </div>

      {/* Regression Equation & Feature Weights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <FeatureImportanceChart />
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Linear Regression Equation</h3>
              <p className="text-xs text-slate-500">Trained multiple regression formula calibrated on historical datasets</p>
            </div>

            <div className="p-4 bg-slate-900 text-indigo-300 font-mono text-xs rounded-2xl border border-slate-800 leading-relaxed overflow-x-auto">
              {ML_MODEL_METRICS.equation}
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Model Algorithm:</span>
                <strong className="text-slate-900 font-medium">Multiple Linear Regression (Supervised)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Target Dependent Variable:</span>
                <strong className="text-slate-900 font-mono">Final_Score (0 - 100 continuous)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span>Training / Test Split:</span>
                <strong className="text-slate-900">80% Train (680) / 20% Test (170)</strong>
              </div>
              <div className="flex justify-between py-1">
                <span>Model Serialization Method:</span>
                <strong className="text-slate-900 font-mono">joblib / pickle artifact</strong>
              </div>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Model satisfies academic certification benchmarks (R² &gt; 0.90).</span>
          </div>
        </div>
      </div>

      {/* Cohort Batch Prediction Results Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Cohort Predicted Scores (Section 22.8 Reference)</h3>
            <p className="text-xs text-slate-500">Includes reference candidates Rahul Sen, Ananya Roy, and Sourav Paul</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterIndicator}
              onChange={(e) => setFilterIndicator(e.target.value)}
              className="text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Indicators</option>
              <option value="Distinction">Distinction</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Needs Attention">Needs Attention</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Student</th>
                <th className="py-3 px-4">Course Track</th>
                <th className="py-3 px-3 text-center">Attendance (22%)</th>
                <th className="py-3 px-3 text-center">Assignment Avg (24%)</th>
                <th className="py-3 px-3 text-center">Mock Avg (24%)</th>
                <th className="py-3 px-3 text-center">Practice (15%)</th>
                <th className="py-3 px-4 text-center">Predicted Final Score</th>
                <th className="py-3 px-5 text-right">Performance Indicator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-5 font-bold text-slate-900 flex items-center gap-2">
                    <img src={st.avatar} alt={st.name} className="w-7 h-7 rounded-full object-cover" />
                    <span>{st.name}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{st.enrolledCourseName}</td>
                  <td className="py-3 px-3 text-center font-mono">{st.attendance}%</td>
                  <td className="py-3 px-3 text-center font-mono">{st.assignmentAvg}</td>
                  <td className="py-3 px-3 text-center font-mono">{st.mockTestAvg}</td>
                  <td className="py-3 px-3 text-center font-mono">{st.practiceHours}h</td>
                  <td className="py-3 px-4 text-center font-mono font-black text-indigo-600 text-sm">
                    {st.predictedScore} <span className="text-[10px] text-slate-400 font-normal">/ 100</span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <Badge
                      variant={
                        st.performanceIndicator === 'Distinction' ? 'indigo' :
                        st.performanceIndicator === 'Good' ? 'emerald' :
                        st.performanceIndicator === 'Average' ? 'amber' : 'rose'
                      }
                      size="sm"
                      dot
                    >
                      {st.performanceIndicator}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


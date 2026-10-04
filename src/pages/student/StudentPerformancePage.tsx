import React from 'react';
import { TrendingUp, Award, Clock, CalendarCheck2, FileText, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { TrendLineChart } from '../../components/charts/TrendLineChart';
import { BarComparisonChart } from '../../components/charts/BarComparisonChart';
import { FeatureImportanceChart } from '../../components/charts/FeatureImportanceChart';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface StudentPerformancePageProps {
  onNavigate: (view: string) => void;
}

export const StudentPerformancePage: React.FC<StudentPerformancePageProps> = ({ onNavigate }) => {
  const student = STUDENTS_DATA[0];

  const trendData = [
    { label: 'Wk 1', score: 68, benchmark: 70 },
    { label: 'Wk 3', score: 72, benchmark: 71 },
    { label: 'Wk 5', score: 76, benchmark: 72 },
    { label: 'Wk 7', score: 81, benchmark: 73 },
    { label: 'Wk 9', score: 79, benchmark: 74 },
    { label: 'Wk 11', score: 84, benchmark: 75 },
    { label: 'Wk 13', score: 85, benchmark: 76 },
    { label: 'Wk 15', score: 83.7, benchmark: 76 },
  ];

  const comparisonMetrics = [
    { label: 'Class Attendance Rate', studentValue: 88, batchAverage: 82, unit: '%', max: 100 },
    { label: 'Assignment Scores', studentValue: 84, batchAverage: 79, unit: '/100', max: 100 },
    { label: 'Mock Test Performance', studentValue: 78, batchAverage: 72, unit: '/100', max: 100 },
    { label: 'Weekly IDE Practice Hours', studentValue: 10, batchAverage: 7.5, unit: ' hrs', max: 20 },
    { label: 'Previous Midterm Score', studentValue: 80, batchAverage: 74, unit: '/100', max: 100 },
    { label: 'Curriculum Modules Completed', studentValue: 90, batchAverage: 81, unit: '%', max: 100 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Academic Performance Analytics</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comprehensive metric evaluation and predictive linear regression analysis for Rahul Sen.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Sparkles className="w-4 h-4" />}
          onClick={() => onNavigate('student-prediction')}
        >
          Open ML Simulator
        </Button>
      </div>

      {/* Snapshot Bar */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-indigo-800/80">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <Badge variant="indigo" size="sm">Overall Performance: Good</Badge>
            <h2 className="text-2xl sm:text-3xl font-black mt-2">Predicted Final Grade: 83.7 / 100</h2>
            <p className="text-xs text-indigo-200">
              Rahul ranks in the top 15th percentile of the Python + Django batch.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs bg-white/10 p-4 rounded-2xl border border-white/15">
            <div>
              <span className="text-slate-400 block text-[11px]">Target Status</span>
              <strong className="text-emerald-400 text-sm">On Track for Placement</strong>
            </div>
            <div className="border-l border-white/20 pl-6">
              <span className="text-slate-400 block text-[11px]">Distinction Threshold</span>
              <strong className="text-white text-sm">Needs +1.3 pts</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Charts: Trend Progression & Student vs Batch Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <TrendLineChart
            data={trendData}
            title="15-Week Academic Trajectory vs Cohort"
            height={260}
          />
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <BarComparisonChart
            metrics={comparisonMetrics}
            studentName="Rahul Sen"
          />
        </div>
      </div>

      {/* Diagnostic Strengths & Growth Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Academic Strengths</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Consistent High Attendance (88%):</strong> Strong engagement during interactive Django ORM and PostgreSQL lecture sessions.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Robust Assignment Quality (84/100):</strong> Demonstrated clean code conventions and object-oriented modularization.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span><strong>Rapid Module Pacing (90%):</strong> Completed 5 of 6 core modules well ahead of the final capstone deadline.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Target Growth Opportunities</h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong>Mock Assessment Average (78/100):</strong> Timed test anxiety in multi-choice algorithm sections. +4 points lifts overall prediction into the Distinction band.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span><strong>Practice Hours (10 hrs/wk):</strong> Increasing self-directed coding to 12-14 hrs/wk adds +1.5 pts based on the 0.75 regression weight.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};


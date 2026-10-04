import React, { useState } from 'react';
import { Award, Clock, Calendar, CheckCircle2, ChevronRight, FileCheck, HelpCircle } from 'lucide-react';
import { ASSESSMENTS_DATA } from '../../data/assessmentsData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface StudentAssessmentsPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentAssessmentsPage: React.FC<StudentAssessmentsPageProps> = ({ onShowToast }) => {
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);

  const selectedTest = ASSESSMENTS_DATA.find(t => t.id === selectedTestId);

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Mock Tests & Assessment Results</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Standardized examination results and percentile evaluations. Current Mock Average: <strong className="text-amber-600">78 / 100</strong>.
          </p>
        </div>
        <Badge variant="indigo" size="md">
          Mock Test Weight: 24% in ML Prediction
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Mock Average</span>
          <div className="mt-2 text-3xl font-black text-amber-600">78 / 100</div>
          <span className="text-xs text-slate-400">Target &gt;80</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Previous Score</span>
          <div className="mt-2 text-3xl font-black text-indigo-600">80 / 100</div>
          <span className="text-xs text-emerald-600 font-semibold">Midterm benchmark</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cohort Percentile</span>
          <div className="mt-2 text-3xl font-black text-slate-900">84.2%</div>
          <span className="text-xs text-emerald-600 font-semibold">Top quartile rank</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tests Completed</span>
          <div className="mt-2 text-3xl font-black text-slate-900">4 of 6</div>
          <span className="text-xs text-slate-400">2 upcoming</span>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="space-y-4">
        {ASSESSMENTS_DATA.map((t) => {
          const isCompleted = t.status === 'Completed';

          return (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {t.id}
                    </span>
                    <Badge variant={isCompleted ? 'emerald' : 'amber'} size="sm" dot>
                      {t.status}
                    </Badge>
                    <span className="text-xs text-slate-400">• {t.type}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{t.title}</h3>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  {isCompleted ? (
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Score Achieved</div>
                      <div className="text-2xl font-black text-slate-900">
                        {t.studentScore} <span className="text-sm font-semibold text-slate-400">/ {t.totalMarks}</span>
                      </div>
                    </div>
                  ) : (
                    <Badge variant="amber" size="md">Scheduled</Badge>
                  )}
                </div>
              </div>

              {/* Bottom Details & Review Solution CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Date: <strong className="text-slate-700">{t.date}</strong></span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Duration: <strong className="text-slate-700">{t.durationMinutes} mins</strong></span>
                  </span>
                  {t.rank && (
                    <span>Batch Rank: <strong className="text-indigo-600 font-bold">{t.rank}</strong></span>
                  )}
                </div>

                {isCompleted ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTestId(t.id)}
                  >
                    Review Solutions & Key
                  </Button>
                ) : (
                  <span className="text-xs text-slate-400 italic">
                    Portal opens 15 minutes before test time
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Answer Key Review Modal */}
      {selectedTest && (
        <Modal
          isOpen={!!selectedTestId}
          onClose={() => setSelectedTestId(null)}
          title="Assessment Solutions & Review"
          subtitle={`${selectedTest.title} (Your Score: ${selectedTest.studentScore}/${selectedTest.totalMarks})`}
          footer={
            <Button size="sm" onClick={() => setSelectedTestId(null)}>
              Close Review
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex justify-between items-center">
              <div>
                <span className="font-bold text-indigo-900 block">{selectedTest.title}</span>
                <span className="text-slate-600">Batch Average: {selectedTest.batchAverage} | Top Score: {selectedTest.highestScore}</span>
              </div>
              <Badge variant="indigo" size="md">Percentile: {selectedTest.percentile}%</Badge>
            </div>

            {/* Questions Sample */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Q1: In Python, what is the time complexity of dictionary key lookups?</span>
                  <Badge variant="emerald" size="sm">Correct (+5)</Badge>
                </div>
                <p className="text-emerald-800">Your answer: <strong>O(1) average case</strong></p>
                <p className="text-[11px] text-slate-500">Explanation: Python dicts use open-address hash tables with perturbation sequences for fast average constant lookup.</p>
              </div>

              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Q2: Which Django ORM method mitigates N+1 queries on foreign keys?</span>
                  <Badge variant="emerald" size="sm">Correct (+5)</Badge>
                </div>
                <p className="text-emerald-800">Your answer: <strong>select_related()</strong></p>
                <p className="text-[11px] text-slate-500">Explanation: select_related performs a SQL JOIN to cache single-valued relationships in the initial query.</p>
              </div>

              <div className="p-3.5 bg-rose-50/70 border border-rose-200/80 rounded-xl space-y-1.5">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span>Q3: What evaluation metric penalizes larger regression errors most heavily?</span>
                  <Badge variant="rose" size="sm">Incorrect (0)</Badge>
                </div>
                <p className="text-rose-800">Your answer: <strong>MAE (Mean Absolute Error)</strong></p>
                <p className="text-emerald-700 font-semibold">Correct Answer: <strong>MSE / RMSE (Mean Squared Error)</strong></p>
                <p className="text-[11px] text-slate-500">Explanation: Squaring errors in MSE and RMSE amplifies large outlier residuals disproportionately.</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


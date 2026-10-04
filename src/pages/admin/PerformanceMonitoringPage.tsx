import React from 'react';
import { TrendingUp, AlertTriangle, Users, Award, ShieldCheck, Mail, Calendar, CheckCircle2 } from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface PerformanceMonitoringPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const PerformanceMonitoringPage: React.FC<PerformanceMonitoringPageProps> = ({ onShowToast }) => {
  const atRisk = STUDENTS_DATA.filter(s => s.performanceIndicator === 'Needs Attention');
  const moderate = STUDENTS_DATA.filter(s => s.performanceIndicator === 'Average');
  const safe = STUDENTS_DATA.filter(s => s.performanceIndicator === 'Good' || s.performanceIndicator === 'Distinction');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Performance Monitoring & Early Warnings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Proactive intervention system identifying students falling below academic retention thresholds.
        </p>
      </div>

      {/* Cohort Risk Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-emerald-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Safe Tier (&ge;75)</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">{safe.length} Candidates</div>
          <p className="text-xs text-slate-500">Includes Rahul Sen (83.7) & Debolina Dutta (91.2). On track for top tier placements.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-amber-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Moderate Tier (60-74)</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-700">{moderate.length} Candidates</div>
          <p className="text-xs text-slate-500">Includes Ananya Roy (72.4). Require focus on mock test score improvements.</p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-rose-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">At-Risk Tier (&lt;60)</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-rose-700">{atRisk.length} Flagged</div>
          <p className="text-xs text-slate-500">Includes Sourav Paul (58.6) & Tanmoy Sengupta (59.2). Low attendance & practice.</p>
        </div>
      </div>

      {/* Early Warning Dossier Roster */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Intervention Dossier (Flagged Candidates)</h3>
            <p className="text-xs text-slate-500">Trigger direct academic counseling and faculty tutoring</p>
          </div>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onShowToast('success', 'Tutoring Invites Dispatched', 'Automated meeting invitations sent to all 2 flagged students.')}
          >
            Dispatch Remedial Invites
          </Button>
        </div>

        <div className="space-y-4">
          {atRisk.map((st) => (
            <div
              key={st.id}
              className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <img src={st.avatar} alt={st.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-rose-200 shrink-0" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900">{st.name}</h4>
                    <Badge variant="rose" size="sm">Score: {st.predictedScore}</Badge>
                  </div>
                  <p className="text-xs text-slate-600">{st.enrolledCourseName} • ID: {st.id}</p>
                  <p className="text-xs text-rose-700 italic">{st.notes}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-rose-100 text-center min-w-20">
                  <span className="text-[10px] text-slate-400 block">Attendance</span>
                  <strong className="text-rose-600 font-mono text-sm">{st.attendance}%</strong>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-rose-100 text-center min-w-20">
                  <span className="text-[10px] text-slate-400 block">Practice</span>
                  <strong className="text-rose-600 font-mono text-sm">{st.practiceHours}h/wk</strong>
                </div>
                <div className="p-2.5 bg-white rounded-xl border border-rose-100 text-center min-w-20">
                  <span className="text-[10px] text-slate-400 block">Mock Tests</span>
                  <strong className="text-rose-600 font-mono text-sm">{st.mockTestAvg}</strong>
                </div>

                <Button
                  size="sm"
                  onClick={() => onShowToast('info', `Mentorship Session Scheduled`, `1-on-1 scheduled for ${st.name} with Dr. Aris Banerjee.`)}
                >
                  Schedule 1-on-1
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


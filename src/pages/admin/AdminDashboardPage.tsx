import React from 'react';
import { 
  Users, 
  BookOpen, 
  CalendarCheck2, 
  Sparkles, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight, 
  GraduationCap, 
  CheckCircle2, 
  Clock,
  ArrowRight,
  Filter
} from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { COURSES } from '../../data/coursesData';
import { ENROLMENTS_DATA } from '../../data/enrolmentsData';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface AdminDashboardPageProps {
  onNavigate: (view: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const atRiskStudents = STUDENTS_DATA.filter(s => s.performanceIndicator === 'Needs Attention');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Academic Intelligence Suite
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Administration & Faculty Portal</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Real-time cohort monitoring, supervised linear regression prediction analytics, and student management for ABC Academy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={() => onNavigate('admin-predictions')}
          >
            ML Prediction Hub
          </Button>
          <Button
            size="sm"
            icon={<Users className="w-4 h-4" />}
            onClick={() => onNavigate('admin-students')}
          >
            Manage Students
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Students"
          value="1,420"
          subtitle="across 6 programs"
          icon={<Users className="w-5 h-5" />}
          accentColor="indigo"
          trend={{ value: '+12% this month', positive: true }}
          onClick={() => onNavigate('admin-students')}
        />
        <StatCard
          title="Active Courses"
          value="6"
          subtitle="12 active batches"
          icon={<BookOpen className="w-5 h-5" />}
          accentColor="blue"
          onClick={() => onNavigate('admin-courses')}
        />
        <StatCard
          title="Avg Attendance"
          value="84.2%"
          subtitle="target >80%"
          icon={<CalendarCheck2 className="w-5 h-5" />}
          accentColor="emerald"
          trend={{ value: '+1.5% compliance', positive: true }}
          onClick={() => onNavigate('admin-attendance')}
        />
        <StatCard
          title="Predicted Mean"
          value="78.4"
          subtitle="Linear Reg score"
          icon={<Sparkles className="w-5 h-5" />}
          accentColor="purple"
          trend={{ value: 'R² = 0.912', positive: true }}
          onClick={() => onNavigate('admin-predictions')}
        />
        <StatCard
          title="At-Risk Alerts"
          value={atRiskStudents.length}
          subtitle="score < 60 pts"
          icon={<AlertTriangle className="w-5 h-5" />}
          accentColor="rose"
          trend={{ value: 'Action required', positive: false }}
          onClick={() => onNavigate('admin-performance')}
        />
      </div>

      {/* Two Column Layout: Cohort Score Distribution + Early Warning Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cohort Performance Breakdown */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Cohort Predicted Score Distribution</h3>
              <p className="text-xs text-slate-500">Supervised Linear Regression classifications across active students</p>
            </div>
            <Badge variant="indigo" size="sm">Active Model v2.4</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100">
              <span className="text-xs text-indigo-700 font-semibold block">Distinction (&ge;85)</span>
              <div className="text-2xl font-black text-indigo-900 mt-1">28%</div>
              <span className="text-[10px] text-indigo-600">398 students</span>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
              <span className="text-xs text-emerald-700 font-semibold block">Good (75-84)</span>
              <div className="text-2xl font-black text-emerald-900 mt-1">44%</div>
              <span className="text-[10px] text-emerald-600">625 students (e.g. Rahul)</span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100">
              <span className="text-xs text-amber-700 font-semibold block">Average (60-74)</span>
              <div className="text-2xl font-black text-amber-900 mt-1">21%</div>
              <span className="text-[10px] text-amber-600">298 students (e.g. Ananya)</span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
              <span className="text-xs text-rose-700 font-semibold block">At-Risk (&lt;60)</span>
              <div className="text-2xl font-black text-rose-900 mt-1">7%</div>
              <span className="text-[10px] text-rose-600">99 students (e.g. Sourav)</span>
            </div>
          </div>

          {/* Mini preview table of key reference students (PDF Page 11 Table 22.8) */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 uppercase tracking-wider">Reference Student Benchmarks (PDF Section 22.8)</span>
              <button
                onClick={() => onNavigate('admin-students')}
                className="text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer"
              >
                View Complete Cohort →
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Student</th>
                    <th className="py-2.5 px-4">Enrolled Course</th>
                    <th className="py-2.5 px-4">Attendance</th>
                    <th className="py-2.5 px-4">Predicted Score</th>
                    <th className="py-2.5 px-4">Indicator</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STUDENTS_DATA.slice(0, 3).map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-slate-900 flex items-center gap-2">
                        <img src={st.avatar} alt={st.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{st.name}</span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-600">{st.enrolledCourseName}</td>
                      <td className="py-2.5 px-4 font-mono">{st.attendance}%</td>
                      <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{st.predictedScore}</td>
                      <td className="py-2.5 px-4">
                        <Badge
                          variant={st.performanceIndicator === 'Good' ? 'emerald' : st.performanceIndicator === 'Average' ? 'amber' : 'rose'}
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

        {/* Early Warning Alert Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Early Warning Alerts</h3>
                <p className="text-xs text-slate-400">Students flagged below 60.0 threshold</p>
              </div>
            </div>

            <div className="space-y-3">
              {atRiskStudents.map((st) => (
                <div key={st.id} className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{st.name}</span>
                    <Badge variant="rose" size="sm">{st.predictedScore} pts</Badge>
                  </div>
                  <p className="text-[11px] text-slate-600">{st.notes}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-rose-200/60">
                    <span>Attendance: <strong>{st.attendance}%</strong></span>
                    <span>Practice: <strong>{st.practiceHours}h/wk</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="danger"
            size="sm"
            className="w-full text-center mt-4"
            onClick={() => {
              onShowToast('info', 'Academic Support Triggered', 'Personal counseling invites dispatched to flagged students.');
            }}
          >
            Schedule Remedial Tutoring
          </Button>
        </div>
      </div>
    </div>
  );
};


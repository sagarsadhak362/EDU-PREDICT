import React from 'react';
import { 
  Sparkles, 
  CalendarCheck2, 
  FileText, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { COURSES } from '../../data/coursesData';
import { ASSIGNMENTS_DATA } from '../../data/assignmentsData';
import { ASSESSMENTS_DATA } from '../../data/assessmentsData';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { TrendLineChart } from '../../components/charts/TrendLineChart';

interface StudentDashboardPageProps {
  onNavigate: (view: string) => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({ onNavigate }) => {
  // Rahul Sen reference student from PDF
  const student = STUDENTS_DATA[0];
  const course = COURSES.find(c => c.id === student.enrolledCourseId) || COURSES[0];

  const trendData = [
    { label: 'Wk 2', score: 72, benchmark: 70 },
    { label: 'Wk 4', score: 76, benchmark: 72 },
    { label: 'Wk 6', score: 80, benchmark: 73 },
    { label: 'Wk 8', score: 78, benchmark: 74 },
    { label: 'Wk 10', score: 82, benchmark: 75 },
    { label: 'Wk 12', score: 84, benchmark: 75 },
    { label: 'Current', score: 83.7, benchmark: 76 },
  ];

  return (
    <div className="space-y-8">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden border border-indigo-800/60">
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-400/40 shadow-md shrink-0"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">{student.name}</h1>
                <Badge variant="indigo" size="sm">Active Student</Badge>
              </div>
              <p className="text-xs sm:text-sm text-indigo-200">
                Enrolled in <strong className="text-white">{student.enrolledCourseName}</strong>
              </p>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-300 pt-1">
                <span>ID: <strong className="text-slate-100 font-mono">EP-2026-0842</strong></span>
                <span>•</span>
                <span>Batch: <strong className="text-slate-100">KOL-2026-B1</strong></span>
                <span>•</span>
                <span>Mentor: <strong className="text-slate-100">Dr. Aris Banerjee</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => onNavigate('student-courses')}
            >
              Course Modules
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => onNavigate('student-prediction')}
            >
              ML Prediction Simulator
            </Button>
          </div>
        </div>
      </div>

      {/* Primary Academic Metrics Grid (from PDF Section 22.4) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Attendance"
          value={`${student.attendance}%`}
          subtitle="44/50 sessions"
          icon={<CalendarCheck2 className="w-5 h-5" />}
          accentColor="indigo"
          trend={{ value: '+2.0%', positive: true, label: 'above target' }}
          onClick={() => onNavigate('student-attendance')}
        />
        <StatCard
          title="Assignment Avg"
          value={`${student.assignmentAvg}/100`}
          subtitle="5 graded tasks"
          icon={<FileText className="w-5 h-5" />}
          accentColor="emerald"
          trend={{ value: 'Top 15%', positive: true }}
          onClick={() => onNavigate('student-assignments')}
        />
        <StatCard
          title="Mock Test Avg"
          value={`${student.mockTestAvg}/100`}
          subtitle="3 mock assessments"
          icon={<Award className="w-5 h-5" />}
          accentColor="amber"
          trend={{ value: '+4.0%', positive: true, label: 'vs last test' }}
          onClick={() => onNavigate('student-assessments')}
        />
        <StatCard
          title="Practice Hours"
          value={`${student.practiceHours} hrs`}
          subtitle="weekly IDE coding"
          icon={<Clock className="w-5 h-5" />}
          accentColor="purple"
          trend={{ value: 'Target 10h', positive: true }}
          onClick={() => onNavigate('student-performance')}
        />
        <StatCard
          title="Modules Done"
          value={`${student.modulesCompleted}%`}
          subtitle="7 of 8 modules"
          icon={<BookOpen className="w-5 h-5" />}
          accentColor="blue"
          trend={{ value: 'On schedule', positive: true }}
          onClick={() => onNavigate('student-courses')}
        />
      </div>

      {/* ML Prediction Highlight Banner (PDF Section 22.7) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-200/80 shadow-md relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                  Linear Regression Performance Prediction
                </h3>
                <p className="text-xs text-slate-400">Continuous supervised regression model</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Based on your attendance (<strong className="text-slate-800">88%</strong>), assignment average (<strong className="text-slate-800">84</strong>), mock test average (<strong className="text-slate-800">78</strong>), and weekly practice hours (<strong className="text-slate-800">10h</strong>), the EDU-PREDICT model forecasts your final score at:
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-900 tracking-tight">83.7</span>
                <span className="text-sm font-semibold text-slate-400">/ 100</span>
              </div>
              <Badge variant="emerald" size="lg" dot>
                Performance Indicator: Good
              </Badge>
              <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-1 rounded-lg">
                1.3 pts away from Distinction (&gt;85)
              </span>
            </div>
          </div>

          {/* Quick simulator trigger CTA card */}
          <div className="p-5 bg-gradient-to-br from-slate-50 to-indigo-50/50 rounded-2xl border border-indigo-100 text-center w-full lg:w-72 shrink-0 space-y-3">
            <span className="text-xs font-bold text-indigo-900 block">Want to simulate improvements?</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Test how increasing your mock test score or practice hours can lift your predicted final grade.
            </p>
            <Button
              className="w-full text-center"
              size="sm"
              onClick={() => onNavigate('student-prediction')}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Open ML Simulator
            </Button>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Academic Progression Chart + Next Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Academic Progress Trend */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Academic Score Trajectory</h3>
              <p className="text-xs text-slate-400">Bi-weekly performance tracking vs cohort target</p>
            </div>
            <button
              onClick={() => onNavigate('student-performance')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
            >
              Full Analytics →
            </button>
          </div>

          <div className="pt-2">
            <TrendLineChart data={trendData} title="Rahul's Semester Trend" height={220} />
          </div>
        </div>

        {/* Next Milestones & Upcoming Items */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
            Upcoming Milestones
          </h3>

          <div className="space-y-3 text-xs">
            {/* Upcoming Assessment */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="amber" size="sm">Mock Test 4</Badge>
                <span className="text-[11px] font-semibold text-amber-800">Oct 12, 10:00 AM</span>
              </div>
              <p className="font-bold text-slate-800">Full Stack React & DRF Integration</p>
              <p className="text-[11px] text-slate-500">120 Minutes • 100 Marks • Timed assessment</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-center bg-white"
                onClick={() => onNavigate('student-assessments')}
              >
                View Test Syllabus
              </Button>
            </div>

            {/* Pending Assignment */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="slate" size="sm">Assignment 6</Badge>
                <span className="text-[11px] font-semibold text-slate-600">Due Oct 15</span>
              </div>
              <p className="font-bold text-slate-800">ML Prediction Pipeline Integration</p>
              <p className="text-[11px] text-slate-500">Connect frontend React app to Linear Regression endpoint</p>
              <Button
                size="sm"
                className="w-full text-center"
                onClick={() => onNavigate('student-assignments')}
              >
                Submit Project Files
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


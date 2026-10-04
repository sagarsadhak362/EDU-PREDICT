import React from 'react';
import { BookOpen, CheckCircle2, Clock, Download, ExternalLink, Play, Layers, Award, Sparkles } from 'lucide-react';
import { COURSES } from '../../data/coursesData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface StudentCoursesPageProps {
  onNavigate: (view: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentCoursesPage: React.FC<StudentCoursesPageProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const activeCourse = COURSES[0]; // Python + Django Full Stack Development

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Courses & Enrolments</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Active programs, module progression, and learning resources at ABC Academy.
        </p>
      </div>

      {/* Active Course Master Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="indigo" size="sm">Active Enrolment</Badge>
              <Badge variant="emerald" size="sm">90% Completed</Badge>
              <span className="text-xs text-slate-400">Batch: KOL-2026-B1</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{activeCourse.title}</h2>
            <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
              {activeCourse.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={() => onShowToast('info', 'Syllabus Downloaded', 'The full curriculum document is saved.')}
            >
              Curriculum PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => onNavigate('student-prediction')}
            >
              ML Score Forecast
            </Button>
          </div>
        </div>

        {/* Course Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">Course Syllabus Progress</span>
            <span className="font-mono font-bold text-indigo-600">90% Completed</span>
          </div>
          <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-700" style={{ width: '90%' }} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>5 Modules Finished</span>
            <span>Module 6 In Progress (Final Capstone & ML Viva)</span>
          </div>
        </div>

        {/* Modules Breakdown Checklist */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Course Modules & Milestones</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeCourse.syllabus.map((mod, idx) => {
              const isCompleted = idx < 5;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCompleted
                      ? 'bg-slate-50/60 border-slate-200'
                      : 'bg-indigo-50/40 border-indigo-200 ring-1 ring-indigo-500/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 rounded-full p-1 ${isCompleted ? 'text-emerald-600 bg-emerald-50' : 'text-indigo-600 bg-indigo-50'}`}>
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{mod.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{mod.description}</p>
                        <span className="inline-block text-[10px] text-slate-400 font-medium mt-2">{mod.weeks}</span>
                      </div>
                    </div>

                    <Badge variant={isCompleted ? 'emerald' : 'indigo'} size="sm">
                      {isCompleted ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Resources Bar */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-indigo-600" />
            <div>
              <span className="font-bold text-slate-800 block">Certificate Readiness Status</span>
              <span className="text-slate-500 text-[11px]">88% attendance & 83.7 predicted score qualify for certification upon final capstone review.</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShowToast('info', 'Certificate Preview', 'Credential generation unlocks upon Module 6 completion.')}
          >
            Preview Credential
          </Button>
        </div>
      </div>
    </div>
  );
};


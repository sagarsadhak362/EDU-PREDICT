import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  BookOpen, 
  CalendarCheck2, 
  FileText, 
  Award, 
  TrendingUp, 
  Sparkles, 
  Bell, 
  Users, 
  GraduationCap, 
  Layers, 
  ClipboardCheck, 
  FileSpreadsheet, 
  BarChart2, 
  Sliders, 
  ShieldCheck, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Role } from '../../types';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  role: Role;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate, role }) => {
  const studentNavItems = [
    { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'student-profile', label: 'Student Profile', icon: User },
    { id: 'student-courses', label: 'My Enrolments', icon: BookOpen },
    { id: 'student-attendance', label: 'Attendance', icon: CalendarCheck2 },
    { id: 'student-assignments', label: 'Assignments', icon: FileText },
    { id: 'student-assessments', label: 'Mock Tests & Results', icon: Award },
    { id: 'student-performance', label: 'Academic Performance', icon: TrendingUp },
    { 
      id: 'student-prediction', 
      label: 'Predicted Final Score', 
      icon: Sparkles,
      highlight: true,
      badge: 'ML AI'
    },
    { id: 'student-notifications', label: 'Notifications', icon: Bell },
  ];

  const adminNavItems = [
    { section: 'Overview' },
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { section: 'Academic Management' },
    { id: 'admin-students', label: 'Student Management', icon: Users },
    { id: 'admin-faculty', label: 'Faculty Management', icon: GraduationCap },
    { id: 'admin-courses', label: 'Course Management', icon: BookOpen },
    { id: 'admin-categories', label: 'Category Management', icon: Layers },
    { id: 'admin-enrolments', label: 'Enrolments', icon: ClipboardCheck },
    { section: 'Evaluation & Activity' },
    { id: 'admin-attendance', label: 'Attendance System', icon: CalendarCheck2 },
    { id: 'admin-assignments', label: 'Assignment Grading', icon: FileText },
    { id: 'admin-assessments', label: 'Assessments & Marks', icon: Award },
    { section: 'Intelligence & Insights' },
    { id: 'admin-performance', label: 'Performance Monitor', icon: TrendingUp },
    { 
      id: 'admin-predictions', 
      label: 'ML Prediction Hub', 
      icon: Sparkles, 
      highlight: true,
      badge: 'Linear Reg'
    },
    { id: 'admin-reports', label: 'Reports & Analytics', icon: BarChart2 },
    { section: 'System' },
    { id: 'admin-notifications', label: 'Announcements', icon: Bell },
    { id: 'admin-settings', label: 'System Settings', icon: Sliders },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] flex flex-col justify-between p-3.5 select-none shrink-0 hidden lg:flex">
      <div className="space-y-1">
        {/* Portal Identifier */}
        <div className="px-3 py-2.5 mb-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {role === 'student' ? (
              <User className="w-4 h-4 text-indigo-600" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
            )}
            <span className="text-xs font-bold text-slate-800">
              {role === 'student' ? 'Student Workspace' : 'Admin & Faculty Suite'}
            </span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-100/80 text-indigo-700">
            {role === 'student' ? 'Active' : 'Admin'}
          </span>
        </div>

        {/* Navigation list */}
        <nav className="space-y-0.5">
          {role === 'student' ? (
            studentNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                      : item.highlight
                      ? 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            adminNavItems.map((item, idx) => {
              if (item.section) {
                return (
                  <div
                    key={`sec-${idx}`}
                    className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pt-3 pb-1"
                  >
                    {item.section}
                  </div>
                );
              }

              const Icon = item.icon!;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id!)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                      : item.highlight
                      ? 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-white/20 text-white' : 'bg-indigo-600 text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </nav>
      </div>

      {/* Sidebar Footer Info Card */}
      <div className="p-3 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl shadow-xs mt-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span className="text-[11px] font-bold text-slate-200">ML Engine Active</span>
        </div>
        <p className="text-[10px] text-slate-300 leading-relaxed">
          Model: Supervised Linear Regression (R² = 0.912, Target: Final_Score)
        </p>
      </div>
    </aside>
  );
};


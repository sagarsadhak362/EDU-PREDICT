import React from 'react';
import { GraduationCap, Mail, Phone, Star, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { FACULTY_DATA } from '../../data/facultyData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface FacultyPageProps {
  onNavigate: (view: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = ({ onNavigate, onShowToast }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>Academic Leadership</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Distinguished Faculty & Research Fellows
        </h1>
        <p className="text-sm text-slate-500">
          Learn from enterprise software architects, machine learning scientists, and systems researchers dedicated to individual student mentorship.
        </p>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {FACULTY_DATA.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start"
          >
            <img
              src={fac.avatar}
              alt={fac.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-2 ring-indigo-100 shrink-0 shadow-sm"
            />

            <div className="space-y-3 flex-1 min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{fac.name}</h3>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{fac.rating}</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-indigo-600 mt-0.5">{fac.title}</p>
                <p className="text-[11px] text-slate-400">{fac.department} • {fac.experience} Experience</p>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider">Specialization:</span>
                <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {fac.specialization}
                </p>
              </div>

              <div className="space-y-1 text-xs">
                <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider">Assigned Programs:</span>
                <div className="flex flex-wrap gap-1">
                  {fac.coursesAssigned.map((course, i) => (
                    <span key={i} className="text-[10px] bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded-md border border-indigo-100">
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-100">
                <span>{fac.studentsCount} Active Students Mentored</span>
                <button
                  onClick={() => onShowToast('info', `Faculty Office Hours`, `${fac.name} is available Mon-Fri 4-6 PM IST.`)}
                  className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  Office Hours
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


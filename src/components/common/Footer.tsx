import React from 'react';
import { GraduationCap, MapPin, Mail, Phone, ExternalLink, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Institute Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">EDU-PREDICT</span>
                <span className="ml-1.5 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">AI</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              ABC Academy is an AI-enabled professional technology institute offering industry-grade courses in Python, Django, Full Stack, Data Science, and Machine Learning with real-time academic performance prediction.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Sector V, Salt Lake City, Kolkata, WB 700091</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>admissions@abcacademy.edu</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>+91 98300 12345 / (033) 2357-8900</span>
              </div>
            </div>
          </div>

          {/* Academic Courses */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Academic Programs</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Python + Django Full Stack
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Professional Python Programming
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Applied Machine Learning & ML
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Enterprise Django & DRF
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Data Science & Analytics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-white transition-colors cursor-pointer">
                  Artificial Intelligence & Neural Nets
                </button>
              </li>
            </ul>
          </div>

          {/* SEO Targeted Queries (PDF Page 5) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">SEO Targeted Tracks</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span>Python course in Kolkata</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span>Django web framework course</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span>Machine learning course</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span>Full stack development course</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-400" />
                <span>Linear regression prediction in education</span>
              </li>
            </ul>
          </div>

          {/* Quick Portal Switcher */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Direct Portals</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('student-dashboard')} className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer">
                  → Student Portal (Rahul Sen)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin-dashboard')} className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer">
                  → Admin / Faculty Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('student-prediction')} className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium cursor-pointer">
                  → ML Prediction Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  → About ABC Academy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                  → Contact & Admissions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Attribution & Scope Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 EDU-PREDICT — AI-Based Student Performance & Academic Management System. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              Frontend & UI/UX Scope
            </span>
            <span className="px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/60 text-[11px] text-indigo-400 font-mono">
              React + Tailwind + Supervised Linear Regression
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};


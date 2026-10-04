import React from 'react';
import { Sparkles, Award, Users, BookOpen, CheckCircle, GraduationCap, MapPin, Target, Compass, HeartHandshake } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface AboutPageProps {
  onNavigate: (view: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>About ABC Academy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Pioneering AI-Guided Professional Engineering Education
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Founded as an advanced technology institute, ABC Academy bridges high-demand industry skills in Python, Django, Full Stack, and Machine Learning with real-time academic predictive intelligence.
        </p>
      </div>

      {/* Vision & Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Core Mission</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            To provide transparent, data-driven academic pathways that eliminate academic guesswork through early machine learning intervention and individual mentorship.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Pedagogical Philosophy</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Continuous evaluation combining hands-on IDE lab practice hours, weekly graded assignments, and adaptive mock assessments aligned with real-world industry demands.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Predictive AI Innovation</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Pioneering the application of Supervised Linear Regression to calculate expected final academic scores, empowering faculty to intervene before critical examination milestones.
          </p>
        </div>
      </div>

      {/* Institute Campus & Location (Salt Lake, Kolkata) */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <MapPin className="w-4 h-4" /> Physical Campus & Virtual Labs
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Center of Excellence in Salt Lake Sector V, Kolkata
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Our campus is situated in the heart of Kolkata's premier IT hub. Featuring high-throughput data science computer laboratories, collaborative project work bays, and interactive hybrid streaming infrastructure for remote learners.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Gigabit Cloud Workstations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>1-on-1 Faculty Mentorship</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Placement Support Cell</span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center w-full lg:w-72 shrink-0">
          <div className="text-3xl font-black text-indigo-300">14+</div>
          <div className="text-xs font-semibold text-slate-200 mt-1">Years of Excellence</div>
          <div className="my-4 border-t border-white/10" />
          <div className="text-3xl font-black text-emerald-400">98.4%</div>
          <div className="text-xs font-semibold text-slate-200 mt-1">Placement Rate</div>
          <div className="my-4 border-t border-white/10" />
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => onNavigate('contact')}
          >
            Visit Our Campus
          </Button>
        </div>
      </div>
    </div>
  );
};


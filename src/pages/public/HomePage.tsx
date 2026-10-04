import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Award, 
  Star, 
  Clock, 
  Cpu, 
  Layers, 
  GraduationCap, 
  BarChart2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { COURSES, COURSE_CATEGORIES } from '../../data/coursesData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface HomePageProps {
  onNavigate: (view: string, courseId?: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectCourse }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredCourses = COURSES.slice(0, 3);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('courses');
  };

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/60">
        {/* Decorative background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-200/30 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI-Enabled Academic Management Platform</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Master Engineering with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700">Predictive AI</span> Mentorship
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              ABC Academy combines rigorous professional training in Python, Django, Full Stack, and Machine Learning with real-time academic score prediction powered by Linear Regression.
            </p>

            {/* Quick Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto pt-2">
              <div className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-indigo-500/5 border border-slate-200 p-1.5 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Search Python, Django, Machine Learning..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                <Button type="submit" size="md">
                  Explore Courses
                </Button>
              </div>
            </form>

            {/* Category Quick Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="text-slate-400 font-medium">Popular:</span>
              {['Python course in Kolkata', 'Django REST', 'Machine Learning', 'Full Stack'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onNavigate('courses')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 transition-colors shadow-2xs cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs max-w-5xl mx-auto">
            <div className="text-center p-3 border-r border-slate-100 last:border-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">98.4%</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Placement Success Rate</div>
            </div>
            <div className="text-center p-3 border-r border-slate-100 last:border-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">1,420+</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Active Students</div>
            </div>
            <div className="text-center p-3 border-r border-slate-100 last:border-0">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">0.912</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">ML Model R² Accuracy</div>
            </div>
            <div className="text-center p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">4.9 / 5.0</div>
              <div className="text-xs font-semibold text-slate-500 mt-1">Student Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
              <BookOpen className="w-4 h-4" /> Professional Curriculum
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Industry-Standard Career Programs</h2>
            <p className="text-sm text-slate-500 mt-1">Designed by senior technical architects with integrated ML progress forecasting.</p>
          </div>
          <Button variant="outline" onClick={() => onNavigate('courses')} icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
            Browse All 6 Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Course Header Banner */}
                <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-indigo-50/30">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="indigo" size="sm">
                      {course.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Course Details Info */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{course.duration} ({course.hours}h)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <span>{course.level}</span>
                    </div>
                  </div>

                  {/* Instructor teaser */}
                  <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                    <img
                      src={course.facultyAvatar}
                      alt={course.faculty}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-800">{course.faculty}</div>
                      <div className="text-[10px] text-slate-400 line-clamp-1">{course.facultyTitle}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Tuition</div>
                  <div className="text-base font-extrabold text-slate-900">{course.price}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      onSelectCourse(course.id);
                      onNavigate('course-detail', course.id);
                    }}
                  >
                    Syllabus
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      onSelectCourse(course.id);
                      onNavigate('course-detail', course.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Study Feature: Rahul Sen's End-to-End Journey (PDF Section 22) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-slate-800">
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Reference Case Study (PDF Section 22)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              See Rahul's Journey Through the EDU-PREDICT System
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Rahul Sen searched Google for <em>"Python course in Kolkata"</em>, registered at ABC Academy, enrolled in the Python + Django Full Stack track, completed assignments and mock tests, and received a real-time Linear Regression predicted final score of <strong>83.7 / 100 ("Good")</strong>.
            </p>

            {/* Quick KPI stats box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400">Attendance</div>
                <div className="text-xl font-extrabold text-white mt-0.5">88%</div>
                <div className="text-[10px] text-emerald-400">Target &gt;85% met</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400">Assignment Average</div>
                <div className="text-xl font-extrabold text-white mt-0.5">84 / 100</div>
                <div className="text-[10px] text-indigo-400">5 submissions graded</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-xs text-slate-400">Predicted Final Score</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-0.5">83.7 / 100</div>
                <div className="text-[10px] text-emerald-300">Indicator: Good</div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                onClick={() => onNavigate('student-dashboard')}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Inspect Rahul's Student Portal
              </Button>
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30"
                onClick={() => onNavigate('student-prediction')}
              >
                Launch ML Prediction Simulator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Domain Collaborative Framework (PDF Section 20) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Architectural Synergy</div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">The 7-Domain Collaborative Stack</h2>
          <p className="text-sm text-slate-500 mt-1">
            How each student department contributes to one unified educational platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Digital Marketing & SEO', role: 'Keywords, SEO titles, "Python course in Kolkata", landing pages, Google search intent.', icon: BarChart2, badge: 'Discovery' },
            { title: 'UI/UX Design', role: 'Design system, Figma wireframes, typography, responsive student & admin layouts.', icon: Layers, badge: 'Design System' },
            { title: 'HTML & Tailwind CSS', role: 'Accessible responsive templates, card components, form controls, modern utility styles.', icon: Layers, badge: 'Frontend UI' },
            { title: 'React Frontend', role: 'Interactive SPAs, state management, modal controllers, and simulated ML calculator.', icon: Cpu, badge: 'Client Engine' },
            { title: 'Python / Django (Architecture)', role: 'REST API blueprints, authentication models, attendance tracking, and serializing ML output.', icon: ShieldCheck, badge: 'Backend Scope' },
            { title: 'Machine Learning (Linear Regression)', role: 'Supervised regression pipeline predicting Final_Score from attendance and mock tests.', icon: Sparkles, badge: 'Predictive AI' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="slate" size="sm">{item.badge}</Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.role}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};


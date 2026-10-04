import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Star, 
  Layers, 
  ShieldCheck, 
  Share2, 
  Sparkles,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { COURSES } from '../../data/coursesData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

interface CourseDetailPageProps {
  courseId: string;
  onNavigate: (view: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  onNavigate,
  onShowToast,
}) => {
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);

  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];

  const handleEnrollConfirm = () => {
    setEnrollModalOpen(false);
    onShowToast('success', 'Enrolment Application Received!', `You are now provisionally registered for ${course.title}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => onNavigate('courses')}
          className="flex items-center gap-1 hover:text-indigo-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </button>
        <span>/</span>
        <span className="text-slate-400">{course.category}</span>
        <span>/</span>
        <span className="font-semibold text-slate-700 truncate">{course.title}</span>
      </div>

      {/* Main Course Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Details & Syllabus */}
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="indigo">{course.category}</Badge>
              <Badge variant="slate">{course.level}</Badge>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500 ml-2">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal">({course.enrolledCount} learners)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {course.longDescription}
            </p>
          </div>

          {/* Key Learning Highlights */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">What You Will Master</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Object-Oriented Design and scalable software paradigms</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Relational databases, indexing, and PostgreSQL query tuning</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Django REST Framework APIs with tokenized authentication</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Consuming ML Linear Regression prediction endpoints in React</span>
              </div>
            </div>
          </div>

          {/* Detailed Syllabus Accordion */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">Curriculum & Syllabus</h3>
                <p className="text-xs text-slate-500">{course.syllabus.length} structured modules covering industry competency</p>
              </div>
              <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                {course.duration}
              </span>
            </div>

            <div className="space-y-3">
              {course.syllabus.map((mod, idx) => {
                const isOpen = openModuleIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs"
                  >
                    <button
                      onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">{mod.title}</h4>
                          <span className="text-[11px] text-slate-400 font-medium">{mod.weeks}</span>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-1 pb-4 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed">
                        {mod.description}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Instructor Bio Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Lead Academic Instructor</h3>
            <div className="flex items-start gap-4">
              <img
                src={course.facultyAvatar}
                alt={course.faculty}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-100 shrink-0"
              />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">{course.faculty}</h4>
                <p className="text-xs text-indigo-600 font-medium">{course.facultyTitle}</p>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  14+ years of enterprise software architecture experience. Specializes in scalable backend systems, Django ORM profiling, and machine learning pipeline integration.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Enrollment Card */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-lg sticky top-24 space-y-6">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Tuition Investment</span>
              <div className="text-3xl font-black text-slate-900 mt-1">{course.price}</div>
              <span className="text-xs text-emerald-600 font-semibold">EMI options available from ₹4,750/mo</span>
            </div>

            <Button
              className="w-full text-center"
              size="lg"
              onClick={() => setEnrollModalOpen(true)}
            >
              Apply for Enrolment
            </Button>

            <div className="space-y-3 pt-2 text-xs border-t border-slate-100 text-slate-600">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Duration:</span>
                <span className="font-semibold text-slate-800">{course.duration} ({course.hours} Hours)</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Format:</span>
                <span className="font-semibold text-slate-800">Hybrid / Online & Kolkata Campus</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">ML Prediction:</span>
                <span className="font-semibold text-indigo-600">Active Live Tracking</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Certificate:</span>
                <span className="font-semibold text-slate-800">Verified Professional Credential</span>
              </div>
            </div>

            {/* SEO & Search Intent Metadata (PDF Page 5) */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-700">Digital Marketing Keywords:</span>
              <div className="flex flex-wrap gap-1 pt-1">
                {course.keywords.map((kw, i) => (
                  <span key={i} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolment Modal */}
      <Modal
        isOpen={enrollModalOpen}
        onClose={() => setEnrollModalOpen(false)}
        title="Complete Enrolment Application"
        subtitle={course.title}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setEnrollModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleEnrollConfirm}>
              Submit Application
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl">
            <span className="font-bold text-indigo-900 block">{course.title}</span>
            <span className="text-slate-600 text-xs">Tuition: {course.price} | Duration: {course.duration}</span>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
              <input
                type="text"
                defaultValue="Rahul Sen"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="rahul@example.com"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                defaultValue="+91 98301 44521"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};


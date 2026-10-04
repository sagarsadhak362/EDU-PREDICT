import React from 'react';
import { Layers, FileCode2, Globe, BarChart3, Cpu, BrainCircuit, ArrowRight, BookOpen } from 'lucide-react';
import { COURSE_CATEGORIES, COURSES } from '../../data/coursesData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

interface CourseCategoriesPageProps {
  onNavigate: (view: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const CourseCategoriesPage: React.FC<CourseCategoriesPageProps> = ({
  onNavigate,
  onSelectCourse,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode2': return <FileCode2 className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'BrainCircuit': return <BrainCircuit className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>Curriculum Domains</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Course Categories
        </h1>
        <p className="text-sm text-slate-500">
          Structured learning tracks mapped directly from foundational software paradigms to advanced predictive machine learning.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSE_CATEGORIES.map((cat) => {
          const matchingCourses = COURSES.filter(c => c.categoryId === cat.id);

          return (
            <div
              key={cat.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    {getIcon(cat.icon)}
                  </div>
                  <Badge variant="indigo" size="sm">{cat.count} Programs</Badge>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cat.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {cat.description}
                </p>

                {/* Sub-courses preview */}
                <div className="pt-2 space-y-2 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase">Available Courses:</div>
                  {matchingCourses.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onSelectCourse(c.id);
                        onNavigate('course-detail');
                      }}
                      className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-xs font-semibold text-slate-700 hover:text-indigo-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="truncate">{c.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onNavigate('courses')}
                >
                  View All in Track
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


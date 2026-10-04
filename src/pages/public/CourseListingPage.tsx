import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, Clock, Layers, ArrowRight, CheckCircle2, BookOpen } from 'lucide-react';
import { COURSES } from '../../data/coursesData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { EmptyState } from '../../components/common/EmptyState';
import { Modal } from '../../components/common/Modal';

interface CourseListingPageProps {
  onNavigate: (view: string, courseId?: string) => void;
  onSelectCourse: (courseId: string) => void;
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const CourseListingPage: React.FC<CourseListingPageProps> = ({
  onNavigate,
  onSelectCourse,
  onShowToast,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [enrollModalCourse, setEnrollModalCourse] = useState<string | null>(null);

  const categories = ['All', 'Python Programming', 'Django Development', 'Full Stack Development', 'Data Science', 'Machine Learning', 'Artificial Intelligence'];

  const filteredCourses = useMemo(() => {
    return COURSES.filter((c) => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
                            c.description.toLowerCase().includes(search.toLowerCase()) ||
                            c.keywords.some(k => k.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || c.level.toLowerCase().includes(selectedLevel.toLowerCase());
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [search, selectedCategory, selectedLevel]);

  const handleEnrollSuccess = () => {
    setEnrollModalCourse(null);
    onShowToast('success', 'Enrolment Application Submitted!', 'Our admissions counselor will contact you within 24 hours.');
  };

  const courseToEnroll = COURSES.find(c => c.id === enrollModalCourse);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
          <BookOpen className="w-4 h-4" /> Academic Course Catalog
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Explore Professional Tech Programs
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Comprehensive curriculum in Python, Django, Full Stack, and Machine Learning integrated with the EDU-PREDICT performance intelligence suite.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses by keyword, topic, or technology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Skill Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-medium shrink-0 transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                <div className="p-6 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-indigo-50/20">
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

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.keywords.slice(0, 2).map((k, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

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
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setEnrollModalCourse(course.id)}
                  >
                    Enrol
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="No courses match your filter criteria"
          description="Try clearing your search query or selecting a different course category."
          actionLabel="Reset All Filters"
          onAction={() => {
            setSearch('');
            setSelectedCategory('All');
            setSelectedLevel('All');
          }}
        />
      )}

      {/* Enrolment Modal */}
      {courseToEnroll && (
        <Modal
          isOpen={!!enrollModalCourse}
          onClose={() => setEnrollModalCourse(null)}
          title="Course Enrolment Application"
          subtitle={`Submit application for ${courseToEnroll.title}`}
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEnrollModalCourse(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleEnrollSuccess}>
                Confirm Enrolment
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl space-y-1">
              <div className="font-bold text-indigo-900">{courseToEnroll.title}</div>
              <div className="text-slate-600 flex justify-between">
                <span>Duration: {courseToEnroll.duration}</span>
                <span className="font-bold text-slate-800">Fee: {courseToEnroll.price}</span>
              </div>
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
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue="rahul@example.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Batch Timing</label>
                <select className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Weekday Evening (Mon-Thu 6:00 PM - 8:30 PM)</option>
                  <option>Weekend Intensive (Sat-Sun 10:00 AM - 3:00 PM)</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


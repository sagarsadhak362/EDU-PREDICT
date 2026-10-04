import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit, Trash2, Layers, Users, Clock, Star } from 'lucide-react';
import { COURSES } from '../../data/coursesData';
import { Course } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface CourseManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const CourseManagementPage: React.FC<CourseManagementPageProps> = ({ onShowToast }) => {
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Full Stack Development',
    duration: '12 Weeks',
    price: '₹22,000',
    faculty: 'Dr. Aris Banerjee',
    description: '',
  });

  const filtered = courses.filter(c => 
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: form.title,
      slug: form.title.toLowerCase().replace(/\s+/g, '-'),
      category: form.category,
      categoryId: 'cat-fullstack',
      description: form.description,
      longDescription: form.description,
      duration: form.duration,
      hours: 120,
      level: 'Intermediate',
      faculty: form.faculty,
      facultyTitle: 'Lead Instructor',
      facultyAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      rating: 4.9,
      enrolledCount: 0,
      maxSeats: 100,
      status: 'Active',
      price: form.price,
      modulesCount: 5,
      keywords: ['Technology course'],
      syllabus: [
        { title: 'Foundations & Architecture', description: 'Curriculum introductory module.', weeks: 'Weeks 1-3' }
      ]
    };
    setCourses([...courses, newCourse]);
    setIsAddModalOpen(false);
    onShowToast('success', 'Course Created', `${newCourse.title} added to curriculum.`);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    setCourses(courses.map(c => c.id === editingCourse.id ? editingCourse : c));
    setEditingCourse(null);
    onShowToast('success', 'Course Updated', `${editingCourse.title} details saved.`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Course Program Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Configure academic syllabi, batch capacity, and instructor assignments.
          </p>
        </div>
        <Button
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Course
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Course Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Faculty In-Charge</th>
                <th className="py-3 px-3 text-center">Duration</th>
                <th className="py-3 px-3 text-center">Enrolled</th>
                <th className="py-3 px-4 text-center">Tuition</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900 max-w-xs truncate">
                    {c.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {c.category}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {c.faculty}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono">
                    {c.duration}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-indigo-600">
                    {c.enrolledCount} / {c.maxSeats}
                  </td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                    {c.price}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Badge variant={c.status === 'Active' ? 'emerald' : 'amber'} size="sm" dot>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <button
                      onClick={() => setEditingCourse(c)}
                      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New Academic Course"
        subtitle="Define course syllabus and tuition fees"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAdd}>
              Create Course
            </Button>
          </>
        }
      >
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Course Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Cloud Systems with Python"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Full Stack Development</option>
                <option>Python Programming</option>
                <option>Django Development</option>
                <option>Data Science</option>
                <option>Machine Learning</option>
                <option>Artificial Intelligence</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Tuition Fee</label>
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Course Summary</label>
            <textarea
              rows={3}
              placeholder="Course description and learning objectives..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingCourse && (
        <Modal
          isOpen={!!editingCourse}
          onClose={() => setEditingCourse(null)}
          title={`Edit Course: ${editingCourse.title}`}
          subtitle="Modify pricing and course properties"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingCourse(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleEditSave}>
                Save Changes
              </Button>
            </>
          }
        >
          <form onSubmit={handleEditSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Course Title</label>
              <input
                type="text"
                value={editingCourse.title}
                onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tuition Price</label>
                <input
                  type="text"
                  value={editingCourse.price}
                  onChange={(e) => setEditingCourse({ ...editingCourse, price: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingCourse.status}
                  onChange={(e) => setEditingCourse({ ...editingCourse, status: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};


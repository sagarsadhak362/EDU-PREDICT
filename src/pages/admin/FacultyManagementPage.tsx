import React, { useState } from 'react';
import { GraduationCap, Plus, Star, Mail, Phone, Edit, Trash2, BookOpen } from 'lucide-react';
import { FACULTY_DATA } from '../../data/facultyData';
import { Faculty } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface FacultyManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const FacultyManagementPage: React.FC<FacultyManagementPageProps> = ({ onShowToast }) => {
  const [facultyList, setFacultyList] = useState<Faculty[]>(FACULTY_DATA);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
    phone: '',
    department: 'Full Stack & Software Engineering',
    specialization: '',
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newFac: Faculty = {
      id: `FAC-${String(facultyList.length + 1).padStart(3, '0')}`,
      name: form.name,
      title: form.title,
      email: form.email,
      phone: form.phone || '+91 98300 00000',
      department: form.department,
      specialization: form.specialization,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
      experience: '5+ Years',
      rating: 4.8,
      coursesAssigned: ['Python Foundations'],
      studentsCount: 120,
    };
    setFacultyList([...facultyList, newFac]);
    setIsAddModalOpen(false);
    onShowToast('success', 'Faculty Member Added', `${newFac.name} added to academic registry.`);
  };

  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;
    setFacultyList(facultyList.map(f => f.id === editingFaculty.id ? editingFaculty : f));
    setEditingFaculty(null);
    onShowToast('success', 'Faculty Record Updated', `${editingFaculty.name} profile updated.`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Faculty & Mentor Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Instructor assignments, workload distribution, and student ratings.
          </p>
        </div>
        <Button
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Faculty Member
        </Button>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facultyList.map((fac) => (
          <div
            key={fac.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={fac.avatar}
                    alt={fac.name}
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shrink-0"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{fac.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600">{fac.title}</p>
                    <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{fac.rating} / 5.0</span>
                      <span className="text-slate-400 font-normal">({fac.studentsCount} students)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setEditingFaculty(fac)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  title="Edit Faculty"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed">
                  <strong className="text-slate-700 block text-[11px] uppercase">Specialization:</strong>
                  {fac.specialization}
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {fac.coursesAssigned.map((c, i) => (
                    <span key={i} className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-md border border-indigo-100">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
              <span className="font-mono">{fac.email}</span>
              <span>{fac.experience} Exp</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Faculty Member"
        subtitle="Register teacher or mentor for course assignments"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAdd}>
              Confirm Registration
            </Button>
          </>
        }
      >
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Faculty Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Prof. Debashis Roy"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Title / Designation *</label>
            <input
              type="text"
              required
              placeholder="Senior Software Fellow"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email *</label>
              <input
                type="email"
                required
                placeholder="debashis.roy@abcacademy.edu"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>Full Stack & Software Engineering</option>
                <option>Data Science & Machine Learning</option>
                <option>Computer Science & Software Foundations</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Core Specialization</label>
            <textarea
              rows={2}
              placeholder="Microservices, asynchronous queues, neural networks..."
              value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      {editingFaculty && (
        <Modal
          isOpen={!!editingFaculty}
          onClose={() => setEditingFaculty(null)}
          title={`Edit Faculty: ${editingFaculty.name}`}
          subtitle="Update assignment or designation"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingFaculty(null)}>
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
              <label className="block font-semibold text-slate-700 mb-1">Designation Title</label>
              <input
                type="text"
                value={editingFaculty.title}
                onChange={(e) => setEditingFaculty({ ...editingFaculty, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Specialization</label>
              <textarea
                rows={2}
                value={editingFaculty.specialization}
                onChange={(e) => setEditingFaculty({ ...editingFaculty, specialization: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};


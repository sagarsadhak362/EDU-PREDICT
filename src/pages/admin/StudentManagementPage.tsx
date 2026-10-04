import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  ArrowUpDown, 
  Sparkles,
  Download,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { COURSES } from '../../data/coursesData';
import { Student, PerformanceIndicator } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Pagination } from '../../components/common/Pagination';
import { EmptyState } from '../../components/common/EmptyState';

interface StudentManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentManagementPage: React.FC<StudentManagementPageProps> = ({ onShowToast }) => {
  const [students, setStudents] = useState<Student[]>(STUDENTS_DATA);
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedIndicator, setSelectedIndicator] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'predicted' | 'attendance' | 'name'>('predicted');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Modals state
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);

  // Form state for adding new student
  const [newStudentForm, setNewStudentForm] = useState({
    name: '',
    email: '',
    phone: '',
    enrolledCourseName: 'Python + Django Full Stack Development',
    attendance: 85,
    assignmentAvg: 80,
    mockTestAvg: 75,
    practiceHours: 10,
    previousScore: 78,
    modulesCompleted: 85,
  });

  const filteredStudents = useMemo(() => {
    let result = students.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                            s.email.toLowerCase().includes(search.toLowerCase());
      const matchesCourse = selectedCourse === 'All' || s.enrolledCourseName.includes(selectedCourse);
      const matchesIndicator = selectedIndicator === 'All' || s.performanceIndicator === selectedIndicator;
      return matchesSearch && matchesCourse && matchesIndicator;
    });

    result.sort((a, b) => {
      let comp = 0;
      if (sortBy === 'predicted') comp = a.predictedScore - b.predictedScore;
      if (sortBy === 'attendance') comp = a.attendance - b.attendance;
      if (sortBy === 'name') comp = a.name.localeCompare(b.name);
      return sortOrder === 'asc' ? comp : -comp;
    });

    return result;
  }, [students, search, selectedCourse, selectedIndicator, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: `STU-${String(students.length + 1).padStart(3, '0')}`,
      name: newStudentForm.name,
      email: newStudentForm.email,
      phone: newStudentForm.phone || '+91 98300 00000',
      enrolledCourseId: 'course-py-dj',
      enrolledCourseName: newStudentForm.enrolledCourseName,
      enrollmentDate: '2026-10-04',
      courseStatus: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
      attendance: Number(newStudentForm.attendance),
      assignmentAvg: Number(newStudentForm.assignmentAvg),
      mockTestAvg: Number(newStudentForm.mockTestAvg),
      practiceHours: Number(newStudentForm.practiceHours),
      previousScore: Number(newStudentForm.previousScore),
      modulesCompleted: Number(newStudentForm.modulesCompleted),
      classParticipation: 'High',
      predictedScore: Math.round((0.22 * newStudentForm.attendance + 0.24 * newStudentForm.assignmentAvg + 0.24 * newStudentForm.mockTestAvg + 0.75 * newStudentForm.practiceHours + 0.12 * newStudentForm.previousScore) * 10) / 10,
      performanceIndicator: 'Good',
      riskStatus: 'Safe',
    };

    setStudents([newStudent, ...students]);
    setIsAddModalOpen(false);
    onShowToast('success', 'Student Enrolled', `${newStudent.name} successfully added to database.`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;
    setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
    setEditingStudent(null);
    onShowToast('success', 'Student Record Updated', `${editingStudent.name} details saved.`);
  };

  const handleDeleteConfirm = () => {
    if (!deletingStudentId) return;
    setStudents(students.filter(s => s.id !== deletingStudentId));
    setDeletingStudentId(null);
    onShowToast('info', 'Student Record Removed', 'The student record has been purged from this session.');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Student Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Directory of enrolled candidates, attendance records, and linear regression score predictions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add New Student
          </Button>
        </div>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Course Filter */}
          <div>
            <select
              value={selectedCourse}
              onChange={(e) => {
                setSelectedCourse(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Courses</option>
              <option value="Python + Django">Python + Django Full Stack</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Python Programming">Professional Python</option>
              <option value="Data Science">Data Science</option>
              <option value="Artificial Intelligence">Artificial Intelligence</option>
            </select>
          </div>

          {/* Indicator Filter */}
          <div>
            <select
              value={selectedIndicator}
              onChange={(e) => {
                setSelectedIndicator(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Indicators</option>
              <option value="Distinction">Distinction (&ge;85)</option>
              <option value="Good">Good (75-84)</option>
              <option value="Average">Average (60-74)</option>
              <option value="Needs Attention">Needs Attention (&lt;60)</option>
            </select>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="predicted">Sort by Predicted Score</option>
              <option value="attendance">Sort by Attendance</option>
              <option value="name">Sort by Student Name</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Toggle Sort Order"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Students Datatable */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        {paginatedStudents.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-5">Student Dossier</th>
                    <th className="py-3 px-4">Enrolled Program</th>
                    <th className="py-3 px-3 text-center">Attendance</th>
                    <th className="py-3 px-3 text-center">Assignments</th>
                    <th className="py-3 px-3 text-center">Mock Tests</th>
                    <th className="py-3 px-4 text-center">Predicted Score</th>
                    <th className="py-3 px-4 text-center">Indicator</th>
                    <th className="py-3 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {paginatedStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{st.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{st.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                        {st.enrolledCourseName}
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono">
                        <span className={`font-semibold ${st.attendance < 75 ? 'text-rose-600' : 'text-slate-800'}`}>
                          {st.attendance}%
                        </span>
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono text-slate-700">
                        {st.assignmentAvg}
                      </td>

                      <td className="py-3.5 px-3 text-center font-mono text-slate-700">
                        {st.mockTestAvg}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-black font-mono text-sm text-indigo-600">
                          {st.predictedScore}
                        </span>
                        <span className="text-[10px] text-slate-400 block">/ 100</span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <Badge
                          variant={
                            st.performanceIndicator === 'Distinction' ? 'indigo' :
                            st.performanceIndicator === 'Good' ? 'emerald' :
                            st.performanceIndicator === 'Average' ? 'amber' : 'rose'
                          }
                          size="sm"
                          dot
                        >
                          {st.performanceIndicator}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setViewingStudent(st)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title="View Dossier"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingStudent(st)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Record"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingStudentId(st.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Student"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredStudents.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <EmptyState
            icon="search"
            title="No students matched your search filters"
            description="Adjust your search query or reset the indicator filter to view records."
            actionLabel="Reset Filters"
            onAction={() => {
              setSearch('');
              setSelectedCourse('All');
              setSelectedIndicator('All');
            }}
          />
        )}
      </div>

      {/* View Student Dossier Modal */}
      {viewingStudent && (
        <Modal
          isOpen={!!viewingStudent}
          onClose={() => setViewingStudent(null)}
          title={`Student Dossier: ${viewingStudent.name}`}
          subtitle={`ID: ${viewingStudent.id} • ${viewingStudent.enrolledCourseName}`}
          footer={
            <Button size="sm" onClick={() => setViewingStudent(null)}>
              Close Dossier
            </Button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <img src={viewingStudent.avatar} alt={viewingStudent.name} className="w-14 h-14 rounded-xl object-cover" />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{viewingStudent.name}</h4>
                <p className="text-slate-500">{viewingStudent.email} • {viewingStudent.phone}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="indigo" size="sm">Enrolled {viewingStudent.enrollmentDate}</Badge>
                  <Badge variant={viewingStudent.performanceIndicator === 'Good' ? 'emerald' : viewingStudent.performanceIndicator === 'Average' ? 'amber' : 'rose'} size="sm">
                    {viewingStudent.performanceIndicator}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400">Attendance</span>
                <div className="text-base font-bold text-slate-800">{viewingStudent.attendance}%</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400">Assignment Avg</span>
                <div className="text-base font-bold text-slate-800">{viewingStudent.assignmentAvg}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400">Mock Tests</span>
                <div className="text-base font-bold text-slate-800">{viewingStudent.mockTestAvg}</div>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl">
                <span className="text-[10px] text-indigo-700">Predicted Score</span>
                <div className="text-base font-black text-indigo-700">{viewingStudent.predictedScore} / 100</div>
              </div>
            </div>

            {viewingStudent.notes && (
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60">
                <span className="font-bold text-amber-900 block mb-1">Academic & ML Notes:</span>
                <p className="text-amber-800 leading-relaxed">{viewingStudent.notes}</p>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <Modal
          isOpen={!!editingStudent}
          onClose={() => setEditingStudent(null)}
          title={`Edit Student: ${editingStudent.name}`}
          subtitle="Modify academic indicators or contact information"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setEditingStudent(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </>
          }
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingStudent.name}
                  onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attendance %</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingStudent.attendance}
                  onChange={(e) => setEditingStudent({ ...editingStudent, attendance: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assignment Avg</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingStudent.assignmentAvg}
                  onChange={(e) => setEditingStudent({ ...editingStudent, assignmentAvg: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mock Test Avg</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={editingStudent.mockTestAvg}
                  onChange={(e) => setEditingStudent({ ...editingStudent, mockTestAvg: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Add New Student Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Student Enrolment"
        subtitle="Provision academic record for ABC Academy"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAddStudent}>
              Enroll Student
            </Button>
          </>
        }
      >
        <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Swagata Sen"
                value={newStudentForm.name}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="swagata@example.com"
                value={newStudentForm.email}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, email: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Enrolled Course *</label>
            <select
              value={newStudentForm.enrolledCourseName}
              onChange={(e) => setNewStudentForm({ ...newStudentForm, enrolledCourseName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option>Python + Django Full Stack Development</option>
              <option>Applied Machine Learning & Predictive Modeling</option>
              <option>Professional Python Programming</option>
              <option>Data Science & Statistical Analytics</option>
              <option>Artificial Intelligence & Neural Architectures</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Initial Attendance %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newStudentForm.attendance}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, attendance: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assignment Avg</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newStudentForm.assignmentAvg}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, assignmentAvg: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Practice Hrs/Wk</label>
              <input
                type="number"
                min="0"
                max="30"
                value={newStudentForm.practiceHours}
                onChange={(e) => setNewStudentForm({ ...newStudentForm, practiceHours: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      {deletingStudentId && (
        <Modal
          isOpen={!!deletingStudentId}
          onClose={() => setDeletingStudentId(null)}
          title="Confirm Student Record Removal"
          subtitle="Are you sure you wish to delete this candidate from the cohort roster?"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setDeletingStudentId(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleDeleteConfirm}>
                Confirm Removal
              </Button>
            </>
          }
        >
          <p className="text-xs text-slate-600">
            This action will remove the candidate's attendance and assessment records from the current active session.
          </p>
        </Modal>
      )}
    </div>
  );
};


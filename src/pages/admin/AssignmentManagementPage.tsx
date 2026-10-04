import React, { useState } from 'react';
import { FileText, Plus, CheckCircle2, Clock, Edit, Award } from 'lucide-react';
import { ASSIGNMENTS_DATA } from '../../data/assignmentsData';
import { Assignment } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface AssignmentManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const AssignmentManagementPage: React.FC<AssignmentManagementPageProps> = ({ onShowToast }) => {
  const [assignments, setAssignments] = useState<Assignment[]>(ASSIGNMENTS_DATA);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [gradingAssignment, setGradingAssignment] = useState<Assignment | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '2026-10-25',
    maxScore: 100,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newAsn: Assignment = {
      id: `ASN-${String(assignments.length + 101)}`,
      courseId: 'course-py-dj',
      courseName: 'Python + Django Full Stack Development',
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      maxScore: Number(form.maxScore),
      status: 'Pending',
      submissionsCount: 0,
      gradedCount: 0,
      averageScore: 0,
    };
    setAssignments([...assignments, newAsn]);
    setIsCreateModalOpen(false);
    onShowToast('success', 'Assignment Created', `Assignment "${newAsn.title}" published to student portal.`);
  };

  const handleSaveGrades = () => {
    setGradingAssignment(null);
    onShowToast('success', 'Grades Recorded', 'Batch scores updated and published.');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Assignment & Project Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review submissions, publish homework tasks, and assign marks (24% weight in ML prediction).
          </p>
        </div>

        <Button
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create Assignment
        </Button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((asn) => (
          <div
            key={asn.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {asn.id}
                  </span>
                  <Badge variant={asn.gradedCount === asn.submissionsCount && asn.submissionsCount ? 'emerald' : 'amber'} size="sm">
                    {asn.gradedCount === asn.submissionsCount && asn.submissionsCount ? 'Grading Complete' : 'Submissions Open'}
                  </Badge>
                  <span className="text-xs text-slate-400">• Due: {asn.dueDate}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{asn.title}</h3>
                <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">{asn.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setGradingAssignment(asn)}
                >
                  Grade Submissions
                </Button>
              </div>
            </div>

            {/* Metrics bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px]">Submissions</span>
                <strong className="text-slate-800 text-sm font-mono">{asn.submissionsCount || 0} / 45</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Graded</span>
                <strong className="text-indigo-600 text-sm font-mono">{asn.gradedCount || 0}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Average Score</span>
                <strong className="text-slate-800 text-sm font-mono">{asn.averageScore || '—'} / 100</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Max Possible</span>
                <strong className="text-slate-800 text-sm font-mono">{asn.maxScore} pts</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Assignment"
        subtitle="Publish practical homework task for students"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleCreate}>
              Publish Assignment
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assignment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Asynchronous Web Sockets with Django Channels"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Score</label>
              <input
                type="number"
                value={form.maxScore}
                onChange={(e) => setForm({ ...form, maxScore: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Instructions & Problem Specification</label>
            <textarea
              rows={3}
              placeholder="Detail the technical tasks, code requirements, and grading criteria..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </Modal>

      {/* Grade Submissions Modal */}
      {gradingAssignment && (
        <Modal
          isOpen={!!gradingAssignment}
          onClose={() => setGradingAssignment(null)}
          title={`Grade Submissions: ${gradingAssignment.title}`}
          subtitle="Input marks and remarks for student code submissions"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setGradingAssignment(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveGrades}>
                Save All Grades
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex justify-between">
              <span className="font-bold text-indigo-900">{gradingAssignment.title}</span>
              <span className="font-mono text-slate-700">Max Score: {gradingAssignment.maxScore}</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Rahul Sen (rahul@example.com)</strong>
                  <span className="text-[11px] text-slate-400">Submitted on time via GitHub</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="84"
                    max={100}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold font-mono"
                  />
                  <span className="text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Sourav Paul (sourav.paul@example.com)</strong>
                  <span className="text-[11px] text-slate-400">Submitted with minor test failures</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="60"
                    max={100}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold font-mono"
                  />
                  <span className="text-slate-400">/ 100</span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};


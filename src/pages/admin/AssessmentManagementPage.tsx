import React, { useState } from 'react';
import { Award, Plus, Calendar, Clock, Edit, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { ASSESSMENTS_DATA } from '../../data/assessmentsData';
import { Assessment } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface AssessmentManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const AssessmentManagementPage: React.FC<AssessmentManagementPageProps> = ({ onShowToast }) => {
  const [assessments, setAssessments] = useState<Assessment[]>(ASSESSMENTS_DATA);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [marksEntryTest, setMarksEntryTest] = useState<Assessment | null>(null);

  const [form, setForm] = useState({
    title: '',
    type: 'Mock Test' as const,
    date: '2026-10-30',
    totalMarks: 100,
    durationMinutes: 90,
  });

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const newTest: Assessment = {
      id: `TST-${String(assessments.length + 201)}`,
      courseId: 'course-py-dj',
      courseName: 'Python + Django Full Stack Development',
      title: form.title,
      type: form.type,
      date: form.date,
      totalMarks: Number(form.totalMarks),
      durationMinutes: Number(form.durationMinutes),
      status: 'Upcoming',
    };
    setAssessments([...assessments, newTest]);
    setIsScheduleModalOpen(false);
    onShowToast('success', 'Assessment Scheduled', `${newTest.title} added to academic calendar.`);
  };

  const handleSaveMarks = () => {
    setMarksEntryTest(null);
    onShowToast('success', 'Assessment Marks Committed', 'Scores synced with student dashboards and prediction engine.');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Assessments & Marks Entry</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage standardized mock tests, schedule assessments, and record cohort grades (24% weight in ML prediction).
          </p>
        </div>

        <Button
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsScheduleModalOpen(true)}
        >
          Schedule Assessment
        </Button>
      </div>

      {/* Assessment Cards */}
      <div className="space-y-4">
        {assessments.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    {test.id}
                  </span>
                  <Badge variant={test.status === 'Completed' ? 'emerald' : 'amber'} size="sm" dot>
                    {test.status}
                  </Badge>
                  <span className="text-xs text-slate-400">• {test.type}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{test.title}</h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  icon={<FileSpreadsheet className="w-4 h-4" />}
                  onClick={() => setMarksEntryTest(test)}
                >
                  Enter / Edit Marks
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block text-[11px]">Examination Date</span>
                <strong className="text-slate-800 text-sm font-mono">{test.date}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Duration</span>
                <strong className="text-slate-800 text-sm font-mono">{test.durationMinutes} mins</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Batch Average</span>
                <strong className="text-indigo-600 text-sm font-mono">{test.batchAverage || '—'} / 100</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Highest Score</span>
                <strong className="text-emerald-600 text-sm font-mono">{test.highestScore || '—'} / 100</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule New Examination / Mock Test"
        subtitle="Configure assessment date, duration, and question allocation"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSchedule}>
              Schedule Examination
            </Button>
          </>
        }
      >
        <form onSubmit={handleSchedule} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assessment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Mock Assessment 5: Advanced REST Architecture"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assessment Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Mock Test">Mock Test</option>
                <option value="Midterm Exam">Midterm Exam</option>
                <option value="Module Quiz">Module Quiz</option>
                <option value="Final Assessment">Final Assessment</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Scheduled Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Duration (Minutes)</label>
              <input
                type="number"
                value={form.durationMinutes}
                onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Marks</label>
              <input
                type="number"
                value={form.totalMarks}
                onChange={(e) => setForm({ ...form, totalMarks: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Enter Marks Modal */}
      {marksEntryTest && (
        <Modal
          isOpen={!!marksEntryTest}
          onClose={() => setMarksEntryTest(null)}
          title={`Batch Marks Entry: ${marksEntryTest.title}`}
          subtitle="Input student scores for continuous ML performance aggregation"
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setMarksEntryTest(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveMarks}>
                Commit Scores
              </Button>
            </>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 flex justify-between">
              <span className="font-bold text-indigo-900">{marksEntryTest.title}</span>
              <span className="font-mono text-slate-700">Total Marks: {marksEntryTest.totalMarks}</span>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Rahul Sen</strong>
                  <span className="text-[11px] text-slate-400">Enrolment: EP-2026-0842</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="78"
                    max={100}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold font-mono"
                  />
                  <span className="text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Ananya Roy</strong>
                  <span className="text-[11px] text-slate-400">Enrolment: EP-2026-0843</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="70"
                    max={100}
                    className="w-16 px-2 py-1 bg-white border border-slate-300 rounded-lg text-center font-bold font-mono"
                  />
                  <span className="text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Sourav Paul</strong>
                  <span className="text-[11px] text-slate-400">Enrolment: EP-2026-0844</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    defaultValue="54"
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


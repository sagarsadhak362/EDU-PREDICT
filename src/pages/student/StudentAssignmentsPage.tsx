import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, UploadCloud, ExternalLink, MessageSquare, AlertCircle } from 'lucide-react';
import { ASSIGNMENTS_DATA } from '../../data/assignmentsData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface StudentAssignmentsPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentAssignmentsPage: React.FC<StudentAssignmentsPageProps> = ({ onShowToast }) => {
  const [assignments, setAssignments] = useState(ASSIGNMENTS_DATA);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [githubUrl, setGithubUrl] = useState('https://github.com/rahul-sen/edu-predict-capstone');

  const selectedAssignment = assignments.find(a => a.id === activeModalId);

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalId) return;

    setAssignments(assignments.map(a => 
      a.id === activeModalId 
        ? { ...a, status: 'Submitted', submittedDate: '2026-10-04' } 
        : a
    ));
    setActiveModalId(null);
    onShowToast('success', 'Assignment Submitted!', 'Your code repository and documentation are received for faculty grading.');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Assignment Submissions</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Weekly project evaluations and code reviews. Current Average: <strong className="text-indigo-600">84 / 100</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="indigo" size="md">Assignment Weight: 24% in ML Model</Badge>
        </div>
      </div>

      {/* Assignment KPI Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Score</span>
          <div className="mt-2 text-3xl font-black text-slate-900">84 / 100</div>
          <span className="text-xs text-emerald-600 font-semibold">Exceeds 80 benchmark</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Graded Tasks</span>
          <div className="mt-2 text-3xl font-black text-indigo-600">5 of 6</div>
          <span className="text-xs text-slate-400">1 task pending review</span>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">On-Time Submissions</span>
          <div className="mt-2 text-3xl font-black text-emerald-600">100%</div>
          <span className="text-xs text-slate-400">Zero late penalties</span>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.map((asn) => {
          const isGraded = asn.status === 'Graded';
          const isPending = asn.status === 'Pending';
          const isSubmitted = asn.status === 'Submitted';

          return (
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
                    <Badge
                      variant={isGraded ? 'emerald' : isSubmitted ? 'indigo' : 'amber'}
                      size="sm"
                      dot
                    >
                      {asn.status}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{asn.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                    {asn.description}
                  </p>
                </div>

                {/* Score badge / Submit CTA */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                  {isGraded && (
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Marks Awarded</div>
                      <div className="text-2xl font-black text-indigo-600">
                        {asn.studentScore} <span className="text-sm font-semibold text-slate-400">/ {asn.maxScore}</span>
                      </div>
                    </div>
                  )}

                  {isPending && (
                    <Button
                      size="sm"
                      icon={<UploadCloud className="w-4 h-4" />}
                      onClick={() => setActiveModalId(asn.id)}
                    >
                      Submit Solution
                    </Button>
                  )}

                  {isSubmitted && (
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl">
                      Awaiting Faculty Evaluation
                    </span>
                  )}
                </div>
              </div>

              {/* Sub-details & Feedback Remarks */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex flex-wrap items-center gap-4">
                  <span>Due Date: <strong className="text-slate-700">{asn.dueDate}</strong></span>
                  {asn.submittedDate && (
                    <span>Submitted On: <strong className="text-slate-700">{asn.submittedDate}</strong></span>
                  )}
                  {asn.averageScore && (
                    <span>Cohort Average: <strong className="text-slate-700">{asn.averageScore}/100</strong></span>
                  )}
                </div>

                {asn.feedback && (
                  <div className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 max-w-xl">
                    <MessageSquare className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-slate-600 italic">
                      Faculty Remarks: "{asn.feedback}"
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <Modal
          isOpen={!!activeModalId}
          onClose={() => setActiveModalId(null)}
          title="Submit Assignment Solution"
          subtitle={selectedAssignment.title}
          footer={
            <>
              <Button variant="outline" size="sm" onClick={() => setActiveModalId(null)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSubmitAssignment}>
                Confirm Final Submission
              </Button>
            </>
          }
        >
          <form onSubmit={handleSubmitAssignment} className="space-y-4 text-xs">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
              <span className="font-bold text-indigo-900 block">{selectedAssignment.title}</span>
              <span className="text-slate-500 text-[11px]">Due: {selectedAssignment.dueDate} | Max Marks: {selectedAssignment.maxScore}</span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Git Repository URL (GitHub / GitLab) *</label>
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/your-username/repo"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Upload Archive / Documentation (.zip, .pdf)</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <UploadCloud className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                <span className="font-bold text-slate-700 block">Click to upload or drag files</span>
                <span className="text-[11px] text-slate-400">PDF, ZIP up to 50MB</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Notes to Reviewer</label>
              <textarea
                rows={2}
                placeholder="Provide instructions to run tests or migrations..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};


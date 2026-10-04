import React, { useState, useMemo } from 'react';
import { CalendarCheck2, CheckCircle2, XCircle, Clock, AlertTriangle, Search, Filter } from 'lucide-react';
import { ATTENDANCE_SUMMARY, RECENT_ATTENDANCE_LOGS } from '../../data/attendanceData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface StudentAttendancePageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentAttendancePage: React.FC<StudentAttendancePageProps> = ({ onShowToast }) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Present' | 'Absent' | 'Excused'>('All');
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  const filteredLogs = useMemo(() => {
    return RECENT_ATTENDANCE_LOGS.filter((log) => {
      const matchesSearch = log.sessionTitle.toLowerCase().includes(search.toLowerCase()) ||
                            log.facultyName.toLowerCase().includes(search.toLowerCase()) ||
                            log.date.includes(search);
      const matchesStatus = filterStatus === 'All' || log.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [search, filterStatus]);

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeaveModalOpen(false);
    onShowToast('success', 'Leave Request Submitted', 'Your attendance regularization ticket has been forwarded to Dr. Aris Banerjee.');
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Attendance Tracking</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Session logs and compliance records for Rahul Sen (Target: &gt;85%).
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLeaveModalOpen(true)}
        >
          Request Attendance Regularization
        </Button>
      </div>

      {/* Top Attendance Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Rate</span>
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900">{ATTENDANCE_SUMMARY.overallPercentage}%</div>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">Meets &gt;85% threshold</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Present</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-600">{ATTENDANCE_SUMMARY.presentSessions}</div>
          <span className="text-xs text-slate-400 mt-1 inline-block">Sessions attended</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Absent</span>
            <div className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <XCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-rose-600">{ATTENDANCE_SUMMARY.absentSessions}</div>
          <span className="text-xs text-slate-400 mt-1 inline-block">Sessions missed</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Excused</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-3xl font-black text-amber-600">{ATTENDANCE_SUMMARY.excusedSessions}</div>
          <span className="text-xs text-slate-400 mt-1 inline-block">Approved leaves</span>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-slate-900">Subject-Wise Attendance Distribution</h3>
        <div className="space-y-4">
          {ATTENDANCE_SUMMARY.subjectBreakdown.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-800">{item.subject}</span>
                <span className="font-mono font-bold text-slate-700">
                  {item.attended}/{item.total} ({item.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.percentage >= 85 ? 'bg-indigo-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Class Session Logs</h3>
            <p className="text-xs text-slate-400">Classroom lectures and lab session history</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search lectures..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present Only</option>
              <option value="Absent">Absent Only</option>
              <option value="Excused">Excused Only</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-semibold">
                <th className="py-3 px-6">Session & Topic</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Faculty In-Charge</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6">Notes / Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-800">
                    {log.sessionTitle}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">
                    {log.date}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {log.facultyName}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={log.status === 'Present' ? 'emerald' : log.status === 'Absent' ? 'rose' : 'amber'}
                      size="sm"
                      dot
                    >
                      {log.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-6 text-slate-400 italic">
                    {log.remarks || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Leave Request Modal */}
      <Modal
        isOpen={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        title="Attendance Regularization Form"
        subtitle="Submit excuse documentation for missed lecture sessions"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setLeaveModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleLeaveSubmit}>
              Submit for Approval
            </Button>
          </>
        }
      >
        <form onSubmit={handleLeaveSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Missed Session Date</label>
            <input
              type="date"
              defaultValue="2026-09-21"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Reason for Absence</label>
            <select className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Medical Emergency / Illness</option>
              <option>University Semester Exam Conflict</option>
              <option>Family Emergency</option>
              <option>Transit / Travel Interruption</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Detailed Explanation</label>
            <textarea
              rows={3}
              placeholder="Provide medical certificate details or exam hall ticket verification..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};


import React, { useState } from 'react';
import { ClipboardCheck, Search, Filter, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { ENROLMENTS_DATA } from '../../data/enrolmentsData';
import { Enrolment } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface EnrolmentManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const EnrolmentManagementPage: React.FC<EnrolmentManagementPageProps> = ({ onShowToast }) => {
  const [enrolments, setEnrolments] = useState<Enrolment[]>(ENROLMENTS_DATA);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = enrolments.filter(e => {
    const matchesSearch = e.studentName.toLowerCase().includes(search.toLowerCase()) ||
                          e.courseName.toLowerCase().includes(search.toLowerCase()) ||
                          e.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setEnrolments(enrolments.map(e => e.id === id ? { ...e, status: newStatus } : e));
    onShowToast('success', `Enrolment ${newStatus}`, `Registration status updated for ${id}.`);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Student Enrolment Management</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review, approve, and verify admission applications across active programs.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name or enrolment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
        >
          <option value="All">All Application Statuses</option>
          <option value="Approved">Approved Only</option>
          <option value="Pending">Pending Review</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Enrolment ID</th>
                <th className="py-3 px-4">Student Candidate</th>
                <th className="py-3 px-4">Applied Course</th>
                <th className="py-3 px-3 text-center">Applied Date</th>
                <th className="py-3 px-3 text-center">Fee Status</th>
                <th className="py-3 px-4 text-center">Enrolment Status</th>
                <th className="py-3 px-5 text-right">Approval Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((enr) => (
                <tr key={enr.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5 font-mono font-bold text-indigo-600">
                    {enr.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>{enr.studentName}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{enr.studentEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs truncate">
                    {enr.courseName}
                  </td>
                  <td className="py-3.5 px-3 text-center text-slate-500 font-mono">
                    {enr.enrolmentDate}
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <Badge variant={enr.paymentStatus === 'Paid' ? 'emerald' : 'amber'} size="sm">
                      {enr.paymentStatus} ({enr.amount})
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <Badge
                      variant={enr.status === 'Approved' ? 'emerald' : enr.status === 'Pending' ? 'amber' : 'rose'}
                      size="sm"
                      dot
                    >
                      {enr.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    {enr.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStatusChange(enr.id, 'Approved')}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(enr.id, 'Rejected')}
                          className="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs italic">Decision Finalized</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


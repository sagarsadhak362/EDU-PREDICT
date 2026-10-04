import React, { useState } from 'react';
import { CalendarCheck2, CheckCircle2, XCircle, Clock, Save, Filter } from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface AttendanceManagementPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const AttendanceManagementPage: React.FC<AttendanceManagementPageProps> = ({ onShowToast }) => {
  const [sessionDate, setSessionDate] = useState('2026-10-04');
  const [selectedCourse, setSelectedCourse] = useState('Python + Django Full Stack Development');
  const [sessionTopic, setSessionTopic] = useState('Lecture 51: Capstone Linear Regression Integration');

  // Attendance state map for students in batch
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'Present' | 'Absent' | 'Late'>>({
    'STU-001': 'Present', // Rahul Sen
    'STU-002': 'Present',
    'STU-003': 'Absent',  // Sourav Paul
    'STU-004': 'Present',
    'STU-005': 'Present',
    'STU-006': 'Present',
    'STU-007': 'Present',
    'STU-008': 'Present',
    'STU-009': 'Absent',
    'STU-010': 'Present',
  });

  const handleToggle = (studentId: string, status: 'Present' | 'Absent' | 'Late') => {
    setAttendanceMap(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = () => {
    onShowToast('success', 'Attendance Sheet Committed', `Session "${sessionTopic}" marked for ${STUDENTS_DATA.length} students.`);
  };

  const markAll = (status: 'Present' | 'Absent') => {
    const updated: Record<string, 'Present' | 'Absent' | 'Late'> = {};
    STUDENTS_DATA.forEach(s => { updated[s.id] = status; });
    setAttendanceMap(updated);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Faculty Attendance System</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Batch register daily classroom and lab attendance. Attendance represents 22% weight in Linear Regression.
          </p>
        </div>

        <Button
          size="sm"
          icon={<Save className="w-4 h-4" />}
          onClick={handleSave}
        >
          Save & Commit Attendance
        </Button>
      </div>

      {/* Session Configuration Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Session Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Course & Batch</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option>Python + Django Full Stack Development</option>
              <option>Applied Machine Learning & Predictive Modeling</option>
              <option>Professional Python Programming</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Session Date</label>
            <input
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Lecture / Lab Topic</label>
            <input
              type="text"
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Quick Batch Action:</span>
            <button
              onClick={() => markAll('Present')}
              className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAll('Absent')}
              className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Mark All Absent
            </button>
          </div>
          <span className="text-slate-400 font-mono">10 Students in Roster</span>
        </div>
      </div>

      {/* Attendance Roster Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-5">Student Candidate</th>
                <th className="py-3 px-4 text-center">Historical Attendance</th>
                <th className="py-3 px-4 text-center">ML Impact</th>
                <th className="py-3 px-6 text-right">Session Status Marking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {STUDENTS_DATA.map((st) => {
                const currentStatus = attendanceMap[st.id] || 'Present';

                return (
                  <tr key={st.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <img src={st.avatar} alt={st.name} className="w-8 h-8 rounded-xl object-cover ring-1 ring-slate-200" />
                        <div>
                          <div className="font-bold text-slate-900">{st.name}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{st.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                      {st.attendance}%
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <Badge variant={st.attendance >= 80 ? 'emerald' : 'rose'} size="sm">
                        {st.attendance >= 80 ? 'Safe' : 'Deficit Risk'}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                        <button
                          type="button"
                          onClick={() => handleToggle(st.id, 'Present')}
                          className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                            currentStatus === 'Present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(st.id, 'Late')}
                          className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                            currentStatus === 'Late'
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Late
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggle(st.id, 'Absent')}
                          className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors cursor-pointer ${
                            currentStatus === 'Absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


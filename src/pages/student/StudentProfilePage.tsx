import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, ShieldCheck, Edit3, CheckCircle2 } from 'lucide-react';
import { STUDENTS_DATA } from '../../data/studentsData';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface StudentProfilePageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = ({ onShowToast }) => {
  const [student, setStudent] = useState(STUDENTS_DATA[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: student.name,
    email: student.email,
    phone: student.phone,
    address: 'Salt Lake City, Sector 2, Kolkata, WB',
    emergencyContact: 'Mr. Pradip Sen (+91 98300 99881 - Father)',
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setStudent({
      ...student,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
    });
    setIsEditModalOpen(false);
    onShowToast('success', 'Profile Updated', 'Your student contact profile has been saved.');
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Student Academic Profile</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Registered credentials and academic dossier for ABC Academy.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          icon={<Edit3 className="w-4 h-4" />}
          onClick={() => setIsEditModalOpen(true)}
        >
          Edit Contact Info
        </Button>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 text-center sm:text-left">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-md shrink-0"
          />
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
              <Badge variant="emerald" size="sm" dot>Active Enrolment</Badge>
              <Badge variant="indigo" size="sm">EP-2026-0842</Badge>
            </div>
            <p className="text-sm font-semibold text-indigo-600">{student.enrolledCourseName}</p>
            <p className="text-xs text-slate-400">Enrolled: {student.enrollmentDate} • ABC Academy Kolkata Campus</p>
          </div>
        </div>

        {/* Academic Performance Snapshot */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Academic Performance Indicators (Linear Regression Features)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Attendance</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">{student.attendance}%</div>
              <span className="text-[10px] text-emerald-600 font-semibold">44 of 50 Sessions</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Assignment Avg</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">{student.assignmentAvg}/100</div>
              <span className="text-[10px] text-indigo-600 font-semibold">5 Tasks Graded</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs text-slate-500">Mock Test Avg</span>
              <div className="text-xl font-black text-slate-900 mt-0.5">{student.mockTestAvg}/100</div>
              <span className="text-[10px] text-amber-600 font-semibold">3 Assessments</span>
            </div>
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100">
              <span className="text-xs text-indigo-800 font-medium">Predicted Final Score</span>
              <div className="text-xl font-black text-indigo-700 mt-0.5">{student.predictedScore}/100</div>
              <span className="text-[10px] text-indigo-600 font-bold uppercase">Indicator: {student.performanceIndicator}</span>
            </div>
          </div>
        </div>

        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Personal & Contact Dossier</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Email: <strong className="text-slate-800">{student.email}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Phone: <strong className="text-slate-800">{student.phone}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Residential: <strong className="text-slate-800">{editForm.address}</strong></span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Emergency & Administrative Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Guardian: <strong className="text-slate-800">{editForm.emergencyContact}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Assigned Batch: <strong className="text-slate-800">PY-DJ-2026-AUG-A</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Academic Advisor: <strong className="text-slate-800">Dr. Aris Banerjee</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Student Information"
        subtitle="Update contact and residential details"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </>
        }
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
            <input
              type="text"
              value={editForm.address}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};


import React, { useState } from 'react';
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface ContactPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Course Enrolment Enquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onShowToast('success', 'Message Transmitted!', 'An ABC Academy admissions officer will contact you shortly.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Connect with ABC Academy
        </h1>
        <p className="text-sm text-slate-500">
          Have queries regarding Python courses in Kolkata, course fees, syllabus coverage, or the EDU-PREDICT performance system? We're here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Contact Info Card */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 space-y-8 shadow-xl border border-slate-800">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Admissions & Campus Office</h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Visit our primary academic facility in Salt Lake Sector V, Kolkata or connect via our virtual counseling hotline.
            </p>
          </div>

          <div className="space-y-5 text-xs text-slate-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Salt Lake Campus</strong>
                <span>Sector V, Bidhannagar, Kolkata, West Bengal 700091</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">(Near College More Metro Station)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Direct Email</strong>
                <span>admissions@abcacademy.edu</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">support@edu-predict.org</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Telephone Hotline</strong>
                <span>+91 98300 12345 / (033) 2357-8900</span>
                <span className="block text-[11px] text-slate-400 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM IST</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block text-sm">Counseling Hours</strong>
                <span>Monday through Saturday (Walk-ins welcome)</span>
              </div>
            </div>
          </div>

          {/* Quick campus map mock illustration */}
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center space-y-1">
            <span className="text-[11px] font-semibold text-slate-400">Campus Location Matrix</span>
            <p className="text-xs text-indigo-300 font-bold">Kolkata IT Tech Corridor (Salt Lake)</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted Successfully</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Thank you for your interest in ABC Academy. Our program coordinator will review your inquiry and contact you at {formData.email || 'your email'} shortly.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'Course Enrolment Enquiry', message: '' });
                }}
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Send an Academic Enquiry</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98301 44521"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Inquiry Purpose</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option>Course Enrolment Enquiry</option>
                    <option>Python + Django Track Information</option>
                    <option>Applied Machine Learning Syllabus</option>
                    <option>Placement & Internship Cell</option>
                    <option>ML Prediction System Demo Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Message / Questions *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your background and the course tracks you'd like to explore..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <Button type="submit" size="md" icon={<Send className="w-4 h-4" />} iconPosition="right">
                Transmit Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Bell, Plus, Send, AlertTriangle, Sparkles, CheckCircle2, Trash2 } from 'lucide-react';
import { ADMIN_NOTIFICATIONS } from '../../data/notificationsData';
import { AppNotification } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

interface AdminNotificationsPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const AdminNotificationsPage: React.FC<AdminNotificationsPageProps> = ({ onShowToast }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(ADMIN_NOTIFICATIONS);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    message: '',
    audience: 'All Enrolled Students',
    priority: 'medium' as const,
  });

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotif: AppNotification = {
      id: `ADM-NOTIF-${Date.now()}`,
      title: broadcastForm.title,
      message: broadcastForm.message,
      date: 'Just now',
      type: 'system',
      read: false,
      priority: broadcastForm.priority,
    };
    setNotifications([newNotif, ...notifications]);
    setIsBroadcastOpen(false);
    onShowToast('success', 'Announcement Broadcast', `Alert published to ${broadcastForm.audience}.`);
  };

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Announcements & Broadcasts</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dispatch institute notices, early warnings, and academic calendar updates.
          </p>
        </div>

        <Button
          size="sm"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsBroadcastOpen(true)}
        >
          Send Announcement
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 mt-0.5 shrink-0">
                {n.type === 'prediction' ? <Sparkles className="w-4 h-4" /> :
                 n.type === 'attendance' ? <AlertTriangle className="w-4 h-4 text-rose-500" /> :
                 <Bell className="w-4 h-4" />}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                  <Badge variant={n.priority === 'high' ? 'rose' : 'indigo'} size="sm">
                    {n.priority}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{n.message}</p>
                <span className="text-[10px] text-slate-400 font-mono block pt-1">{n.date}</span>
              </div>
            </div>

            <button
              onClick={() => handleDismiss(n.id)}
              className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Broadcast Modal */}
      <Modal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        title="Broadcast System Announcement"
        subtitle="Publish instant notification to candidate dashboards"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsBroadcastOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleBroadcast}>
              Transmit Announcement
            </Button>
          </>
        }
      >
        <form onSubmit={handleBroadcast} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Announcement Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule for Mock Assessment 4 Published"
              value={broadcastForm.title}
              onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
              <select
                value={broadcastForm.audience}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, audience: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>All Enrolled Students</option>
                <option>Python + Django Batch Only</option>
                <option>Machine Learning Candidates Only</option>
                <option>At-Risk Students Only</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority</label>
              <select
                value={broadcastForm.priority}
                onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Announcement Body *</label>
            <textarea
              required
              rows={3}
              placeholder="Message details to be rendered in the student portal..."
              value={broadcastForm.message}
              onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};


import React, { useState } from 'react';
import { Bell, Sparkles, Award, CalendarCheck2, FileText, CheckCircle2, Trash2 } from 'lucide-react';
import { STUDENT_NOTIFICATIONS } from '../../data/notificationsData';
import { AppNotification } from '../../types';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

interface StudentNotificationsPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const StudentNotificationsPage: React.FC<StudentNotificationsPageProps> = ({ onShowToast }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(STUDENT_NOTIFICATIONS);
  const [filter, setFilter] = useState<string>('all');

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    onShowToast('info', 'Notifications Marked Read', 'All alerts have been cleared.');
  };

  const handleDismiss = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'prediction': return <Sparkles className="w-4 h-4 text-indigo-600" />;
      case 'assessment': return <Award className="w-4 h-4 text-amber-600" />;
      case 'attendance': return <CalendarCheck2 className="w-4 h-4 text-emerald-600" />;
      case 'academic': return <FileText className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Notifications & Announcements</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Academic updates, assessment alerts, and ML model evaluation notices.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
          Mark All as Read
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['all', 'prediction', 'assessment', 'academic', 'attendance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 rounded-xl font-medium capitalize shrink-0 transition-colors cursor-pointer ${
              filter === tab
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80'
            }`}
          >
            {tab === 'all' ? 'All Alerts' : tab}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                !n.read
                  ? 'bg-white border-indigo-200/80 shadow-xs ring-1 ring-indigo-500/10'
                  : 'bg-white/80 border-slate-200/80 opacity-85'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl border mt-0.5 shrink-0 ${
                  n.type === 'prediction' ? 'bg-indigo-50 border-indigo-100' :
                  n.type === 'assessment' ? 'bg-amber-50 border-amber-100' :
                  n.type === 'attendance' ? 'bg-emerald-50 border-emerald-100' :
                  'bg-slate-50 border-slate-200'
                }`}>
                  {getIcon(n.type)}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                    {!n.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{n.message}</p>
                  <span className="text-[10px] text-slate-400 font-medium block pt-1">{n.date}</span>
                </div>
              </div>

              <button
                onClick={() => handleDismiss(n.id)}
                className="p-1 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer shrink-0"
                title="Dismiss"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400 text-xs">
            No notifications found in this category.
          </div>
        )}
      </div>
    </div>
  );
};


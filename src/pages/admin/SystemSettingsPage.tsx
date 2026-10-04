import React, { useState } from 'react';
import { Sliders, Save, Sparkles, Building, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface SystemSettingsPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const SystemSettingsPage: React.FC<SystemSettingsPageProps> = ({ onShowToast }) => {
  const [settings, setSettings] = useState({
    instituteName: 'ABC Academy',
    academicSession: '2026 - 2027 (Autumn)',
    campusLocation: 'Sector V, Salt Lake City, Kolkata, WB 700091',
    distinctionCutoff: 85,
    goodCutoff: 75,
    averageCutoff: 60,
    atRiskThreshold: 60,
    minAttendancePercent: 85,
    mlModelActive: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('success', 'System Configuration Saved', 'Academic policies and ML thresholds updated.');
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">System & AI Model Settings</h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Configure grading rubrics, supervised ML thresholds, and institute parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Institute Configuration */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">Institute Identity & Academic Term</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Institute Branding Name</label>
              <input
                type="text"
                value={settings.instituteName}
                onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Active Academic Term</label>
              <input
                type="text"
                value={settings.academicSession}
                onChange={(e) => setSettings({ ...settings, academicSession: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Physical Campus Address</label>
              <input
                type="text"
                value={settings.campusLocation}
                onChange={(e) => setSettings({ ...settings, campusLocation: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* ML Prediction Thresholds (from PDF) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900">ML Linear Regression Classification Cutoffs</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 space-y-1">
              <label className="block font-bold text-indigo-900">Distinction (&ge; pts)</label>
              <input
                type="number"
                value={settings.distinctionCutoff}
                onChange={(e) => setSettings({ ...settings, distinctionCutoff: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white border border-indigo-200 rounded-lg font-bold text-sm"
              />
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
              <label className="block font-bold text-emerald-900">Good Tier (&ge; pts)</label>
              <input
                type="number"
                value={settings.goodCutoff}
                onChange={(e) => setSettings({ ...settings, goodCutoff: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white border border-emerald-200 rounded-lg font-bold text-sm"
              />
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 space-y-1">
              <label className="block font-bold text-amber-900">Average Tier (&ge; pts)</label>
              <input
                type="number"
                value={settings.averageCutoff}
                onChange={(e) => setSettings({ ...settings, averageCutoff: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white border border-amber-200 rounded-lg font-bold text-sm"
              />
            </div>

            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 space-y-1">
              <label className="block font-bold text-rose-900">At-Risk Cutoff (&lt; pts)</label>
              <input
                type="number"
                value={settings.atRiskThreshold}
                onChange={(e) => setSettings({ ...settings, atRiskThreshold: Number(e.target.value) })}
                className="w-full px-2 py-1 bg-white border border-rose-200 rounded-lg font-bold text-sm"
              />
            </div>
          </div>

          <div className="pt-2 text-xs">
            <label className="block font-semibold text-slate-700 mb-1">Minimum Attendance Policy Requirement (%)</label>
            <input
              type="number"
              value={settings.minAttendancePercent}
              onChange={(e) => setSettings({ ...settings, minAttendancePercent: Number(e.target.value) })}
              className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
            />
            <span className="text-[11px] text-slate-400 block mt-1">Students below this threshold trigger placement probation warnings.</span>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="md"
            icon={<Save className="w-4 h-4" />}
            iconPosition="right"
          >
            Save System Policies
          </Button>
        </div>
      </form>
    </div>
  );
};


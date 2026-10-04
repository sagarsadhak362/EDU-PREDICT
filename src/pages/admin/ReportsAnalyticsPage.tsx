import React from 'react';
import { BarChart2, Download, FileSpreadsheet, FileText, Calendar, Filter, Sparkles } from 'lucide-react';
import { Button } from '../../components/common/Button';

interface ReportsAnalyticsPageProps {
  onShowToast: (type: 'success' | 'error' | 'info', title: string, msg?: string) => void;
}

export const ReportsAnalyticsPage: React.FC<ReportsAnalyticsPageProps> = ({ onShowToast }) => {
  const handleExport = (reportName: string, format: 'PDF' | 'CSV') => {
    onShowToast('success', `${format} Generated`, `Exported "${reportName}" (${format}) successfully.`);
  };

  const reports = [
    {
      title: 'Academic Performance & Final Grade Forecast',
      description: 'Comprehensive cohort score report cross-referencing attendance, mock test percentiles, and linear regression targets.',
      records: '1,420 Students',
      updated: 'Today at 09:30 AM',
      type: 'Performance',
    },
    {
      title: 'Attendance Compliance & Regularization Audit',
      description: 'Session-by-session lecture log highlighting students with attendance under 85% placement threshold.',
      records: '50 Lectures Evaluated',
      updated: 'Yesterday',
      type: 'Attendance',
    },
    {
      title: 'Supervised ML Model Accuracy & Residuals Audit',
      description: 'Detailed analysis of MAE (2.34), RMSE (2.98), and R² (0.912) across test data splits.',
      records: '850 Training Samples',
      updated: 'Oct 02, 2026',
      type: 'Machine Learning',
    },
    {
      title: 'Admissions & Enrolment Conversion Trends',
      description: 'Breakdown of applications across Python + Django, Machine Learning, and Data Science programs.',
      records: '342 New Enrolments',
      updated: 'This Week',
      type: 'Admissions',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Reports & Analytics Engine</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generate and export academic summaries, attendance audits, and predictive model evaluations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<FileSpreadsheet className="w-4 h-4" />}
            onClick={() => handleExport('Master Cohort Roster', 'CSV')}
          >
            Export All (CSV)
          </Button>
          <Button
            size="sm"
            icon={<FileText className="w-4 h-4" />}
            onClick={() => handleExport('Executive Academic Briefing', 'PDF')}
          >
            Export Executive PDF
          </Button>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((rep, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  {rep.type}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{rep.updated}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{rep.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{rep.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">{rep.records}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExport(rep.title, 'CSV')}
                  className="px-2.5 py-1 text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-lg border border-slate-200 cursor-pointer"
                >
                  CSV
                </button>
                <button
                  onClick={() => handleExport(rep.title, 'PDF')}
                  className="px-2.5 py-1 text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg border border-indigo-100 cursor-pointer"
                >
                  PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


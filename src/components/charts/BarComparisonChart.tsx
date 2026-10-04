import React from 'react';

interface ComparisonMetric {
  label: string;
  studentValue: number;
  batchAverage: number;
  unit?: string;
  max?: number;
}

interface BarComparisonChartProps {
  metrics: ComparisonMetric[];
  studentName?: string;
}

export const BarComparisonChart: React.FC<BarComparisonChartProps> = ({
  metrics,
  studentName = 'Rahul Sen',
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
        <span className="font-semibold text-slate-500 uppercase tracking-wider">Metric Comparison</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-indigo-600">
            <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600" /> {studentName}
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-400">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300" /> Batch Average
          </span>
        </div>
      </div>

      <div className="space-y-3.5">
        {metrics.map((m, idx) => {
          const maxVal = m.max || 100;
          const studentPct = Math.min(100, (m.studentValue / maxVal) * 100);
          const batchPct = Math.min(100, (m.batchAverage / maxVal) * 100);
          const unit = m.unit || '%';

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">{m.label}</span>
                <div className="flex items-center gap-3 font-mono text-[11px]">
                  <span className="text-indigo-600 font-bold">
                    {m.studentValue}{unit}
                  </span>
                  <span className="text-slate-400">
                    avg {m.batchAverage}{unit}
                  </span>
                </div>
              </div>

              {/* Stacked comparison bars */}
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden relative">
                {/* Batch average background marker */}
                <div
                  className="h-full bg-slate-300 absolute left-0 top-0 rounded-full transition-all duration-500"
                  style={{ width: `${batchPct}%` }}
                />
                {/* Student overlay */}
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 absolute left-0 top-0 rounded-full shadow-xs transition-all duration-500"
                  style={{ width: `${studentPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


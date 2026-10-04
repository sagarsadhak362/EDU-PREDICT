import React from 'react';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  showLabels?: boolean;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 240,
  showLabels = true,
}) => {
  const clampedScore = Math.min(100, Math.max(0, score));
  
  // Angle: -120 deg to +120 deg (total 240 deg span)
  const totalAngle = 240;
  const startAngle = -120;
  const currentAngle = startAngle + (clampedScore / 100) * totalAngle;

  const radius = size * 0.38;
  const strokeWidth = size * 0.08;
  const center = size / 2;

  // Function to calculate arc path
  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, r: number, startA: number, endA: number) => {
    const start = polarToCartesian(x, y, r, endA);
    const end = polarToCartesian(x, y, r, startA);
    const largeArcFlag = endA - startA <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const bgArc = describeArc(center, center + 10, radius, startAngle, startAngle + totalAngle);
  const activeArc = describeArc(center, center + 10, radius, startAngle, currentAngle);

  let statusColor = '#10b981'; // emerald
  let statusText = 'Good';
  if (clampedScore >= 85) {
    statusColor = '#6366f1'; // indigo
    statusText = 'Distinction';
  } else if (clampedScore >= 75) {
    statusColor = '#10b981'; // emerald
    statusText = 'Good';
  } else if (clampedScore >= 60) {
    statusColor = '#f59e0b'; // amber
    statusText = 'Average';
  } else {
    statusColor = '#f43f5e'; // rose
    statusText = 'Needs Attention';
  }

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative" style={{ width: size, height: size * 0.85 }}>
        <svg width={size} height={size * 0.85} viewBox={`0 0 ${size} ${size * 0.85}`} className="overflow-visible">
          {/* Background track */}
          <path
            d={bgArc}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Color Zone Ticks */}
          {/* Active arc gradient or solid */}
          <path
            d={activeArc}
            fill="none"
            stroke={statusColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 transition-all duration-300">
            {clampedScore.toFixed(1)}
          </span>
          <span className="text-xs font-semibold text-slate-400 mt-0.5">out of 100</span>
          
          <div
            className="mt-2 text-xs font-bold px-2.5 py-0.5 rounded-full border"
            style={{
              backgroundColor: `${statusColor}15`,
              color: statusColor,
              borderColor: `${statusColor}40`,
            }}
          >
            {statusText}
          </div>
        </div>
      </div>

      {showLabels && (
        <div className="w-full max-w-xs grid grid-cols-4 gap-1 text-center text-[10px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
          <div className="text-rose-500">&lt;60 Attention</div>
          <div className="text-amber-600">60-74 Avg</div>
          <div className="text-emerald-600">75-84 Good</div>
          <div className="text-indigo-600">85+ Distinction</div>
        </div>
      )}
    </div>
  );
};


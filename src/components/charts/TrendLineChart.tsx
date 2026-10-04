import React, { useState } from 'react';

interface DataPoint {
  label: string;
  score: number;
  benchmark?: number;
}

interface TrendLineChartProps {
  data: DataPoint[];
  title?: string;
  height?: number;
}

export const TrendLineChart: React.FC<TrendLineChartProps> = ({
  data,
  title,
  height = 200,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) return null;

  const minVal = 40;
  const maxVal = 100;
  const range = maxVal - minVal;

  const width = 600;
  const paddingX = 40;
  const paddingY = 25;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const getCoordinates = (val: number, idx: number) => {
    const x = paddingX + (idx / (data.length - 1)) * chartWidth;
    const y = paddingY + chartHeight - ((val - minVal) / range) * chartHeight;
    return { x, y };
  };

  const points = data.map((d, i) => getCoordinates(d.score, i));
  const benchmarkPoints = data.map((d, i) => getCoordinates(d.benchmark || 75, i));

  // Construct SVG paths
  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x},${height - paddingY} L ${points[0].x},${height - paddingY} Z`;

  const benchmarkD = benchmarkPoints.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`;
  }, '');

  return (
    <div className="w-full select-none">
      {title && (
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" /> Student Score
            </span>
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <span className="w-2.5 h-0.5 bg-slate-300 border-dashed" /> Cohort Benchmark (75)
            </span>
          </div>
        </div>
      )}

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="scoreAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[50, 75, 100].map((val) => {
            const y = paddingY + chartHeight - ((val - minVal) / range) * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={paddingX - 10}
                  y={y + 4}
                  fill="#94a3b8"
                  fontSize="10"
                  textAnchor="end"
                  fontFamily="sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Benchmark line */}
          <path
            d={benchmarkD}
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Fill Area */}
          <path d={areaD} fill="url(#scoreAreaGradient)" />

          {/* Score line */}
          <path
            d={pathD}
            fill="none"
            stroke="#6366f1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {points.map((pt, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <g
                key={i}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? 6 : 4}
                  fill="#ffffff"
                  stroke="#6366f1"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />
                {/* X axis labels */}
                <text
                  x={pt.x}
                  y={height - 6}
                  fill={isHovered ? '#4338ca' : '#94a3b8'}
                  fontSize="10"
                  fontWeight={isHovered ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {data[i].label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredIndex !== null && (
          <div
            className="absolute -top-1 pointer-events-none transform -translate-x-1/2 bg-slate-900 text-white text-[11px] font-medium py-1 px-2.5 rounded-lg shadow-lg z-10"
            style={{
              left: `${(points[hoveredIndex].x / width) * 100}%`,
            }}
          >
            <div className="font-bold">{data[hoveredIndex].label}</div>
            <div className="text-indigo-300">Score: {data[hoveredIndex].score}</div>
          </div>
        )}
      </div>
    </div>
  );
};


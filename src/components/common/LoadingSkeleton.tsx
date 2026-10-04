import React from 'react';

interface SkeletonProps {
  type?: 'card' | 'table' | 'text' | 'chart';
  rows?: number;
}

export const LoadingSkeleton: React.FC<SkeletonProps> = ({ type = 'card', rows = 3 }) => {
  if (type === 'table') {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-4 animate-pulse space-y-4">
        <div className="h-10 bg-slate-100 rounded-xl w-full" />
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="h-8 w-8 rounded-full bg-slate-100 shrink-0" />
            <div className="h-5 bg-slate-100 rounded-lg flex-1" />
            <div className="h-5 bg-slate-100 rounded-lg w-24" />
            <div className="h-5 bg-slate-100 rounded-lg w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="w-full h-64 bg-white rounded-2xl border border-slate-200 p-6 animate-pulse flex flex-col justify-end gap-3">
        <div className="h-4 bg-slate-100 rounded w-1/4 mb-auto" />
        <div className="flex items-end gap-4 h-40">
          <div className="h-24 bg-slate-100 rounded-t-lg flex-1" />
          <div className="h-32 bg-slate-100 rounded-t-lg flex-1" />
          <div className="h-20 bg-slate-100 rounded-t-lg flex-1" />
          <div className="h-36 bg-slate-100 rounded-t-lg flex-1" />
          <div className="h-28 bg-slate-100 rounded-t-lg flex-1" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-slate-100 rounded w-1/3" />
            <div className="h-8 w-8 rounded-xl bg-slate-100" />
          </div>
          <div className="h-8 bg-slate-100 rounded w-1/2" />
          <div className="h-3 bg-slate-100 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
};


import React from 'react';

export default function OperationStatusBadge({ status, className = '' }) {
  const getStyles = () => {
    switch (status) {
      case 'Pendiente':
        return {
          container: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500'
        };
      case 'En Tránsito':
        return {
          container: 'bg-sky-50 text-sky-800 border-sky-200',
          dot: 'bg-sky-500 animate-pulse'
        };
      case 'Despachado':
        return {
          container: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500'
        };
      case 'Cerrado':
        return {
          container: 'bg-slate-100 text-slate-700 border-slate-200',
          dot: 'bg-slate-400'
        };
      default:
        return {
          container: 'bg-slate-50 text-slate-700 border-slate-200',
          dot: 'bg-slate-400'
        };
    }
  };

  const { container, dot } = getStyles();

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${container} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
      <span>{status}</span>
    </span>
  );
}

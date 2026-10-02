import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.5} />,
    error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" strokeWidth={1.5} />,
    info: <Info className="w-4 h-4 text-slate-700 shrink-0" strokeWidth={1.5} />
  };

  return (
    <div 
      role="status" 
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-white border border-slate-200 shadow-lg px-4 py-3 rounded-lg max-w-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2"
    >
      {iconMap[toast.type] || iconMap.info}
      <div className="text-sm font-medium text-slate-800">
        {toast.message}
      </div>
      <button
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="ml-auto text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
      >
        <X className="w-3.5 h-3.5" strokeWidth={1.5} />
      </button>
    </div>
  );
}

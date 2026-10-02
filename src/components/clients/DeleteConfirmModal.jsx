import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ 
  isOpen, 
  title = 'Confirmar Eliminación', 
  message, 
  itemName,
  onConfirm, 
  onClose 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        className="relative bg-white border border-slate-200 rounded-lg max-w-md w-full p-6 shadow-xl z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <AlertTriangle className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 leading-tight">
                {title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Acción no reversible</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
            aria-label="Cerrar ventana"
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="text-sm text-slate-600 mb-6 leading-relaxed">
          {message}
          {itemName && (
            <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-md font-medium text-slate-800 text-xs">
              {itemName}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 active:scale-[0.98] rounded-lg transition-colors cursor-pointer"
          >
            Confirmar y Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

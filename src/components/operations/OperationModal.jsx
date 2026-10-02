import React, { useState, useEffect } from 'react';
import { X, Hash, Building2, MapPin, Package, Calendar, Activity, FileText } from 'lucide-react';
import { OPERATION_STATUSES } from '../../data/initialData';

export default function OperationModal({ 
  isOpen, 
  onClose, 
  onSave, 
  clients = [],
  initialData = null 
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    id: '',
    clientName: '',
    origin: '',
    destination: '',
    cargoType: '',
    status: 'Pendiente',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        clientName: initialData.clientName || '',
        origin: initialData.origin || '',
        destination: initialData.destination || '',
        cargoType: initialData.cargoType || '',
        status: initialData.status || 'Pendiente',
        date: initialData.date || new Date().toISOString().split('T')[0],
        notes: initialData.notes || ''
      });
    } else {
      const generatedId = `VSI-${new Date().getFullYear()}-${Math.floor(110 + Math.random() * 880)}`;
      setFormData({
        id: generatedId,
        clientName: clients.length > 0 ? clients[0].company : '',
        origin: '',
        destination: '',
        cargoType: '',
        status: 'Pendiente',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen, clients]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.id.trim()) newErrors.id = 'El ID de la operación es obligatorio.';
    if (!formData.clientName.trim()) newErrors.clientName = 'Debe especificar el cliente.';
    if (!formData.origin.trim()) newErrors.origin = 'El punto de origen es obligatorio.';
    if (!formData.destination.trim()) newErrors.destination = 'El punto de destino es obligatorio.';
    if (!formData.cargoType.trim()) newErrors.cargoType = 'Especifique el tipo de carga o mercadería.';
    if (!formData.date) newErrors.date = 'La fecha de operación es obligatoria.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      id: formData.id.trim().toUpperCase(),
      clientName: formData.clientName.trim(),
      origin: formData.origin.trim(),
      destination: formData.destination.trim(),
      cargoType: formData.cargoType.trim(),
      status: formData.status,
      date: formData.date,
      notes: formData.notes.trim()
    });
  };

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
        className="relative bg-white border border-slate-200 rounded-lg max-w-lg w-full max-h-[90vh] flex flex-col shadow-xl z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {isEditing ? 'Editar Operación' : 'Registrar Nueva Operación'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Control logístico interno — VS International LLC
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {/* ID & Estado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                ID Operación *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Hash className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  value={formData.id}
                  disabled={isEditing}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="VSI-2026-110"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    isEditing ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200' : ''
                  } ${
                    errors.id 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.id && <p className="text-xs text-rose-600 mt-1">{errors.id}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Estado Operativo *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Activity className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
                >
                  {OPERATION_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Cliente */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Cliente Asociado *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <Building2 className="w-4 h-4" strokeWidth={1.5} />
              </span>
              {clients.length > 0 ? (
                <select
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.company}>
                      {c.company} ({c.location})
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="Nombre de la empresa cliente"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />
              )}
            </div>
            {errors.clientName && <p className="text-xs text-rose-600 mt-1">{errors.clientName}</p>}
          </div>

          {/* Origen & Destino */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Punto de Origen *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  placeholder="Ej. PortMiami, FL (EE.UU.)"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.origin 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.origin && <p className="text-xs text-rose-600 mt-1">{errors.origin}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Punto de Destino *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  placeholder="Ej. Puerto de Valparaíso (Chile)"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.destination 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.destination && <p className="text-xs text-rose-600 mt-1">{errors.destination}</p>}
            </div>
          </div>

          {/* Tipo de Carga & Fecha */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Tipo de Carga / Mercadería *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Package className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  value={formData.cargoType}
                  onChange={(e) => setFormData({ ...formData, cargoType: e.target.value })}
                  placeholder="Ej. Contenedor FCL 40ft (Maquinaria)"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.cargoType 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.cargoType && <p className="text-xs text-rose-600 mt-1">{errors.cargoType}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Fecha Operativa *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Calendar className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.date 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.date && <p className="text-xs text-rose-600 mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Notas Operativas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Notas & Despacho (Opcional)
            </label>
            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Estado de la guía BL, documentos aduaneros, transportista marítimo o aéreo asignado..."
              className="w-full p-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.98] rounded-lg transition-all cursor-pointer shadow-xs"
            >
              {isEditing ? 'Guardar Cambios' : 'Registrar Operación'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

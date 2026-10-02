import React, { useState, useEffect } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, Briefcase, FileText } from 'lucide-react';
import { SERVICE_OPTIONS } from '../../data/initialData';

export default function ClientModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData = null 
}) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    service: 'Logística',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || '',
        contactName: initialData.contactName || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        location: initialData.location || '',
        service: initialData.service || 'Logística',
        notes: initialData.notes || ''
      });
    } else {
      setFormData({
        company: '',
        contactName: '',
        email: '',
        phone: '',
        location: '',
        service: 'Logística',
        notes: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = 'La razón social o empresa es obligatoria.';
    if (!formData.contactName.trim()) newErrors.contactName = 'El nombre de contacto es obligatorio.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Ingrese un formato de correo válido.';
    }

    if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio.';
    if (!formData.location.trim()) newErrors.location = 'La ubicación o país es obligatorio.';
    if (!formData.service) newErrors.service = 'Seleccione un tipo de servicio.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...(initialData ? { id: initialData.id, createdAt: initialData.createdAt } : {}),
      company: formData.company.trim(),
      contactName: formData.contactName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      location: formData.location.trim(),
      service: formData.service,
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
              {isEditing ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Directorio comercial de VS International LLC
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4 flex-1">
          {/* Empresa / Razón Social */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Empresa / Razón Social *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <Building2 className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Ej. Panamericana Cargo S.A."
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                  errors.company 
                    ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                    : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                }`}
              />
            </div>
            {errors.company && <p className="text-xs text-rose-600 mt-1">{errors.company}</p>}
          </div>

          {/* Contacto & Email (2 cols on sm) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Nombre de Contacto *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Juan Pablo Morales"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.contactName 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.contactName && <p className="text-xs text-rose-600 mt-1">{errors.contactName}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Correo Electrónico *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contacto@empresa.com"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.email 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Teléfono & Ubicación (2 cols on sm) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Teléfono de Contacto *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <Phone className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (305) 555-0142"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.phone 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                País / Ubicación *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                  <MapPin className="w-4 h-4" strokeWidth={1.5} />
                </span>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Miami, Estados Unidos"
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-1 transition-colors ${
                    errors.location 
                      ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-500' 
                      : 'border-slate-300 focus:border-slate-900 focus:ring-slate-900'
                  }`}
                />
              </div>
              {errors.location && <p className="text-xs text-rose-600 mt-1">{errors.location}</p>}
            </div>
          </div>

          {/* Servicio Asociado */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Servicio Asociado *
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <Briefcase className="w-4 h-4" strokeWidth={1.5} />
              </span>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors cursor-pointer"
              >
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Notas Operativas */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
              Notas Operativas (Opcional)
            </label>
            <div className="relative">
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Requerimientos específicos, aduana preferente, tipo de carga habitual..."
                className="w-full p-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors resize-none"
              />
            </div>
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
              {isEditing ? 'Guardar Cambios' : 'Registrar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  ShieldCheck, 
  FileCheck, 
  ExternalLink, 
  Save, 
  Check, 
  Layers,
  Clock,
  Download
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/initialData';

export default function CompanyProfile({ onNotify }) {
  const [companyData, setCompanyData] = useState(COMPANY_INFO);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(COMPANY_INFO);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setCompanyData(formData);
    setIsEditing(false);
    setSavedSuccess(true);
    if (onNotify) {
      onNotify('success', 'Datos corporativos actualizados correctamente.');
    }
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleDownloadBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(companyData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `VS_International_Profile_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (onNotify) {
      onNotify('info', 'Archivo de configuración exportado.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Perfil de la Empresa
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Información institucional, presencia corporativa y parámetros del sistema.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadBackup}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Exportar Ficha</span>
          </button>
          
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <span>Editar Información</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData(companyData);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <span>Cancelar</span>
            </button>
          )}
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm rounded-lg flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={1.5} />
          <span>Los datos institucionales han sido guardados en el estado de la aplicación.</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Corporate Brand Identity Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xl tracking-tight shrink-0 shadow-xs">
                VS
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">
                  {companyData.legalName}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {companyData.taxId}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
              {companyData.businessScope}
            </p>

            <div className="pt-2 border-t border-slate-100 space-y-3 text-xs">
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Portal Web:</span>
                <a
                  href={`https://${companyData.portalUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-slate-900 hover:underline inline-flex items-center gap-1"
                >
                  <span>{companyData.portalUrl}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" strokeWidth={1.5} />
                </a>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Correo Oficial:</span>
                <a
                  href={`mailto:${companyData.officialEmail}`}
                  className="font-medium text-slate-900 hover:underline"
                >
                  {companyData.officialEmail}
                </a>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Año de Fundación:</span>
                <span className="font-medium text-slate-900">{companyData.founded}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Horario de Operaciones:</span>
                <span className="font-medium text-slate-900 text-right">{companyData.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Compliance & Security Box */}
          <div className="bg-slate-50/50 border border-slate-200 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
              <span>Garantía Institucional</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              VS International LLC opera bajo las directrices y regulaciones del Departamento de Estado de Florida y los protocolos internacionales de comercio de la OMC y WCO.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Details & Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {isEditing ? 'Modificar Información Institucional' : 'Detalles de Contacto y Sede Principal'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Información visible en despachos, órdenes y manifiestos de carga.
                </p>
              </div>
            </div>

            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Razón Social
                    </label>
                    <input
                      type="text"
                      value={formData.legalName}
                      onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Identificación Fiscal (EIN)
                    </label>
                    <input
                      type="text"
                      value={formData.taxId}
                      onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Correo Electrónico Corporativo
                    </label>
                    <input
                      type="email"
                      value={formData.officialEmail}
                      onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Teléfono Corporativo
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Dirección de Sede Principal
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Alcance de Servicios / Resumen Operativo
                  </label>
                  <textarea
                    rows={3}
                    value={formData.businessScope}
                    onChange={(e) => setFormData({ ...formData, businessScope: e.target.value })}
                    className="w-full p-3 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 resize-none"
                    required
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData(companyData);
                    }}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <Save className="w-4 h-4" strokeWidth={1.5} />
                    <span>Guardar Modificaciones</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-slate-100 bg-slate-50/40">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Correo Electrónico
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {companyData.officialEmail}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Mesa de despacho y atención comercial
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-100 bg-slate-50/40">
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Teléfono Corporativo
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {companyData.phone}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Línea directa para agentes y transportistas
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-slate-100 bg-slate-50/40">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Sede Legal & Domicilio Comercial
                  </div>
                  <div className="text-sm font-medium text-slate-900">
                    {companyData.address}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Oficinas centrales en Miami, Florida — Punto neurálgico para comercio panamericano.
                  </div>
                </div>

                {/* Divisiones de Servicio */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Divisiones Operativas Principales
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 border border-slate-200 rounded-lg bg-white">
                      <div className="font-semibold text-slate-900 mb-1">Logística Multimodal</div>
                      <p className="text-slate-500 leading-relaxed text-[11px]">
                        Fletes marítimos FCL/LCL, transporte aéreo consolidado y enlaces terrestres.
                      </p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg bg-white">
                      <div className="font-semibold text-slate-900 mb-1">Comercio Exterior</div>
                      <p className="text-slate-500 leading-relaxed text-[11px]">
                        Intermediación transfronteriza, compraventa internacional y gestión de proveedores.
                      </p>
                    </div>
                    <div className="p-3 border border-slate-200 rounded-lg bg-white">
                      <div className="font-semibold text-slate-900 mb-1">Asesoría Arancelaria</div>
                      <p className="text-slate-500 leading-relaxed text-[11px]">
                        Regulaciones aduaneras, clasificación arancelaria y cumplimiento tributario.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

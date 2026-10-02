import React from 'react';
import { 
  Users, 
  ArrowRightLeft, 
  Building2, 
  X, 
  FileText,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  mobileOpen, 
  onCloseMobile,
  clientsCount,
  operationsCount
}) {
  const navItems = [
    {
      id: 'clients',
      label: 'Directorio de Clientes',
      icon: Users,
      badge: clientsCount,
      description: 'Gestión de clientes y contactos'
    },
    {
      id: 'operations',
      label: 'Control Operativo',
      icon: ArrowRightLeft,
      badge: operationsCount,
      description: 'Envíos y solicitudes internas'
    },
    {
      id: 'company',
      label: 'Perfil de Empresa',
      icon: Building2,
      badge: null,
      description: 'Datos corporativos y políticas'
    }
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Brand logo container */}
      <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-xs">
            VS
          </div>
          <div>
            <div className="font-bold text-slate-900 text-sm tracking-tight leading-none">
              VS INTERNATIONAL
            </div>
            <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mt-1 leading-none">
              Logistics & Trade LLC
            </div>
          </div>
        </div>

        {/* Mobile close button */}
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar navegación"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Módulos del Sistema
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer text-left ${
                isActive
                  ? 'bg-slate-900 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} strokeWidth={1.5} />
                <span>{item.label}</span>
              </div>
              {item.badge !== null && (
                <span 
                  className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                    isActive 
                      ? 'bg-slate-800 text-slate-200' 
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Corporate Summary Box */}
      <div className="p-4 m-3 border border-slate-200 rounded-lg bg-slate-50/50 text-xs text-slate-600 space-y-2">
        <div className="font-semibold text-slate-900 flex items-center justify-between">
          <span>VS International LLC</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Sistema Operativo Activo"></span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Servicios de intermediación comercial y coordinación logística multimodal.
        </p>
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
          <span className="text-slate-400 font-mono">Miami, Florida</span>
          <a
            href="https://vsinternationalllc.com"
            target="_blank"
            rel="noreferrer"
            className="text-slate-700 hover:text-slate-950 font-medium inline-flex items-center gap-1"
          >
            <span>Portal</span>
            <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
          </a>
        </div>
      </div>

      {/* Bottom version */}
      <div className="px-6 py-3 border-t border-slate-200 text-[11px] text-slate-400 font-mono flex items-center justify-between">
        <span>SISTEMA INTERNO</span>
        <span>v1.0.4</span>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed) */}
      <aside className="hidden lg:block w-64 h-screen border-r border-slate-200 shrink-0 sticky top-0 bg-white">
        {content}
      </aside>

      {/* Mobile Drawer (Collapsible) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />

          {/* Drawer sheet */}
          <div className="relative w-72 max-w-[85vw] h-full bg-white shadow-xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}

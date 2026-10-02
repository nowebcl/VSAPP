import React from 'react';
import { Menu, LogOut, User, Globe, ChevronRight } from 'lucide-react';

export default function Header({ 
  activeTab, 
  user, 
  onLogout, 
  onToggleMobileMenu 
}) {
  const getTabLabel = (tab) => {
    switch (tab) {
      case 'clients':
        return 'Directorio de Clientes';
      case 'operations':
        return 'Control de Operaciones';
      case 'company':
        return 'Perfil Corporativo';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 px-4 sm:px-6 flex items-center justify-between">
      {/* Left side: Mobile hamburger + active section breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Abrir menú de navegación"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>

        {/* Mobile brand (shown only on small screens where sidebar is hidden) */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
            VS
          </div>
          <span className="font-semibold text-slate-900 text-sm tracking-tight">
            VS International
          </span>
        </div>

        {/* Desktop breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 text-sm">
          <span className="text-slate-400 font-normal">Panel Administrativo</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" strokeWidth={1.5} />
          <h1 className="text-slate-900 font-semibold">{getTabLabel(activeTab)}</h1>
        </div>
      </div>

      {/* Right side: Portal link, User info & Logout */}
      <div className="flex items-center gap-3 sm:gap-4">
        <a
          href="https://vsinternationalllc.com"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
        >
          <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>vsinternationalllc.com</span>
        </a>

        <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg border border-slate-200 bg-slate-50/50">
          <div className="w-6 h-6 rounded-md bg-slate-200 flex items-center justify-center text-slate-700">
            <User className="w-3.5 h-3.5" strokeWidth={1.5} />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-slate-900 leading-tight">Admin</div>
            <div className="text-[10px] text-slate-500 leading-tight">VS International</div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          type="button"
          title="Cerrar sesión"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span className="hidden sm:inline">Cerrar Sesión</span>
        </button>
      </div>
    </header>
  );
}

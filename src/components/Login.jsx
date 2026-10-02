import React, { useState } from 'react';
import { Lock, User, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError('Por favor complete todos los campos de acceso.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (cleanUser === 'admin' && cleanPass === 'admin') {
        setIsSubmitting(false);
        onLoginSuccess({ username: 'admin', role: 'Administrador General' });
      } else {
        setIsSubmitting(false);
        setError('Credenciales no válidas. Verifique su usuario y contraseña.');
      }
    }, 250);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin');
    setError('');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-slate-200">
      {/* Top minimal bar */}
      <header className="border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm tracking-tight">
              VS
            </div>
            <div>
              <span className="text-sm font-semibold tracking-wider text-slate-900 uppercase">
                VS International LLC
              </span>
              <span className="hidden sm:inline text-xs text-slate-400 ml-2 border-l border-slate-200 pl-2">
                vsinternationalllc.com
              </span>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            PORTAL INTERNO v1.0
          </div>
        </div>
      </header>

      {/* Main card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card header */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase mb-2">
              <ShieldCheck className="w-4 h-4 text-slate-700" strokeWidth={1.5} />
              Acceso Corporativo Seguro
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Iniciar Sesión
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Plataforma de gestión comercial y seguimiento logístico.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {error && (
                <div 
                  role="alert" 
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm leading-snug"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label 
                  htmlFor="username" 
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  Usuario
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <User className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white text-sm font-semibold rounded-lg transition-all duration-150 shadow-xs disabled:opacity-60 cursor-pointer"
              >
                <span>{isSubmitting ? 'Autenticando...' : 'Entrar al Sistema'}</span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" strokeWidth={1.5} />}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <span>Credenciales por defecto: <strong>admin</strong> / <strong>admin</strong></span>
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-slate-900 font-semibold hover:underline cursor-pointer"
              >
                Autocompletar
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} VS International LLC — Todos los derechos reservados.
      </footer>
    </div>
  );
}

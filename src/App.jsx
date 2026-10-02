import React, { useState, useEffect } from 'react';
import { 
  INITIAL_CLIENTS, 
  INITIAL_OPERATIONS 
} from './data/initialData';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ClientsDirectory from './components/clients/ClientsDirectory';
import OperationsTracker from './components/operations/OperationsTracker';
import CompanyProfile from './components/company/CompanyProfile';
import Toast from './components/Toast';

export default function App() {
  // Authentication state (Mock prototype)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vsi_session_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active module tab
  const [activeTab, setActiveTab] = useState('clients');

  // Mobile menu drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Clients state
  const [clients, setClients] = useState(() => {
    try {
      const saved = localStorage.getItem('vsi_clients_data');
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vsi_clients_data', JSON.stringify(clients));
    } catch (e) {
      console.error(e);
    }
  }, [clients]);

  // Operations state
  const [operations, setOperations] = useState(() => {
    try {
      const saved = localStorage.getItem('vsi_operations_data');
      return saved ? JSON.parse(saved) : INITIAL_OPERATIONS;
    } catch {
      return INITIAL_OPERATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('vsi_operations_data', JSON.stringify(operations));
    } catch (e) {
      console.error(e);
    }
  }, [operations]);

  // Authentication Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem('vsi_session_user', JSON.stringify(userData));
    } catch (e) {
      console.error(e);
    }
    showToast('success', 'Sesión iniciada correctamente como Administrador.');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('vsi_session_user');
    } catch (e) {
      console.error(e);
    }
    showToast('info', 'Sesión corporativa cerrada.');
  };

  // Client CRUD Handlers
  const handleAddClient = (clientData) => {
    const newClient = {
      ...clientData,
      id: `cli-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setClients((prev) => [newClient, ...prev]);
    showToast('success', `Cliente "${clientData.company}" agregado exitosamente.`);
  };

  const handleUpdateClient = (updatedClient) => {
    setClients((prev) =>
      prev.map((c) => (c.id === updatedClient.id ? updatedClient : c))
    );
    showToast('success', `Información de "${updatedClient.company}" actualizada.`);
  };

  const handleDeleteClient = (clientId) => {
    const clientToDelete = clients.find((c) => c.id === clientId);
    const companyName = clientToDelete ? clientToDelete.company : 'Cliente';
    setClients((prev) => prev.filter((c) => c.id !== clientId));
    showToast('info', `Cliente "${companyName}" eliminado del directorio.`);
  };

  // Operation CRUD Handlers
  const handleAddOperation = (operationData) => {
    setOperations((prev) => [operationData, ...prev]);
    showToast('success', `Operación ${operationData.id} registrada correctamente.`);
  };

  const handleUpdateOperation = (updatedOperation) => {
    setOperations((prev) =>
      prev.map((op) => (op.id === updatedOperation.id ? updatedOperation : op))
    );
    showToast('success', `Operación ${updatedOperation.id} actualizada.`);
  };

  const handleDeleteOperation = (operationId) => {
    setOperations((prev) => prev.filter((op) => op.id !== operationId));
    showToast('info', `Operación ${operationId} eliminada del registro.`);
  };

  const handleQuickUpdateStatus = (operationId, newStatus) => {
    setOperations((prev) =>
      prev.map((op) => (op.id === operationId ? { ...op, status: newStatus } : op))
    );
    showToast('info', `Estado de ${operationId} cambiado a "${newStatus}".`);
  };

  // If user is not authenticated, render Login screen
  if (!currentUser) {
    return (
      <>
        <Login onLoginSuccess={handleLoginSuccess} />
        <Toast toast={toast} onClose={() => setToast(null)} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col antialiased selection:bg-slate-200">
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          clientsCount={clients.length}
          operationsCount={operations.length}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Header */}
          <Header
            activeTab={activeTab}
            user={currentUser}
            onLogout={handleLogout}
            onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
          />

          {/* Page Content Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === 'clients' && (
              <ClientsDirectory
                clients={clients}
                onAddClient={handleAddClient}
                onUpdateClient={handleUpdateClient}
                onDeleteClient={handleDeleteClient}
              />
            )}

            {activeTab === 'operations' && (
              <OperationsTracker
                operations={operations}
                clients={clients}
                onAddOperation={handleAddOperation}
                onUpdateOperation={handleUpdateOperation}
                onDeleteOperation={handleDeleteOperation}
                onQuickUpdateStatus={handleQuickUpdateStatus}
              />
            )}

            {activeTab === 'company' && (
              <CompanyProfile onNotify={showToast} />
            )}
          </main>

          {/* Subdued Footer */}
          <footer className="border-t border-slate-200 px-6 py-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              VS International LLC — Sistema Administrativo y Operativo
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              vsinternationalllc.com
            </div>
          </footer>
        </div>
      </div>

      {/* Floating Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

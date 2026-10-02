import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Filter, 
  Edit3, 
  Trash2, 
  MapPin, 
  Mail, 
  Phone, 
  Building2, 
  User, 
  FileText,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { SERVICE_OPTIONS } from '../../data/initialData';
import ClientModal from './ClientModal';
import DeleteConfirmModal from './DeleteConfirmModal';

export default function ClientsDirectory({ 
  clients, 
  onAddClient, 
  onUpdateClient, 
  onDeleteClient 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('Todos');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [deletingClient, setDeletingClient] = useState(null);

  // Filtered clients list
  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch = 
        client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesService = 
        selectedService === 'Todos' || client.service === selectedService;

      return matchesSearch && matchesService;
    });
  }, [clients, searchTerm, selectedService]);

  const handleOpenAdd = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleSaveClient = (clientData) => {
    if (editingClient) {
      onUpdateClient(clientData);
    } else {
      onAddClient(clientData);
    }
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleConfirmDelete = () => {
    if (deletingClient) {
      onDeleteClient(deletingClient.id);
      setDeletingClient(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Action Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Directorio de Clientes
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestión comercial y relaciones con clientes corporativos de VS International LLC.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>Agregar Cliente</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-4 border border-slate-200 rounded-lg">
        {/* Search Input */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por empresa, contacto, país o email..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors placeholder:text-slate-400"
          />
        </div>

        {/* Filter buttons for desktop / Select on mobile */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide shrink-0 hidden sm:inline mr-1">
            Servicio:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {['Todos', ...SERVICE_OPTIONS].map((service) => {
              const isSelected = selectedService === service;
              return (
                <button
                  key={service}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Directory Count Summary */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Mostrando <strong>{filteredClients.length}</strong> de <strong>{clients.length}</strong> clientes registrados
        </span>
        {(searchTerm || selectedService !== 'Todos') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedService('Todos');
            }}
            className="text-slate-900 font-semibold hover:underline cursor-pointer"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Building2 className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            No se encontraron clientes
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No existen registros que coincidan con los criterios de búsqueda o filtro aplicados.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setSelectedService('Todos');
            }}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Restablecer búsqueda
          </button>
        </div>
      )}

      {/* Desktop Table View (Hidden on mobile) */}
      {filteredClients.length > 0 && (
        <div className="hidden md:block bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-6 py-3.5">Empresa / Razón Social</th>
                  <th scope="col" className="px-6 py-3.5">Contacto Principal</th>
                  <th scope="col" className="px-6 py-3.5">País / Ubicación</th>
                  <th scope="col" className="px-6 py-3.5">Servicio Asociado</th>
                  <th scope="col" className="px-6 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredClients.map((client) => (
                  <tr 
                    key={client.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* Empresa / Razón Social */}
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {client.company}
                      </div>
                      {client.notes && (
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {client.notes}
                        </div>
                      )}
                    </td>

                    {/* Contacto Principal */}
                    <td className="px-6 py-4">
                      <div className="text-slate-800 font-medium text-sm">
                        {client.contactName}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Mail className="w-3 h-3 text-slate-400 shrink-0" strokeWidth={1.5} />
                        <span>{client.email}</span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" strokeWidth={1.5} />
                        <span>{client.phone}</span>
                      </div>
                    </td>

                    {/* Ubicación */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-slate-700 text-sm">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                        <span>{client.location}</span>
                      </div>
                    </td>

                    {/* Servicio Asociado */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {client.service}
                      </span>
                    </td>

                    {/* Acciones */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(client)}
                          title="Editar información de cliente"
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingClient(client)}
                          title="Eliminar cliente"
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile Cards View (Visible only on mobile) */}
      {filteredClients.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {filteredClients.map((client) => (
            <div 
              key={client.id}
              className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3"
            >
              {/* Header card */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="font-semibold text-slate-900 text-base leading-snug">
                    {client.company}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                    <span>{client.location}</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 shrink-0">
                  {client.service}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                  <span className="font-medium text-slate-900">{client.contactName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                  <span>{client.phone}</span>
                </div>
              </div>

              {client.notes && (
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  "{client.notes}"
                </p>
              )}

              {/* Mobile Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleOpenEdit(client)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Editar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeletingClient(client)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Agregar / Editar Cliente */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingClient(null);
        }}
        onSave={handleSaveClient}
        initialData={editingClient}
      />

      {/* Modal Confirmación de Eliminación */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingClient)}
        title="Eliminar Cliente del Directorio"
        message="¿Está seguro de que desea eliminar este cliente del directorio corporativo? Las operaciones asociadas conservarán el historial."
        itemName={deletingClient ? deletingClient.company : ''}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingClient(null)}
      />
    </div>
  );
}

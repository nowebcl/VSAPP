import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ArrowRight, 
  Calendar, 
  Edit3, 
  Trash2, 
  Package, 
  Building2, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronDown,
  Activity
} from 'lucide-react';
import { OPERATION_STATUSES } from '../../data/initialData';
import OperationStatusBadge from './OperationStatusBadge';
import OperationModal from './OperationModal';
import DeleteConfirmModal from '../clients/DeleteConfirmModal';

export default function OperationsTracker({ 
  operations, 
  clients,
  onAddOperation, 
  onUpdateOperation, 
  onDeleteOperation,
  onQuickUpdateStatus 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOperation, setEditingOperation] = useState(null);
  const [deletingOperation, setDeletingOperation] = useState(null);

  // Filtered operations
  const filteredOperations = useMemo(() => {
    return operations.filter((op) => {
      const matchesSearch = 
        op.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (op.cargoType && op.cargoType.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = 
        statusFilter === 'Todos' || op.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [operations, searchTerm, statusFilter]);

  const handleOpenAdd = () => {
    setEditingOperation(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (op) => {
    setEditingOperation(op);
    setIsModalOpen(true);
  };

  const handleSaveOperation = (opData) => {
    if (editingOperation) {
      onUpdateOperation(opData);
    } else {
      onAddOperation(opData);
    }
    setIsModalOpen(false);
    setEditingOperation(null);
  };

  const handleConfirmDelete = () => {
    if (deletingOperation) {
      onDeleteOperation(deletingOperation.id);
      setDeletingOperation(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header / Action Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Control de Operaciones
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Supervisión logística, envíos internacionales y solicitudes internas de VS International LLC.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white text-sm font-semibold rounded-lg transition-all shadow-xs cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={1.5} />
          <span>Registrar Operación</span>
        </button>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-4 border border-slate-200 rounded-lg">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
            <Search className="w-4 h-4" strokeWidth={1.5} />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por ID, cliente, ruta o tipo de carga..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition-colors placeholder:text-slate-400"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide shrink-0 hidden sm:inline mr-1">
            Estado:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {['Todos', ...OPERATION_STATUSES].map((status) => {
              const isSelected = statusFilter === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Count & Reset */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Mostrando <strong>{filteredOperations.length}</strong> de <strong>{operations.length}</strong> operaciones registradas
        </span>
        {(searchTerm || statusFilter !== 'Todos') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('Todos');
            }}
            className="text-slate-900 font-semibold hover:underline cursor-pointer"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Empty State */}
      {filteredOperations.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-3">
            <Package className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 mb-1">
            No se encontraron operaciones
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            No existen registros operativos que coincidan con la búsqueda o el filtro seleccionado.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('Todos');
            }}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      )}

      {/* Desktop Table View */}
      {filteredOperations.length > 0 && (
        <div className="hidden lg:block bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th scope="col" className="px-5 py-3.5">ID Operación</th>
                  <th scope="col" className="px-5 py-3.5">Cliente</th>
                  <th scope="col" className="px-5 py-3.5">Ruta Comercial (Origen → Destino)</th>
                  <th scope="col" className="px-5 py-3.5">Carga & Detalle</th>
                  <th scope="col" className="px-5 py-3.5">Fecha</th>
                  <th scope="col" className="px-5 py-3.5">Estado Operativo</th>
                  <th scope="col" className="px-5 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOperations.map((op) => (
                  <tr 
                    key={op.id}
                    className="hover:bg-slate-50/60 transition-colors group"
                  >
                    {/* ID */}
                    <td className="px-5 py-4 font-mono font-medium text-xs text-slate-900">
                      {op.id}
                    </td>

                    {/* Cliente */}
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-900 text-sm">
                        {op.clientName}
                      </div>
                    </td>

                    {/* Ruta */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <span className="font-medium text-slate-900">{op.origin}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                        <span className="font-medium text-slate-900">{op.destination}</span>
                      </div>
                    </td>

                    {/* Carga */}
                    <td className="px-5 py-4">
                      <div className="text-xs text-slate-800 font-medium">
                        {op.cargoType}
                      </div>
                      {op.notes && (
                        <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5" title={op.notes}>
                          {op.notes}
                        </div>
                      )}
                    </td>

                    {/* Fecha */}
                    <td className="px-5 py-4 text-xs text-slate-600 whitespace-nowrap">
                      {op.date}
                    </td>

                    {/* Estado con Selector Rápido */}
                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2">
                        <OperationStatusBadge status={op.status} />
                        
                        {/* Quick Status Select Button */}
                        <div className="relative group/select">
                          <select
                            value={op.status}
                            onChange={(e) => onQuickUpdateStatus(op.id, e.target.value)}
                            title="Actualizar estado rápidamente"
                            aria-label={`Actualizar estado para ${op.id}`}
                            className="text-xs bg-white hover:bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-600 focus:outline-none focus:border-slate-900 cursor-pointer"
                          >
                            {OPERATION_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                Cambiar a {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </td>

                    {/* Acciones */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(op)}
                          title="Editar detalles de la operación"
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingOperation(op)}
                          title="Eliminar operación"
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

      {/* Mobile Card View (Hidden on LG screens) */}
      {filteredOperations.length > 0 && (
        <div className="grid grid-cols-1 gap-3 lg:hidden">
          {filteredOperations.map((op) => (
            <div 
              key={op.id}
              className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-3"
            >
              {/* Card top */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="text-xs font-mono font-semibold text-slate-500">
                    {op.id}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm mt-0.5">
                    {op.clientName}
                  </h3>
                </div>
                <OperationStatusBadge status={op.status} />
              </div>

              {/* Route */}
              <div className="p-2.5 bg-slate-50/75 rounded-lg border border-slate-100 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 w-12 shrink-0">Origen:</span>
                  <span className="font-medium text-slate-900">{op.origin}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="text-[10px] uppercase font-bold text-slate-400 w-12 shrink-0">Destino:</span>
                  <span className="font-medium text-slate-900">{op.destination}</span>
                </div>
              </div>

              {/* Cargo & Date */}
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">Carga:</span>
                  <span className="font-medium text-slate-800">{op.cargoType}</span>
                </div>
                <div>
                  <span className="block text-[10px] font-semibold text-slate-400 uppercase">Fecha:</span>
                  <span className="font-medium text-slate-800">{op.date}</span>
                </div>
              </div>

              {op.notes && (
                <p className="text-xs text-slate-500 leading-relaxed italic bg-slate-50 p-2 rounded border border-slate-100">
                  "{op.notes}"
                </p>
              )}

              {/* Quick Status and Actions */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor={`quick-status-${op.id}`} className="text-[11px] text-slate-500 shrink-0">Actualizar Estado:</label>
                  <select
                    id={`quick-status-${op.id}`}
                    value={op.status}
                    onChange={(e) => onQuickUpdateStatus(op.id, e.target.value)}
                    className="text-xs bg-white border border-slate-200 rounded px-2 py-1 text-slate-700 focus:outline-none focus:border-slate-900 cursor-pointer flex-1"
                  >
                    {OPERATION_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(op)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Editar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeletingOperation(op)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-md border border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>Eliminar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Registrar / Editar Operación */}
      <OperationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingOperation(null);
        }}
        onSave={handleSaveOperation}
        clients={clients}
        initialData={editingOperation}
      />

      {/* Modal Confirmar Eliminación */}
      <DeleteConfirmModal
        isOpen={Boolean(deletingOperation)}
        title="Eliminar Operación Logística"
        message="¿Está seguro de que desea eliminar este registro operativo? Esta acción suprimirá el seguimiento del envío seleccionado."
        itemName={deletingOperation ? `${deletingOperation.id} — ${deletingOperation.clientName}` : ''}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingOperation(null)}
      />
    </div>
  );
}

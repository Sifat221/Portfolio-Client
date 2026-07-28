import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminSectionTableProps {
  title: string;
  data: any[];
  columns: Column[];
  onAdd: () => void;
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
  idKey?: string;
}

export const AdminSectionTable: React.FC<AdminSectionTableProps> = ({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  isLoading,
  idKey = 'id',
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-white">{title}</h3>
        <button
          onClick={onAdd}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#9B8FCD] to-indigo-600 shadow-lg shadow-[#9B8FCD]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        >
          <Plus className="w-3.5 h-3.5" />
          Add New
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#9B8FCD] border-t-transparent animate-spin" />
          <p className="text-xs text-slate-400 font-mono mt-3">Loading data...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-12 glass-panel rounded-2xl border border-slate-800">
          <p className="text-sm text-slate-400 font-mono">No entries found. Click "Add New" to create one.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800 glass-panel">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 text-left text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={item[idKey] || item._id || idx}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-slate-300 max-w-[200px] truncate">
                      {col.render ? col.render(item[col.key], item) : (
                        Array.isArray(item[col.key])
                          ? item[col.key].join(', ')
                          : String(item[col.key] || '—')
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-[#9B8FCD] hover:bg-[#9B8FCD]/10 border border-slate-700 transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteId(item[idKey] || item._id || idx.toString())}
                        className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-700 transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative glass-panel rounded-2xl border border-slate-700/60 shadow-2xl p-6 max-w-sm w-full z-10 space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Confirm Delete</h3>
                  <p className="text-xs text-slate-400 mt-1">This action cannot be undone. The entry will be permanently removed.</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

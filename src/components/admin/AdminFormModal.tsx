import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { FileUploader } from './FileUploader';
import { uploadFile } from '../../services/api';

interface AdminFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Record<string, any>) => void;
  title: string;
  fields: { key: string; label: string; type: 'text' | 'textarea' | 'select' | 'array' | 'image'; options?: string[]; required?: boolean }[];
  initialData?: Record<string, any>;
}

export const AdminFormModal: React.FC<AdminFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      const empty: Record<string, any> = {};
      fields.forEach((f) => {
        empty[f.key] = f.type === 'array' ? [] : '';
      });
      setFormData(empty);
    }
  }, [initialData, fields, isOpen]);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleArrayChange = (key: string, value: string) => {
    const items = value.split(',').map((s: string) => s.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, [key]: items }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl border border-slate-700/60 shadow-2xl p-6 z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-extrabold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field.key} className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  {field.label} {field.required && <span className="text-rose-400">*</span>}
                </label>

                {field.type === 'image' ? (
                  <div className="space-y-2">
                    <FileUploader
                      accept="image/png,image/jpeg,image/webp"
                      label={field.label}
                      currentUrl={formData[field.key]}
                      onFileSelect={async (file) => {
                        const result = await uploadFile(file, 'photo');
                        handleChange(field.key, result.url);
                      }}
                      previewType="image"
                      shape="rectangle"
                    />
                    <input
                      type="text"
                      value={formData[field.key] || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-xs placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
                      placeholder="Or paste image URL (e.g. https://...)"
                    />
                  </div>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={4}
                    required={field.required}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all resize-none"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'array' ? (
                  <input
                    type="text"
                    value={Array.isArray(formData[field.key]) ? formData[field.key].join(', ') : formData[field.key] || ''}
                    onChange={(e) => handleArrayChange(field.key, e.target.value)}
                    required={field.required}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
                    placeholder="Comma separated values"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    required={field.required}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                )}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-300 bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#9B8FCD] to-indigo-600 shadow-lg shadow-[#9B8FCD]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

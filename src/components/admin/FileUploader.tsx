import React, { useCallback, useState } from 'react';
import { Upload, X, FileImage, FileText, CheckCircle } from 'lucide-react';

interface FileUploaderProps {
  accept: string;
  label: string;
  currentUrl?: string;
  onFileSelect: (file: File) => void;
  previewType?: 'image' | 'pdf';
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  label,
  currentUrl,
  onFileSelect,
  previewType = 'image',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setFileName(file.name);
      if (previewType === 'image') {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
      onFileSelect(file);
    },
    [onFileSelect, previewType]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setPreview(null);
    setFileName(null);
  };

  return (
    <div className="space-y-3">
      <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>

      {/* Current Image Preview */}
      {previewType === 'image' && (preview || currentUrl) && (
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#9B8FCD]/60 shadow-xl group">
          <img
            src={preview || currentUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {preview && (
            <button
              onClick={clearFile}
              className="absolute top-1 right-1 p-1 bg-rose-500/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-[#9B8FCD] bg-[#9B8FCD]/10 scale-[1.02]'
            : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
        }`}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {fileName ? (
          <div className="flex items-center justify-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div className="text-left">
              <p className="text-sm font-bold text-white">{fileName}</p>
              <p className="text-[11px] text-emerald-400 font-mono">File selected successfully</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center">
              {previewType === 'image' ? (
                <FileImage className="w-5 h-5 text-[#9B8FCD]" />
              ) : (
                <FileText className="w-5 h-5 text-cyan-400" />
              )}
            </div>
            <p className="text-sm text-slate-300 font-bold">
              <span className="text-[#9B8FCD]">Click to upload</span> or drag and drop
            </p>
            <p className="text-[11px] text-slate-500 font-mono">{accept.toUpperCase()} files</p>
          </div>
        )}
      </div>
    </div>
  );
};

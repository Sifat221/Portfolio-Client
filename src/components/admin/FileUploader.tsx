import React, { useCallback, useState } from 'react';
import { X, FileImage, FileText, CheckCircle, Camera, User } from 'lucide-react';

interface FileUploaderProps {
  accept: string;
  label: string;
  currentUrl?: string;
  onFileSelect: (file: File) => void;
  previewType?: 'image' | 'pdf';
  shape?: 'circle' | 'rectangle';
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  label,
  currentUrl,
  onFileSelect,
  previewType = 'image',
  shape = 'rectangle',
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

  const displayImage = preview || currentUrl;

  // ── Circle shape (WhatsApp / Telegram profile photo style) ──────────────
  if (shape === 'circle' && previewType === 'image') {
    return (
      <div className="space-y-3">
        <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </label>

        <div className="flex flex-col items-center gap-4">
          {/* Circular avatar preview with animated ring */}
          <div className="relative group cursor-pointer">
            {/* Spinning gradient ring */}
            <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-[#9B8FCD] via-indigo-500 to-cyan-400 animate-spin-slow opacity-80" />

            {/* Avatar circle */}
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-[#090D16] shadow-2xl bg-gradient-to-tr from-[#9B8FCD] via-indigo-600 to-cyan-500 flex items-center justify-center">
              {displayImage ? (
                <img
                  src={displayImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white/70" />
              )}
            </div>

            {/* Camera overlay on hover */}
            <label className="absolute inset-0 rounded-full flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <input
                type="file"
                accept={accept}
                onChange={handleInputChange}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-1">
                <Camera className="w-6 h-6 text-white" />
                <span className="text-[10px] text-white font-bold font-mono">Change</span>
              </div>
            </label>

            {/* Clear button if custom preview */}
            {preview && (
              <button
                onClick={clearFile}
                className="absolute -top-1 -right-1 p-1 bg-rose-500/90 rounded-full border-2 border-[#090D16] shadow-lg hover:bg-rose-600 transition-colors z-10"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            )}
          </div>

          {/* Drop zone below avatar */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative w-full border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? 'border-[#9B8FCD] bg-[#9B8FCD]/10 scale-[1.02]'
                : 'border-slate-700 bg-slate-900/50 hover:border-[#9B8FCD]/60'
            }`}
          >
            <input
              type="file"
              accept={accept}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {fileName ? (
              <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <p className="text-xs font-bold text-emerald-400 font-mono truncate max-w-[180px]">{fileName}</p>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-mono">
                <span className="text-[#9B8FCD] font-bold">Click to upload</span> or drag & drop photo
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Default rectangle shape ──────────────────────────────────────────────
  return (
    <div className="space-y-3">
      <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
        {label}
      </label>

      {/* Current Image Preview */}
      {previewType === 'image' && displayImage && (
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-[#9B8FCD]/60 shadow-xl group">
          <img
            src={displayImage}
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

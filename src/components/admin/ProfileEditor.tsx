import React, { useState } from 'react';
import { Save, User, Mail, Phone, MapPin, Briefcase, Globe, FileText } from 'lucide-react';
import { IPersonalProfile } from '../../types/portfolio';
import { FileUploader } from './FileUploader';
import { uploadFile, updatePersonalProfile } from '../../services/api';

interface ProfileEditorProps {
  personal: IPersonalProfile;
  onSave: (data: IPersonalProfile) => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ personal, onSave }) => {
  const [form, setForm] = useState<IPersonalProfile>({ ...personal });
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const handleChange = (key: keyof IPersonalProfile, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, 'photo');
      setForm((prev) => ({ ...prev, profilePhoto: result.url }));
      showToast('success', 'Photo uploaded successfully!');
    } catch {
      showToast('error', 'Photo upload failed.');
    }
  };

  const handleResumeUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, 'resume');
      setForm((prev) => ({ ...prev, resumeUrl: result.url }));
      showToast('success', 'CV uploaded successfully!');
    } catch {
      showToast('error', 'CV upload failed.');
    }
  };

  const showToast = (type: 'success' | 'error', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updatePersonalProfile(form);
      onSave(form);
      showToast('success', 'Profile updated successfully!');
    } catch {
      showToast('error', 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const textField = (
    key: keyof IPersonalProfile,
    label: string,
    icon: React.ReactNode,
    placeholder: string
  ) => (
    <div className="space-y-1.5">
      <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
        {icon} {label}
      </label>
      <input
        type="text"
        value={(form[key] as string) || ''}
        onChange={(e) => handleChange(key, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`px-4 py-2.5 rounded-xl text-sm font-bold ${
          toast.type === 'success'
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Photo & CV Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploader
          accept="image/png,image/jpeg,image/webp"
          label="Profile Photo"
          currentUrl={form.profilePhoto || '/Profile.JPG'}
          onFileSelect={handlePhotoUpload}
          previewType="image"
        />
        <FileUploader
          accept=".pdf"
          label="CV / Resume (PDF)"
          onFileSelect={handleResumeUpload}
          previewType="pdf"
        />
      </div>

      {/* Profile Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {textField('name', 'Full Name', <User className="w-3 h-3" />, 'Your full name')}
        {textField('title', 'Job Title', <Briefcase className="w-3 h-3" />, 'e.g. Flutter Developer')}
        {textField('email', 'Email', <Mail className="w-3 h-3" />, 'your@email.com')}
        {textField('phone', 'Phone', <Phone className="w-3 h-3" />, '+880...')}
        {textField('location', 'Location', <MapPin className="w-3 h-3" />, 'City, Country')}
        {textField('availability', 'Availability', <FileText className="w-3 h-3" />, 'Available for...')}
        {textField('github', 'GitHub URL', <Globe className="w-3 h-3" />, 'https://github.com/...')}
        {textField('portfolio', 'Portfolio URL', <Globe className="w-3 h-3" />, 'https://...')}
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Bio / About</label>
        <textarea
          value={form.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          rows={4}
          placeholder="A short professional bio..."
          className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all resize-none"
        />
      </div>

      {/* Resume URL */}
      {textField('resumeUrl', 'Resume URL (or uploaded path)', <FileText className="w-3 h-3" />, '/assets/resume/...')}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#9B8FCD] to-indigo-600 shadow-lg shadow-[#9B8FCD]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Profile
            </>
          )}
        </button>
      </div>
    </form>
  );
};

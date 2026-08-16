import React, { useState, useEffect } from 'react';
import { Save, User, Mail, Phone, MapPin, Briefcase, Globe, FileText, Sparkles, Send } from 'lucide-react';
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

  useEffect(() => {
    setForm({ ...personal });
  }, [personal]);

  const handleChange = (key: keyof IPersonalProfile, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, 'photo');
      const updatedForm = { ...form, profilePhoto: result.url };
      setForm(updatedForm);
      await updatePersonalProfile(updatedForm);
      onSave(updatedForm);
      showToast('success', 'Profile avatar photo updated live!');
    } catch {
      showToast('error', 'Photo upload failed.');
    }
  };

  const handleBannerUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, 'photo');
      const updatedForm = { ...form, bannerPhoto: result.url };
      setForm(updatedForm);
      await updatePersonalProfile(updatedForm);
      onSave(updatedForm);
      showToast('success', 'Banner hero photo updated live!');
    } catch {
      showToast('error', 'Banner upload failed.');
    }
  };

  const handleResumeUpload = async (file: File) => {
    try {
      const result = await uploadFile(file, 'resume');
      const updatedForm = { ...form, resumeUrl: result.url };
      setForm(updatedForm);
      await updatePersonalProfile(updatedForm);
      onSave(updatedForm);
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

      {/* Upload Section */}
      {/* Row 1: Profile Avatar (circular) + Banner Photo (rectangular) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploader
          accept="image/png,image/jpeg,image/webp"
          label="Profile Avatar (Navbar / Avatar)"
          currentUrl={form.profilePhoto}
          onFileSelect={handlePhotoUpload}
          previewType="image"
          shape="circle"
        />
        <FileUploader
          accept="image/png,image/jpeg,image/webp"
          label="Banner / Hero Photo (Rectangular)"
          currentUrl={form.bannerPhoto || '/banner3.webp'}
          onFileSelect={handleBannerUpload}
          previewType="image"
          shape="rectangle"
        />
      </div>

      {/* Row 2: CV Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploader
          accept=".pdf"
          label="CV / Resume (PDF)"
          onFileSelect={handleResumeUpload}
          previewType="pdf"
        />
      </div>

      {/* ================= DEDICATED HERO STATUS BADGE CONTROL ================= */}
      <div className="p-5 bg-slate-900/90 border-2 border-[#9B8FCD]/50 rounded-2xl shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#9B8FCD]/20 text-[#9B8FCD]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white tracking-wide flex items-center gap-2">
                Hero Status Badge Control
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#9B8FCD]/20 text-[#9B8FCD] border border-[#9B8FCD]/40">
                  Homepage Badge
                </span>
              </h4>
              <p className="text-xs text-slate-400 font-mono">
                Update badge text or toggle visibility (Remove/Show on Hero section)
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <span className="text-xs font-mono font-bold text-slate-300">
              {form.showBadge !== false ? 'Badge Visible' : 'Badge Hidden'}
            </span>
            <div className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.showBadge !== false}
                onChange={(e) => setForm((prev) => ({ ...prev, showBadge: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#9B8FCD]" />
            </div>
          </label>
        </div>

        {/* Inputs & Live Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#9B8FCD]" /> Badge Text
            </label>
            <input
              type="text"
              value={form.badgeText !== undefined ? form.badgeText : (form.title || 'Flutter & AI Engineering Specialist')}
              onChange={(e) => setForm((prev) => ({ ...prev, badgeText: e.target.value }))}
              placeholder="e.g. Flutter & AI Engineering Specialist"
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm placeholder-slate-500 focus:border-[#9B8FCD] focus:ring-1 focus:ring-[#9B8FCD] outline-none transition-all"
            />
          </div>

          {/* Live Preview Box */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1.5">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
              Live Badge Preview on Homepage
            </span>
            {form.showBadge !== false && (form.badgeText || form.title || '').trim() ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#9B8FCD] animate-pulse" />
                <span>{form.badgeText || form.title || "Flutter & AI Engineering Specialist"}</span>
              </div>
            ) : (
              <div className="text-xs font-mono text-rose-400 font-bold flex items-center gap-1.5 py-1">
                ⚠️ Status badge is hidden / removed from Hero section.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {textField('name', 'Full Name', <User className="w-3 h-3" />, 'Your full name')}
        {textField('title', 'Job Title / Subtitle', <Briefcase className="w-3 h-3" />, 'e.g. Flutter & AI Engineering Specialist')}
        {textField('email', 'Email', <Mail className="w-3 h-3" />, 'your@email.com')}
        {textField('phone', 'Phone', <Phone className="w-3 h-3" />, '+880...')}
        {textField('location', 'Location', <MapPin className="w-3 h-3" />, 'City, Country')}
        {textField('availability', 'Availability Status', <FileText className="w-3 h-3" />, 'Available for...')}
        {textField('github', 'GitHub Profile URL', <Globe className="w-3 h-3" />, 'https://github.com/...')}
        {textField('linkedin', 'LinkedIn Profile URL', <Globe className="w-3 h-3" />, 'https://linkedin.com/in/...')}
        {textField('facebook', 'Facebook Profile URL', <Globe className="w-3 h-3" />, 'https://facebook.com/...')}
        {textField('whatsapp', 'WhatsApp Phone / Link', <Phone className="w-3 h-3" />, '+880...')}
        {textField('telegram', 'Telegram Username / Link', <Send className="w-3 h-3" />, 'https://t.me/...')}
        {textField('behance', 'Behance Profile URL', <Globe className="w-3 h-3" />, 'https://behance.net/...')}
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

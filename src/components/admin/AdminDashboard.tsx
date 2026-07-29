import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  FolderPlus,
  Wrench,
  Briefcase,
  GraduationCap,
  Award,
  User,
  LogOut,
  X,
  Plus,
  Edit2,
  Trash2,
  Check,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { IPersonalProfile, IProject, ISkill, IExperience, IEducation, ICertification, IAchievement, IGalleryPhoto } from '../../types/portfolio';
import { ProfileEditor } from './ProfileEditor';
import { AdminFormModal } from './AdminFormModal';
import {
  createProject, updateProject, deleteProject,
  createSkill, updateSkill, deleteSkill,
  createExperience, updateExperience, deleteExperience,
  createEducation, updateEducation, deleteEducation,
  createCertification, updateCertification, deleteCertification,
  createAchievement, updateAchievement, deleteAchievement,
  createGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto,
} from '../../services/api';
import { Image as ImageIcon } from 'lucide-react';

interface AdminDashboardProps {
  personal: IPersonalProfile;
  projects: IProject[];
  skills: ISkill[];
  experience: IExperience[];
  education: IEducation[];
  certifications: ICertification[];
  achievements: IAchievement[];
  galleryPhotos?: IGalleryPhoto[];
  onClose: () => void;
  onLogout: () => void;
  onRefreshData?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  personal,
  projects,
  skills,
  experience,
  education,
  certifications,
  achievements,
  galleryPhotos = [],
  onClose,
  onLogout,
  onRefreshData,
}) => {
  const [activeTab, setActiveTab] = useState<
    'profile' | 'projects' | 'skills' | 'experience' | 'education' | 'certifications' | 'achievements' | 'gallery'
  >('profile');

  // Modal State for Add/Edit
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    section: 'projects' | 'skills' | 'experience' | 'education' | 'certifications' | 'achievements' | 'gallery';
    item?: any;
  }>({
    isOpen: false,
    section: 'projects',
  });

  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = (section: any) => {
    setModalState({ isOpen: true, section, item: undefined });
  };

  const handleOpenEdit = (section: any, item: any) => {
    setModalState({ isOpen: true, section, item });
  };

  const handleDelete = async (section: string, id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      if (section === 'projects') await deleteProject(id);
      else if (section === 'skills') await deleteSkill(id);
      else if (section === 'experience') await deleteExperience(id);
      else if (section === 'education') await deleteEducation(id);
      else if (section === 'certifications') await deleteCertification(id);
      else if (section === 'achievements') await deleteAchievement(id);
      else if (section === 'gallery') await deleteGalleryPhoto(id);

      showToast('Item deleted successfully!');
      onRefreshData?.();
    } catch {
      showToast('Failed to delete item.');
    }
  };

  const handleSaveModalItem = async (data: any) => {
    try {
      const section = modalState.section;
      const isEdit = !!modalState.item?.id;

      if (section === 'projects') {
        if (isEdit) await updateProject(modalState.item.id, data);
        else await createProject(data);
      } else if (section === 'skills') {
        if (isEdit) await updateSkill(modalState.item.id, data);
        else await createSkill(data);
      } else if (section === 'experience') {
        if (isEdit) await updateExperience(modalState.item.id, data);
        else await createExperience(data);
      } else if (section === 'education') {
        if (isEdit) await updateEducation(modalState.item.id, data);
        else await createEducation(data);
      } else if (section === 'certifications') {
        if (isEdit) await updateCertification(modalState.item.id, data);
        else await createCertification(data);
      } else if (section === 'achievements') {
        if (isEdit) await updateAchievement(modalState.item.id, data);
        else await createAchievement(data);
      } else if (section === 'gallery') {
        if (isEdit) await updateGalleryPhoto(modalState.item.id, data);
        else await createGalleryPhoto(data);
      }

      showToast(`Item ${isEdit ? 'updated' : 'created'} successfully!`);
      setModalState({ ...modalState, isOpen: false });
      onRefreshData?.();
    } catch {
      showToast('Failed to save item.');
    }
  };

  const getSectionModalConfig = (section: string) => {
    switch (section) {
      case 'projects':
        return {
          title: modalState.item ? 'Edit Project' : 'Add New Project',
          fields: [
            { key: 'title', label: 'Title', type: 'text' as const, required: true },
            { key: 'tagline', label: 'Tagline', type: 'text' as const },
            { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
            { key: 'techStack', label: 'Tech Stack (comma separated)', type: 'array' as const, required: true },
            { key: 'features', label: 'Key Features (comma separated)', type: 'array' as const },
            { key: 'githubUrl', label: 'GitHub Repository URL', type: 'text' as const },
            { key: 'demoUrl', label: 'Live Demo URL', type: 'text' as const },
            { key: 'imageUrl', label: 'Image URL', type: 'text' as const },
            { key: 'category', label: 'Category', type: 'text' as const },
          ],
        };
      case 'skills':
        return {
          title: modalState.item ? 'Edit Skill' : 'Add New Skill',
          fields: [
            { key: 'name', label: 'Skill Name', type: 'text' as const, required: true },
            {
              key: 'category',
              label: 'Category',
              type: 'select' as const,
              options: [
                'Languages',
                'Flutter Framework',
                'State Management',
                'Backend & Cloud',
                'Databases',
                'Tools & DevOps',
                'Soft Skills',
              ],
              required: true,
            },
            {
              key: 'proficiency',
              label: 'Proficiency Level',
              type: 'select' as const,
              options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
            },
          ],
        };
      case 'experience':
        return {
          title: modalState.item ? 'Edit Experience' : 'Add New Experience',
          fields: [
            { key: 'role', label: 'Job Role', type: 'text' as const, required: true },
            { key: 'company', label: 'Company Name', type: 'text' as const, required: true },
            { key: 'startDate', label: 'Start Date / Year', type: 'text' as const, required: true },
            { key: 'endDate', label: 'End Date / Present', type: 'text' as const },
            { key: 'responsibilities', label: 'Responsibilities (comma separated)', type: 'array' as const, required: true },
            { key: 'technologies', label: 'Technologies (comma separated)', type: 'array' as const },
            { key: 'impact', label: 'Key Impact', type: 'text' as const },
          ],
        };
      case 'education':
        return {
          title: modalState.item ? 'Edit Education' : 'Add New Education',
          fields: [
            { key: 'degree', label: 'Degree Name', type: 'text' as const, required: true },
            { key: 'institution', label: 'Institution Name', type: 'text' as const, required: true },
            { key: 'timeline', label: 'Timeline', type: 'text' as const, required: true },
            { key: 'relevantCourses', label: 'Relevant Courses (comma separated)', type: 'array' as const },
          ],
        };
      case 'certifications':
        return {
          title: modalState.item ? 'Edit Certification' : 'Add New Certification',
          fields: [
            { key: 'title', label: 'Certification Title', type: 'text' as const, required: true },
            { key: 'issuer', label: 'Issuing Organization', type: 'text' as const, required: true },
            { key: 'issueDate', label: 'Issue Date / Year', type: 'text' as const },
            { key: 'credentialUrl', label: 'Credential Link', type: 'text' as const },
          ],
        };
      case 'gallery':
        return {
          title: modalState.item ? 'Edit Gallery Photo' : 'Add New Gallery Photo',
          fields: [
            { key: 'title', label: 'Photo Title / Milestone Name', type: 'text' as const, required: true },
            { key: 'caption', label: 'Caption / Description', type: 'textarea' as const },
            { key: 'url', label: 'Upload Photo or Paste URL', type: 'image' as const, required: true },
          ],
        };
      case 'achievements':
      default:
        return {
          title: modalState.item ? 'Edit Achievement' : 'Add New Achievement',
          fields: [
            { key: 'title', label: 'Achievement Title', type: 'text' as const, required: true },
            { key: 'category', label: 'Category', type: 'text' as const },
            { key: 'description', label: 'Description', type: 'textarea' as const, required: true },
            { key: 'year', label: 'Year', type: 'text' as const },
          ],
        };
    }
  };

  const currentModalConfig = getSectionModalConfig(modalState.section);

  return (
    <div className="fixed inset-0 z-50 bg-[#060912]/90 backdrop-blur-md overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl bg-[#090D16] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Top Admin Header Bar */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9B8FCD] via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                Admin Control Center
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  Authenticated
                </span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Manage Profile, Projects, Skills & Content CRUD
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {toast && (
          <div className="bg-emerald-500 text-white text-xs font-bold font-mono py-2 px-4 text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            {toast}
          </div>
        )}

        {/* Dashboard Main Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Sidebar Navigation */}
          <div className="w-full md:w-64 bg-slate-900/60 border-r border-slate-800 p-4 space-y-2 shrink-0 overflow-y-auto">
            {[
              { id: 'profile', label: 'Profile & Photos', icon: <User className="w-4 h-4" /> },
              { id: 'gallery', label: 'Memorable Gallery', icon: <ImageIcon className="w-4 h-4" />, count: galleryPhotos.length },
              { id: 'projects', label: 'Projects', icon: <FolderPlus className="w-4 h-4" />, count: projects.length },
              { id: 'skills', label: 'Skills', icon: <Wrench className="w-4 h-4" />, count: skills.length },
              { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" />, count: experience.length },
              { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, count: education.length },
              { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" />, count: certifications.length },
              { id: 'achievements', label: 'Achievements', icon: <Sparkles className="w-4 h-4" />, count: achievements.length },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#9B8FCD]/30 to-indigo-600/30 text-white border border-[#9B8FCD]/50 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#9B8FCD]' : 'text-slate-500'}>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Tab Content View */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#090D16]">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
                  <User className="w-4 h-4 text-[#9B8FCD]" /> Edit Personal Profile, Avatar & Resume
                </h3>
                <ProfileEditor
                  personal={personal}
                  onSave={(updated) => {
                    showToast('Profile updated!');
                    onRefreshData?.();
                  }}
                />
              </div>
            )}

            {activeTab !== 'profile' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white font-mono capitalize">
                    Manage {activeTab === 'gallery' ? 'Memorable Photos Gallery' : activeTab}
                  </h3>
                  <button
                    onClick={() => handleOpenAdd(activeTab)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#9B8FCD] to-indigo-600 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New {activeTab === 'gallery' ? 'Photo' : activeTab.slice(0, -1)}</span>
                  </button>
                </div>

                {/* Section Table View */}
                <div className="space-y-3">
                  {(activeTab === 'gallery' ? galleryPhotos :
                    activeTab === 'projects' ? projects :
                    activeTab === 'skills' ? skills :
                    activeTab === 'experience' ? experience :
                    activeTab === 'education' ? education :
                    activeTab === 'certifications' ? certifications :
                    achievements
                  ).map((item: any, i: number) => (
                    <div
                      key={item.id || i}
                      className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                    >
                      <div className="space-y-1 truncate">
                        <h4 className="font-bold text-white text-sm truncate">
                          {item.title || item.name || item.role || item.degree}
                        </h4>
                        <p className="text-xs text-slate-400 font-mono truncate">
                          {item.description || item.company || item.institution || item.category || item.issuer}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleOpenEdit(activeTab, item)}
                          className="p-2 rounded-xl text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(activeTab, item.id || String(i))}
                          className="p-2 rounded-xl text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Add / Edit Form Modal */}
      {modalState.isOpen && (
        <AdminFormModal
          isOpen={modalState.isOpen}
          title={currentModalConfig.title}
          fields={currentModalConfig.fields}
          initialData={modalState.item}
          onClose={() => setModalState({ ...modalState, isOpen: false })}
          onSave={handleSaveModalItem}
        />
      )}
    </div>
  );
};

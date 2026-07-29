import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';
import {
  usePersonalProfile,
  useProjects,
  useSkills,
  useExperience,
  useEducation,
  useCertifications,
  useAchievements,
} from '../../hooks/usePortfolio';
import {
  defaultPersonal,
  defaultProjects,
  defaultSkills,
  defaultExperience,
  defaultEducation,
  defaultCertifications,
  defaultAchievements,
} from '../../services/api';
import { ArrowLeft } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isAdminAuth, setIsAdminAuth] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const { data: personal = defaultPersonal } = usePersonalProfile();
  const { data: projects = defaultProjects } = useProjects();
  const { data: skills = defaultSkills } = useSkills();
  const { data: experience = defaultExperience } = useExperience();
  const { data: education = defaultEducation } = useEducation();
  const { data: certifications = defaultCertifications } = useCertifications();
  const { data: achievements = defaultAchievements } = useAchievements();

  const handleRefreshData = () => {
    queryClient.invalidateQueries();
  };

  const handleLoginSuccess = () => {
    sessionStorage.setItem('admin_auth', 'true');
    setIsAdminAuth(true);
  };

  const handleLogout = () => {
    sessionStorage.setItem('admin_auth', 'false');
    setIsAdminAuth(false);
  };

  if (!isAdminAuth) {
    return (
      <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center relative p-4">
        {/* Back to Home Link */}
        <Link
          to="/"
          className="absolute top-6 left-6 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-300 bg-slate-900 border border-slate-800 hover:text-white hover:border-[#9B8FCD] transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4 text-[#9B8FCD]" />
          <span>Back to Portfolio</span>
        </Link>

        <AdminLogin onLogin={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-white">
      <AdminDashboard
        personal={personal}
        projects={projects}
        skills={skills}
        experience={experience}
        education={education}
        certifications={certifications}
        achievements={achievements}
        onClose={() => navigate('/')}
        onLogout={handleLogout}
        onRefreshData={handleRefreshData}
      />
    </div>
  );
};

export default AdminPage;

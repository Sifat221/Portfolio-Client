import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Skills } from './Skills';
import { Projects } from './Projects';
import { ExperienceTimeline } from './ExperienceTimeline';
import { EducationCertifications } from './EducationCertifications';
import { Achievements } from './Achievements';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import SplashCursor from './SplashCursor';
import { LoadingScreen } from './common/LoadingScreen';
import { SEOHead } from './common/SEOHead';
import { useGlobalSound } from '../hooks/useGlobalSound';
import { useJsonLdSchema } from '../hooks/useJsonLdSchema';

import {
  usePersonalProfile,
  useProjects,
  useSkills,
  useExperience,
  useEducation,
  useCertifications,
  useAchievements,
  useTestimonials,
  useGalleryPhotos,
} from '../hooks/usePortfolio';

import {
  defaultPersonal,
  defaultProjects,
  defaultSkills,
  defaultExperience,
  defaultEducation,
  defaultCertifications,
  defaultAchievements,
  defaultTestimonials,
  defaultGalleryPhotos,
} from '../services/api';

export const PortfolioContent: React.FC = () => {
  const { data: personal = defaultPersonal, isLoading: isPersonalLoading } = usePersonalProfile();
  const { data: projects = defaultProjects, isLoading: isProjectsLoading } = useProjects();
  const { data: skills = defaultSkills } = useSkills();
  const { data: experience = defaultExperience } = useExperience();
  const { data: education = defaultEducation } = useEducation();
  const { data: certifications = defaultCertifications } = useCertifications();
  const { data: achievements = defaultAchievements } = useAchievements();
  const { data: testimonials = defaultTestimonials } = useTestimonials();
  const { data: galleryPhotos = defaultGalleryPhotos } = useGalleryPhotos();

  // Attach side effects
  useGlobalSound();
  useJsonLdSchema(personal);

  if (isPersonalLoading || isProjectsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 selection:bg-[#9B8FCD] selection:text-white transition-colors duration-300">
      <SEOHead personal={personal} />

      {/* Interactive WebGL Splash Cursor Backdrop */}
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#A855F7"
      />

      {/* Navigation Bar */}
      <Navbar personal={personal} />

      {/* Main Content Sections */}
      <main role="main">
        <Hero personal={personal} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <ExperienceTimeline experience={experience} />
        <EducationCertifications education={education} certifications={certifications} galleryPhotos={galleryPhotos} />
        <Achievements testimonials={testimonials} achievements={achievements} />
        <ContactSection personal={personal} />
      </main>

      {/* Footer */}
      <Footer personal={personal} />
    </div>
  );
};

export default PortfolioContent;

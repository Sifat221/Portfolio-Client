import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationCertifications } from './components/EducationCertifications';
import { Achievements } from './components/Achievements';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import NotFound from './components/NotFound';
import { playButtonClickSound } from './utils/sound';

import {
  usePersonalProfile,
  useProjects,
  useSkills,
  useExperience,
  useEducation,
  useCertifications,
  useAchievements,
  useTestimonials,
} from './hooks/usePortfolio';

import {
  defaultPersonal,
  defaultProjects,
  defaultSkills,
  defaultExperience,
  defaultEducation,
  defaultCertifications,
  defaultAchievements,
  defaultTestimonials,
} from './services/api';

import { Loader2, User } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const PortfolioContent: React.FC = () => {
  const { data: personal = defaultPersonal, isLoading: isPersonalLoading } = usePersonalProfile();
  const { data: projects = defaultProjects, isLoading: isProjectsLoading } = useProjects();
  const { data: skills = defaultSkills } = useSkills();
  const { data: experience = defaultExperience } = useExperience();
  const { data: education = defaultEducation } = useEducation();
  const { data: certifications = defaultCertifications } = useCertifications();
  const { data: achievements = defaultAchievements } = useAchievements();
  const { data: testimonials = defaultTestimonials } = useTestimonials();

  // Global button click sound effect listener (excluding Navbar)
  useEffect(() => {
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Exclude clicks inside Navbar / Header
      if (
        target.closest('header') ||
        target.closest('nav') ||
        target.closest('[role="banner"]') ||
        target.closest('.navbar-container')
      ) {
        return;
      }

      // Play click sound for any button, link, tab, or interactive element
      const clickable = target.closest(
        'button, a, [role="button"], input[type="submit"], input[type="button"], [tabindex="0"]'
      );
      if (clickable) {
        playButtonClickSound();
      }
    };

    window.addEventListener('click', handleGlobalClick, true);
    return () => window.removeEventListener('click', handleGlobalClick, true);
  }, []);

  // JSON-LD Structured Data Injection for SEO
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": personal.name,
      "jobTitle": personal.title,
      "email": personal.email,
      "telephone": personal.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": personal.location
      },
      "sameAs": [
        personal.github,
        personal.portfolio
      ],
      "knowsAbout": ["Flutter", "Dart", "BLoC Architecture", "REST API", "Firebase", "Mobile Engineering"]
    };

    let scriptTag = document.getElementById("json-ld-schema");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);
  }, [personal]);

  if (isPersonalLoading || isProjectsLoading) {
    return (
      <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center text-white space-y-6 px-4">
        <div className="text-center space-y-2 max-w-sm">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#9B8FCD] via-indigo-600 to-cyan-500 border-2 border-[#9B8FCD]/60 shadow-xl flex items-center justify-center text-white mx-auto">
            <User className="w-8 h-8 text-white" />
          </div>
          <span className="text-3xl font-extrabold tracking-tight">
            Sifat Khan<span className="text-[#9B8FCD]">.</span>
          </span>
          <p className="text-sm font-mono text-[#9B8FCD] flex items-center justify-center gap-2 pt-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 selection:bg-[#9B8FCD] selection:text-white transition-colors duration-300">
      {/* Dynamic SEO Helmet Metadata */}
      <Helmet>
        <title>{personal.name} | {personal.title}</title>
        <meta name="description" content={personal.bio} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* OpenGraph Metadata */}
        <meta property="og:title" content={`${personal.name} | ${personal.title}`} />
        <meta property="og:description" content={personal.bio} />
        <meta property="og:image" content="/favicon.svg" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${personal.name} | ${personal.title}`} />
        <meta name="twitter:description" content={personal.bio} />
        <meta name="twitter:image" content="/favicon.svg" />
      </Helmet>

      {/* Navigation Bar */}
      <Navbar personal={personal} />

      {/* Main Content Sections */}
      <main role="main">
        <Hero personal={personal} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <ExperienceTimeline experience={experience} />
        <EducationCertifications education={education} certifications={certifications} />
        <Achievements testimonials={testimonials} achievements={achievements} />
        <ContactSection personal={personal} />
      </main>

      {/* Footer */}
      <Footer personal={personal} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PortfolioContent />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;

import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { EducationCertifications } from './components/EducationCertifications';
import { Achievements } from './components/Achievements';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

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

import { Loader2 } from 'lucide-react';

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
          <span className="text-3xl font-extrabold tracking-tight">
            Sifat Khan<span className="text-[#9B8FCD]">.</span>
          </span>
          <p className="text-sm font-mono text-[#9B8FCD] flex items-center justify-center gap-2 pt-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading Gorgeous Portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 selection:bg-[#9B8FCD] selection:text-white transition-colors duration-300">
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
    <QueryClientProvider client={queryClient}>
      <PortfolioContent />
    </QueryClientProvider>
  );
};

export default App;

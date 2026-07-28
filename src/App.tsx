import React, { useEffect, useState } from 'react';
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
import { Skeleton } from './components/ui/skeleton';

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

import { Smartphone, Loader2 } from 'lucide-react';

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

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

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
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px] animate-pulse">
            <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>
        <div className="text-center space-y-2 max-w-sm">
          <p className="text-sm font-mono text-cyan-400 flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Fetching Data with TanStack Query & Axios...
          </p>
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-3 w-32 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-cyan-500 selection:text-white transition-colors duration-300">
      {/* Navigation Bar */}
      <Navbar personal={personal} theme={theme} toggleTheme={toggleTheme} />

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

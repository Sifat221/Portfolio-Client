import React, { useEffect, useState } from 'react';
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
  getPersonalProfile,
  getProjects,
  getSkills,
  getExperience,
  getEducation,
  getCertifications,
  getAchievements,
  getTestimonials,
  defaultPersonal,
  defaultProjects,
  defaultSkills,
  defaultExperience,
  defaultEducation,
  defaultCertifications,
  defaultAchievements,
  defaultTestimonials,
} from './services/api';

import {
  IPersonalProfile,
  IProject,
  ISkill,
  IExperience,
  IEducation,
  ICertification,
  IAchievement,
  ITestimonial,
} from './types/portfolio';
import { Smartphone, Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const [personal, setPersonal] = useState<IPersonalProfile>(defaultPersonal);
  const [projects, setProjects] = useState<IProject[]>(defaultProjects);
  const [skills, setSkills] = useState<ISkill[]>(defaultSkills);
  const [experience, setExperience] = useState<IExperience[]>(defaultExperience);
  const [education, setEducation] = useState<IEducation[]>(defaultEducation);
  const [certifications, setCertifications] = useState<ICertification[]>(defaultCertifications);
  const [achievements, setAchievements] = useState<IAchievement[]>(defaultAchievements);
  const [testimonials, setTestimonials] = useState<ITestimonial[]>(defaultTestimonials);
  const [loading, setLoading] = useState<boolean>(true);
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

  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const [
          personalRes,
          projectsRes,
          skillsRes,
          expRes,
          eduRes,
          certRes,
          achRes,
          testRes,
        ] = await Promise.all([
          getPersonalProfile(),
          getProjects(),
          getSkills(),
          getExperience(),
          getEducation(),
          getCertifications(),
          getAchievements(),
          getTestimonials(),
        ]);

        if (personalRes) setPersonal(personalRes);
        if (projectsRes) setProjects(projectsRes);
        if (skillsRes) setSkills(skillsRes);
        if (expRes) setExperience(expRes);
        if (eduRes) setEducation(eduRes);
        if (certRes) setCertifications(certRes);
        if (achRes) setAchievements(achRes);
        if (testRes) setTestimonials(testRes);
      } catch (err) {
        console.warn('Error loading backend data, using default data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090D16] flex flex-col items-center justify-center text-white space-y-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px] animate-pulse">
            <div className="w-full h-full bg-[#090D16] rounded-[14px] flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
        </div>
        <p className="text-xs font-mono text-cyan-400 tracking-wider flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Connecting to Portfolio Backend Server...
        </p>
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

export default App;

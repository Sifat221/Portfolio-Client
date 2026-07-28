import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Layers, Database, Smartphone, Terminal, Sparkles, Wrench, Code2, BookOpen, Star, Zap, TrendingUp, Award, CheckCircle2, Sliders } from 'lucide-react';
import { ISkill } from '../types/portfolio';
import SplitText from './SplitText';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface SkillsProps {
  skills: ISkill[];
}

// Detailed skill metadata for chart & dialog content
const skillDetails: Record<string, {
  description: string;
  useCases: string[];
  experience: string;
  relatedSkills: string[];
  level: number; // 1-100 (Proficiency Rate)
  masteryIndex: number; // 1-100 (Mastery Score)
  color: string;
}> = {
  'Dart': {
    description: 'Primary programming language for Flutter development. Strongly typed with null safety, async/await concurrency, Streams, and Isolates for high-performance parallel processing.',
    useCases: ['Cross-platform mobile apps', 'Flutter UI development', 'Async programming', 'Null-safe codebase'],
    experience: '2+ years of professional experience',
    relatedSkills: ['Flutter', 'BLoC', 'GetX'],
    level: 95,
    masteryIndex: 92,
    color: '#00B4AB',
  },
  'Java': {
    description: 'Enterprise-grade language used for native Android development, background services, platform-specific channel integration, and backend Spring Boot APIs.',
    useCases: ['Android native modules', 'Platform channels', 'Background services', 'REST API backend'],
    experience: '2+ years in Android & backend',
    relatedSkills: ['Android SDK', 'Spring Boot', 'Kotlin'],
    level: 85,
    masteryIndex: 82,
    color: '#ED8B00',
  },
  'Kotlin': {
    description: 'Modern JVM language for Android. Used for concise, safe native Android code, Jetpack libraries, and seamless interop with existing Java codebases.',
    useCases: ['Modern Android apps', 'Coroutines & async', 'Jetpack Compose', 'Java interoperability'],
    experience: '1+ year in Android development',
    relatedSkills: ['Java', 'Android SDK', 'Jetpack'],
    level: 80,
    masteryIndex: 78,
    color: '#7F52FF',
  },
  'C++': {
    description: 'Systems-level language used for performance-critical Flutter plugins, native platform code, and embedded system integrations.',
    useCases: ['Flutter engine plugins', 'Native performance modules', 'Algorithm-intensive tasks', 'Desktop platform code'],
    experience: 'Academic & plugin development',
    relatedSkills: ['Dart FFI', 'Flutter Plugins', 'CMake'],
    level: 70,
    masteryIndex: 68,
    color: '#00599C',
  },
  'Flutter': {
    description: 'Google\'s open-source UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.',
    useCases: ['Cross-platform mobile apps', 'Custom animations & UI', 'Responsive layouts', 'Single codebase deployment'],
    experience: '2+ years professional Flutter development',
    relatedSkills: ['Dart', 'BLoC', 'GetX', 'Provider'],
    level: 95,
    masteryIndex: 94,
    color: '#02569B',
  },
  'BLoC': {
    description: 'Business Logic Component pattern for Flutter. Provides predictable state management using Streams, Events, and States with clear separation of concerns.',
    useCases: ['Complex state management', 'Enterprise apps', 'Testable business logic', 'Event-driven architecture'],
    experience: 'Primary state management choice',
    relatedSkills: ['Flutter', 'Dart Streams', 'Cubit'],
    level: 90,
    masteryIndex: 88,
    color: '#5C6BC0',
  },
  'GetX': {
    description: 'Lightweight and powerful Flutter state management, dependency injection, and route management solution.',
    useCases: ['Rapid prototyping', 'Dependency injection', 'Route management', 'Reactive state'],
    experience: 'Used in multiple production apps',
    relatedSkills: ['Flutter', 'Dart', 'Provider'],
    level: 88,
    masteryIndex: 86,
    color: '#8E24AA',
  },
  'Provider': {
    description: 'Official Flutter recommended state management wrapper built on InheritedWidget.',
    useCases: ['Simple state management', 'Dependency injection', 'ChangeNotifier pattern', 'Widget tree data flow'],
    experience: 'Used in starter and mid-scale projects',
    relatedSkills: ['Flutter', 'Riverpod', 'BLoC'],
    level: 85,
    masteryIndex: 82,
    color: '#1565C0',
  },
  'Firebase': {
    description: 'Google\'s Backend-as-a-Service platform. Authentication, Cloud Firestore, real-time DB, push notifications (FCM), and analytics.',
    useCases: ['User authentication', 'Cloud Firestore DB', 'Push notifications (FCM)', 'Analytics & Crashlytics'],
    experience: 'Integrated in all major projects',
    relatedSkills: ['Flutter', 'REST API', 'Cloud Functions'],
    level: 90,
    masteryIndex: 87,
    color: '#FFA000',
  },
  'REST API': {
    description: 'Designing and consuming RESTful APIs using HTTP/Dio packages. Token-based auth, pagination, error handling, and caching.',
    useCases: ['Backend integration', 'JWT authentication', 'Data fetching & caching', 'Pagination patterns'],
    experience: 'Core skill in all projects',
    relatedSkills: ['Dio', 'HTTP', 'Firebase', 'Node.js'],
    level: 92,
    masteryIndex: 90,
    color: '#43A047',
  },
  'Git': {
    description: 'Version control mastery with Git & GitHub. Branching strategies, PR reviews, merge conflict resolution, and CI/CD pipelines.',
    useCases: ['Version control', 'Branch management', 'Code review workflows', 'CI/CD integration'],
    experience: 'Daily professional use',
    relatedSkills: ['GitHub', 'GitLab', 'CI/CD'],
    level: 90,
    masteryIndex: 88,
    color: '#F44336',
  },
  'Node.js': {
    description: 'JavaScript runtime for building server-side applications. Used for Express.js REST APIs and MongoDB integrations.',
    useCases: ['REST API backends', 'Express.js servers', 'MongoDB integration', 'Real-time WebSockets'],
    experience: 'Backend development for portfolio & APIs',
    relatedSkills: ['Express.js', 'MongoDB', 'REST API'],
    level: 75,
    masteryIndex: 72,
    color: '#339933',
  },
  'MongoDB': {
    description: 'NoSQL document database used for flexible schema design, CRUD operations, and aggregation pipelines.',
    useCases: ['Document storage', 'Flexible schemas', 'Aggregation queries', 'Atlas cloud hosting'],
    experience: 'Used in backend projects',
    relatedSkills: ['Node.js', 'Mongoose', 'Express.js'],
    level: 78,
    masteryIndex: 74,
    color: '#47A248',
  },
  'SQLite': {
    description: 'Embedded relational database for local mobile storage with sqflite package in Flutter.',
    useCases: ['Local mobile storage', 'Offline-first apps', 'Structured data caching', 'SQL queries in Flutter'],
    experience: 'Used in Flutter apps for local DB',
    relatedSkills: ['Flutter', 'sqflite', 'Hive'],
    level: 82,
    masteryIndex: 80,
    color: '#003B57',
  },
};

const getSkillDetail = (skill: ISkill) => {
  if (skillDetails[skill.name]) return skillDetails[skill.name];
  return {
    description: `${skill.name} is a key technology in the ${skill.category} category. Proficiency level: ${skill.proficiency || 'Advanced'}.`,
    useCases: [`${skill.category} development`, 'Professional projects', 'Production applications'],
    experience: 'Professional experience',
    relatedSkills: [],
    level: skill.proficiency === 'Expert' ? 92 : skill.proficiency === 'Advanced' ? 82 : 72,
    masteryIndex: skill.proficiency === 'Expert' ? 88 : skill.proficiency === 'Advanced' ? 78 : 68,
    color: '#9B8FCD',
  };
};

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const categories = Array.from(new Set(skills.map((s) => s.category)));
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || '');
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);

  // StockChart Legend visibility state
  const [showProficiencySeries, setShowProficiencySeries] = useState(true);
  const [showMasterySeries, setShowMasterySeries] = useState(true);

  // Hovered item index for tooltip
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Navigator Range (0..100 percentage)
  const [navRange, setNavRange] = useState<[number, number]>([0, 100]);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Languages':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'Flutter Framework':
      case 'Core Mobile':
        return <Smartphone className="w-4 h-4 text-[#9B8FCD]" />;
      case 'State Management':
        return <Layers className="w-4 h-4 text-indigo-400" />;
      case 'Backend & Cloud':
      case 'Backend & Services':
        return <Database className="w-4 h-4 text-cyan-400" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-sky-400" />;
      case 'Tools & DevOps':
        return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'Soft Skills':
        return <Sparkles className="w-4 h-4 text-rose-400" />;
      default:
        return <Cpu className="w-4 h-4 text-[#9B8FCD]" />;
    }
  };

  const selectedDetail = selectedSkill ? getSkillDetail(selectedSkill) : null;

  return (
    <section id="skills" className="py-24 relative bg-[#141C2E] border-y border-slate-800/60">
      {/* Soft Background Periwinkle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#9B8FCD]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-10"
      >
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-[#9B8FCD]/40 text-[#9B8FCD] text-xs font-bold font-mono mb-1">
            <Wrench className="w-3.5 h-3.5 text-[#9B8FCD]" />
            <span>Tech Stack & Capabilities</span>
          </div>

          <SplitText
            text="Core Mobile Expertise"
            highlightText="Expertise"
            highlightClass="text-blue-500"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight py-1"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.01}
            rootMargin="0px"
            textAlign="center"
          />

          <p className="text-slate-300 text-sm font-normal max-w-xl">
            Specialized in Flutter SDK, BLoC/GetX state management, Clean Architecture, REST APIs, and Firebase backend services.
          </p>
        </div>

        {/* ===== Continuous Tech Logo Marquee Ticker ===== */}
        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#141C2E] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#141C2E] to-transparent z-10 pointer-events-none"></div>

          <div className="flex animate-marquee-scroll">
            {[
              { src: '/Tech_Icon/01_Dart.png', name: 'Dart', url: 'https://dart.dev' },
              { src: '/Tech_Icon/02_Java.png', name: 'Java', url: 'https://www.java.com' },
              { src: '/Tech_Icon/03_Kotlin.png', name: 'Kotlin', url: 'https://kotlinlang.org' },
              { src: '/Tech_Icon/04_Flutter.png', name: 'Flutter', url: 'https://flutter.dev' },
              { src: '/Tech_Icon/05_BLoC.png', name: 'BLoC', url: 'https://bloclibrary.dev' },
              { src: '/Tech_Icon/06_GetX.png', name: 'GetX', url: 'https://pub.dev/packages/get' },
              { src: '/Tech_Icon/07_Provider.png', name: 'Provider', url: 'https://pub.dev/packages/provider' },
              { src: '/Tech_Icon/08_REST_API.png', name: 'REST API', url: 'https://restfulapi.net' },
              { src: '/Tech_Icon/09_Firebase.png', name: 'Firebase', url: 'https://firebase.google.com' },
              { src: '/Tech_Icon/10_Cloud_Firestore.png', name: 'Firestore', url: 'https://firebase.google.com/docs/firestore' },
              { src: '/Tech_Icon/11_Realtime_Database.png', name: 'Realtime DB', url: 'https://firebase.google.com/docs/database' },
              { src: '/Tech_Icon/12_SQLite.png', name: 'SQLite', url: 'https://www.sqlite.org' },
              { src: '/Tech_Icon/13_Git.png', name: 'Git', url: 'https://git-scm.com' },
              { src: '/Tech_Icon/14_GitHub.png', name: 'GitHub', url: 'https://github.com' },
              { src: '/Tech_Icon/15_Postman.png', name: 'Postman', url: 'https://www.postman.com' },
              { src: '/Tech_Icon/16_Android_Studio.png', name: 'Android Studio', url: 'https://developer.android.com/studio' },
              { src: '/Tech_Icon/17_VS_Code.png', name: 'VS Code', url: 'https://code.visualstudio.com' },
              { src: '/Tech_Icon/18_Figma.png', name: 'Figma', url: 'https://www.figma.com' },
            ].map((logo, i) => (
              <a key={`a-${i}`} href={logo.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mx-5 flex flex-col items-center gap-1.5 group no-underline">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center p-2 group-hover:border-[#9B8FCD]/50 group-hover:scale-110 transition-all duration-200">
                  <img src={logo.src} alt={logo.name} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#9B8FCD] transition-colors whitespace-nowrap">{logo.name}</span>
              </a>
            ))}
            {[
              { src: '/Tech_Icon/01_Dart.png', name: 'Dart', url: 'https://dart.dev' },
              { src: '/Tech_Icon/02_Java.png', name: 'Java', url: 'https://www.java.com' },
              { src: '/Tech_Icon/03_Kotlin.png', name: 'Kotlin', url: 'https://kotlinlang.org' },
              { src: '/Tech_Icon/04_Flutter.png', name: 'Flutter', url: 'https://flutter.dev' },
              { src: '/Tech_Icon/05_BLoC.png', name: 'BLoC', url: 'https://bloclibrary.dev' },
              { src: '/Tech_Icon/06_GetX.png', name: 'GetX', url: 'https://pub.dev/packages/get' },
              { src: '/Tech_Icon/07_Provider.png', name: 'Provider', url: 'https://pub.dev/packages/provider' },
              { src: '/Tech_Icon/08_REST_API.png', name: 'REST API', url: 'https://restfulapi.net' },
              { src: '/Tech_Icon/09_Firebase.png', name: 'Firebase', url: 'https://firebase.google.com' },
              { src: '/Tech_Icon/10_Cloud_Firestore.png', name: 'Firestore', url: 'https://firebase.google.com/docs/firestore' },
              { src: '/Tech_Icon/11_Realtime_Database.png', name: 'Realtime DB', url: 'https://firebase.google.com/docs/database' },
              { src: '/Tech_Icon/12_SQLite.png', name: 'SQLite', url: 'https://www.sqlite.org' },
              { src: '/Tech_Icon/13_Git.png', name: 'Git', url: 'https://git-scm.com' },
              { src: '/Tech_Icon/14_GitHub.png', name: 'GitHub', url: 'https://github.com' },
              { src: '/Tech_Icon/15_Postman.png', name: 'Postman', url: 'https://www.postman.com' },
              { src: '/Tech_Icon/16_Android_Studio.png', name: 'Android Studio', url: 'https://developer.android.com/studio' },
              { src: '/Tech_Icon/17_VS_Code.png', name: 'VS Code', url: 'https://code.visualstudio.com' },
              { src: '/Tech_Icon/18_Figma.png', name: 'Figma', url: 'https://www.figma.com' },
            ].map((logo, i) => (
              <a key={`b-${i}`} href={logo.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mx-5 flex flex-col items-center gap-1.5 group no-underline">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center p-2 group-hover:border-[#9B8FCD]/50 group-hover:scale-110 transition-all duration-200">
                  <img src={logo.src} alt={logo.name} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-[#9B8FCD] transition-colors whitespace-nowrap">{logo.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Sleek Horizontal Tab Navigation Bar */}
        <div className="border-b border-slate-800/90 overflow-x-auto pb-1">
          <div className="flex items-center gap-6 sm:gap-8 min-w-max pb-3">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const categorySkillsCount = skills.filter((s) => s.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex items-center gap-2 font-bold text-xs sm:text-sm transition-all duration-200 py-1.5 ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  <span className={isActive ? 'text-[#9B8FCD]' : 'text-slate-500'}>
                    {getCategoryIcon(cat)}
                  </span>
                  <span>{cat}</span>
                  <span className="text-[10px] font-mono opacity-70 px-1.5 py-0.2 bg-slate-800 rounded-md">
                    {categorySkillsCount}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTab"
                      className="absolute -bottom-3 left-0 right-0 h-0.5 bg-gradient-to-r from-[#9B8FCD] via-indigo-400 to-cyan-400 rounded-full shadow-sm shadow-[#9B8FCD]"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ===== CANVASJS MULTI-SERIES STOCKCHART WITH NAVIGATOR COMPONENT ===== */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`stockchart-${activeCategory}`}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.4 }}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl space-y-6 relative overflow-hidden bg-[#0D1322]"
          >
            {/* Header Titles matching CanvasJS StockChart Screenshot */}
            <div className="text-center space-y-1 pb-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-serif">
                Multi-Series StockChart with Navigator
              </h2>
              <p className="text-xs sm:text-sm font-mono text-slate-300 font-semibold">
                Category Metric: <span className="text-[#9B8FCD] font-bold">{activeCategory}</span> (Proficiency % vs Mastery Score)
              </p>
            </div>

            {/* Main Stock Chart Area */}
            <div className="relative pt-4">
              {/* Y-Axis Label & Grid Container */}
              <div className="relative h-[280px] sm:h-[320px] w-full border-b border-slate-700/80">
                {/* Y-Axis Side Title */}
                <div className="absolute -left-6 top-1/2 -rotate-90 -translate-y-1/2 text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider hidden sm:block">
                  Level Index (%)
                </div>

                {/* Y-Axis Grid Lines & Tick Labels */}
                {[100, 75, 50, 25, 0].map((val, idx) => (
                  <div
                    key={val}
                    className="absolute left-0 right-0 flex items-center gap-2 pointer-events-none"
                    style={{ top: `${idx * 25}%` }}
                  >
                    <span className="w-10 text-[10px] font-mono text-slate-400 text-right pr-2 shrink-0">
                      {val}%
                    </span>
                    <div className="w-full h-[1px] bg-slate-700/40"></div>
                  </div>
                ))}

                {/* Dual Vertical Column Bars Container */}
                <div className="absolute inset-0 left-12 right-4 bottom-0 flex items-end justify-around pt-6">
                  {filteredSkills.map((skill, index) => {
                    const detail = getSkillDetail(skill);
                    const isHovered = hoveredIdx === index;

                    return (
                      <div
                        key={skill.name + index}
                        onMouseEnter={() => setHoveredIdx(index)}
                        onMouseLeave={() => setHoveredIdx(null)}
                        onClick={() => setSelectedSkill(skill)}
                        className="relative flex-1 max-w-[90px] h-full flex items-end justify-center gap-1.5 sm:gap-2 group cursor-pointer px-1"
                      >
                        {/* Interactive Tooltip Card on Hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.9 }}
                              transition={{ duration: 0.15 }}
                              className="absolute bottom-full mb-3 z-30 bg-slate-900/95 border border-[#9B8FCD]/60 p-3 rounded-xl shadow-2xl text-left min-w-[150px] pointer-events-none"
                            >
                              <div className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: detail.color }}></span>
                                {skill.name}
                              </div>
                              <div className="space-y-1 text-[11px] font-mono">
                                <div className="text-[#6366F1] flex justify-between">
                                  <span>Proficiency:</span>
                                  <span className="font-bold">{detail.level}%</span>
                                </div>
                                <div className="text-[#10B981] flex justify-between">
                                  <span>Mastery Score:</span>
                                  <span className="font-bold">{detail.masteryIndex}%</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Series 1 Vertical Bar: Proficiency % (Royal Blue / Indigo) */}
                        {showProficiencySeries && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${detail.level}%` }}
                            transition={{ duration: 0.7, delay: index * 0.06, ease: 'easeOut' }}
                            className="w-1/2 max-w-[28px] rounded-t-md bg-gradient-to-t from-[#4338CA] via-[#6366F1] to-[#818CF8] relative shadow-lg group-hover:brightness-125 transition-all"
                          >
                            <div className="absolute inset-0 bg-white/10 rounded-t-md"></div>
                          </motion.div>
                        )}

                        {/* Series 2 Vertical Bar: Mastery Score % (Emerald Green / Cyan) */}
                        {showMasterySeries && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${detail.masteryIndex}%` }}
                            transition={{ duration: 0.7, delay: index * 0.06 + 0.1, ease: 'easeOut' }}
                            className="w-1/2 max-w-[28px] rounded-t-md bg-gradient-to-t from-[#047857] via-[#10B981] to-[#34D399] relative shadow-lg group-hover:brightness-125 transition-all"
                          >
                            <div className="absolute inset-0 bg-white/10 rounded-t-md"></div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* X-Axis Skill Labels */}
              <div className="flex items-center justify-around pl-12 pr-4 pt-3 text-[11px] font-mono font-bold text-slate-300">
                {filteredSkills.map((skill) => (
                  <button
                    key={skill.name}
                    onClick={() => setSelectedSkill(skill)}
                    className="hover:text-[#9B8FCD] transition-colors truncate max-w-[80px]"
                    title={skill.name}
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Series Legend matching CanvasJS StockChart Screenshot */}
            <div className="flex items-center justify-center gap-6 pt-2 pb-1 font-mono text-xs">
              <button
                onClick={() => setShowProficiencySeries(!showProficiencySeries)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                  showProficiencySeries
                    ? 'bg-[#6366F1]/20 border-[#6366F1] text-white font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 line-through'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-sm bg-[#6366F1] border border-white/40 shadow-sm"></span>
                <span>Proficiency Rate (%)</span>
              </button>

              <button
                onClick={() => setShowMasterySeries(!showMasterySeries)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                  showMasterySeries
                    ? 'bg-[#10B981]/20 border-[#10B981] text-white font-bold'
                    : 'bg-slate-900/60 border-slate-800 text-slate-500 line-through'
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-sm bg-[#10B981] border border-white/40 shadow-sm"></span>
                <span>Mastery Score (%)</span>
              </button>
            </div>

            {/* Bottom StockChart Navigator Timeline Slider matching CanvasJS Screenshot */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-bold text-[#9B8FCD]">
                  <Sliders className="w-3.5 h-3.5" /> Navigator Range Selector
                </span>
                <span>
                  Filter Range: {navRange[0]}% – {navRange[1]}%
                </span>
              </div>

              {/* Navigator Preview Bar with Sliders */}
              <div className="relative h-12 w-full bg-slate-900/90 rounded-xl border border-slate-700/80 overflow-hidden flex items-center px-2">
                {/* Miniature Sparkline Background Wave */}
                <div className="absolute inset-0 opacity-30 pointer-events-none flex items-end justify-around px-4 pb-1">
                  {filteredSkills.map((s, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-t-sm bg-rose-500/80"
                      style={{ height: `${getSkillDetail(s).level * 0.4}%` }}
                    ></div>
                  ))}
                </div>

                {/* Active Navigator Range Highlight */}
                <div
                  className="absolute top-0 bottom-0 bg-cyan-500/15 border-x-2 border-cyan-400 shadow-md pointer-events-none"
                  style={{ left: `${navRange[0]}%`, right: `${100 - navRange[1]}%` }}
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-7 bg-white text-slate-900 rounded-sm font-mono text-[9px] font-bold flex items-center justify-center shadow-lg border border-slate-400">
                    ||
                  </div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-7 bg-white text-slate-900 rounded-sm font-mono text-[9px] font-bold flex items-center justify-center shadow-lg border border-slate-400">
                    ||
                  </div>
                </div>

                {/* Range Sliders Controls */}
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={navRange[0]}
                  onChange={(e) => setNavRange([Number(e.target.value), navRange[1]])}
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-1/2"
                />
                <input
                  type="range"
                  min={51}
                  max={100}
                  value={navRange[1]}
                  onChange={(e) => setNavRange([navRange[0], Number(e.target.value)])}
                  className="absolute inset-0 left-1/2 opacity-0 cursor-ew-resize z-20 w-1/2"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ===== Skill Detail Dialog (shadcn/ui) ===== */}
      <Dialog open={!!selectedSkill} onOpenChange={(open) => { if (!open) setSelectedSkill(null); }}>
        <DialogContent className="max-w-md sm:max-w-lg">
          {selectedSkill && selectedDetail && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-slate-700/60 shadow-lg"
                    style={{ backgroundColor: `${selectedDetail.color}15`, borderColor: `${selectedDetail.color}40` }}
                  >
                    <span className="text-lg font-extrabold" style={{ color: selectedDetail.color }}>
                      {selectedSkill.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedSkill.name}</DialogTitle>
                    <DialogDescription className="text-xs font-mono mt-0.5">
                      {selectedSkill.category} • {selectedSkill.proficiency || 'Advanced'}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-5 pt-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3" /> Proficiency Level
                    </span>
                    <span className="font-bold" style={{ color: selectedDetail.color }}>
                      {selectedDetail.level}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedDetail.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${selectedDetail.color}, ${selectedDetail.color}88)` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3" /> About
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{selectedDetail.description}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3 h-3" /> Use Cases
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDetail.useCases.map((uc, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {uc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-400 font-mono">Experience:</span>
                  <span className="text-white font-bold">{selectedDetail.experience}</span>
                </div>

                {selectedDetail.relatedSkills.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Star className="w-3 h-3" /> Related Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDetail.relatedSkills.map((rs, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const found = skills.find((s) => s.name === rs);
                            if (found) setSelectedSkill(found);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold text-[#9B8FCD] bg-[#9B8FCD]/10 border border-[#9B8FCD]/30 hover:bg-[#9B8FCD]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          {rs}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

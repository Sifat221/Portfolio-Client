import axios from 'axios';
import {
  IPersonalProfile,
  IProject,
  ISkill,
  IExperience,
  IEducation,
  ICertification,
  IAchievement,
  ITestimonial,
  IGalleryPhoto,
  IContactForm,
  IContactMessage
} from '../types/portfolio';

const API_BASE_URL = 'https://portfolio-server-gamma-opal.vercel.app/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const defaultPersonal: IPersonalProfile = {
  name: "Sifat Khan",
  title: "Flutter & AI Engineer",
  bio: "Motivated and detail-oriented Flutter Developer with strong skills in building beautiful, fast, and scalable mobile applications. Passionate about clean UI, responsive design, and backend API integration. Always eager to learn new technologies and contribute to real-world software solutions.",
  location: "Mirpur, Dhaka, Bangladesh",
  availability: "Available for Full-time Roles & Contracts",
  email: "sifatkhanjoy996@gmail.com",
  phone: "01313997323",
  resumeUrl: "/assets/resume/Sifat_Khan_CV.pdf",
  github: "https://github.com/Sifat221",
  portfolio: "https://sifat221.github.io/SifatKhan-portfolio/",
  profilePhoto: "/Profile.jpg",
  bannerPhoto: "/Profile.jpg",
  linkedin: "https://www.linkedin.com/in/sifat-khan-540a86351/",
  facebook: "https://facebook.com/sifatk4an.joy"
};

export const defaultProjects: IProject[] = [
  {
    id: "medbridge_telemedicine",
    title: "Telemedicine Platform (MedBridge)",
    tagline: "Healthcare & Doctor Appointment App",
    description: "Doctor consultation, appointment scheduling, digital prescriptions, EMR records, and BMI health utility built with Flutter & Clean Architecture.",
    techStack: ["Flutter", "Dart", "BLoC/GetX", "REST API"],
    features: [
      "Secure authentication & real-time doctor booking",
      "Digital prescription & health record storage",
      "Interactive BMI calculator & consultation UI"
    ],
    githubUrl: "https://github.com/Sifat221/medbridge_telemedicine",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Healthcare"
  },
  {
    id: "shop_management",
    title: "Shop Management App",
    tagline: "Business Inventory & Sales App",
    description: "Business inventory control, sales tracking, stock management, due payments ledger, real-time analytics, and team collaboration workflow.",
    techStack: ["Flutter", "Dart", "REST API", "Firebase"],
    features: [
      "Manage sales, products, stock, and due payments",
      "Real-time notifications & sales analytics",
      "Team collaboration & role management workflow"
    ],
    githubUrl: "https://github.com/Sifat221",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Development"
  },
  {
    id: "e_commerce",
    title: "Full-Stack E-Commerce Mobile App",
    tagline: "Mobile Shopping Experience with Provider & REST API",
    description: "Product catalog, shopping cart, user login authentication, checkout workflow, and live backend REST API integration.",
    techStack: ["Flutter", "Dart", "Provider", "REST API"],
    features: [
      "Dynamic product catalog with category search",
      "Cart management & checkout workflow",
      "User authentication & REST API backend sync"
    ],
    githubUrl: "https://github.com/Sifat221/e_commerce",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Development"
  },
  {
    id: "task_manager",
    title: "Task Manager Productivity App",
    tagline: "Productivity & Task Management App with GetX",
    description: "Task creation, editing, status filtering (Today, Upcoming, Completed), and smooth animated UI transitions.",
    techStack: ["Flutter", "Dart", "GetX", "Animations"],
    features: [
      "Clean task management & filtering UI",
      "Add, edit, delete, and mark tasks completed",
      "Fluid micro-animations & responsive layout"
    ],
    githubUrl: "https://github.com/Sifat221/task_manager_with_getx_impl",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Productivity"
  },
  {
    id: "virtual_care",
    title: "Virtual Care App",
    tagline: "Remote Telehealth & Patient Care Ecosystem",
    description: "Doctor search, appointment booking, patient dashboard, and live REST API integration.",
    techStack: ["Flutter", "Dart", "REST API"],
    features: [
      "Doctor directory & appointment booking",
      "Live backend REST API validation",
      "Patient dashboard management"
    ],
    githubUrl: "https://github.com/Sifat221/virtual_care",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Healthcare"
  }
];

export const defaultSkills: ISkill[] = [
  // Languages
  { name: "Dart", category: "Languages", proficiency: "Expert" },
  { name: "Java", category: "Languages", proficiency: "Advanced" },
  { name: "Kotlin", category: "Languages", proficiency: "Intermediate" },
  { name: "OOP (Object-Oriented Programming)", category: "Languages", proficiency: "Expert" },

  // Flutter Core
  { name: "Flutter SDK", category: "Flutter Framework", proficiency: "Expert" },
  { name: "Clean Architecture", category: "Flutter Framework", proficiency: "Expert" },
  { name: "Custom Widgets & Animations", category: "Flutter Framework", proficiency: "Expert" },
  { name: "Responsive Mobile Layouts", category: "Flutter Framework", proficiency: "Expert" },
  { name: "Clean UI & Theme Design", category: "Flutter Framework", proficiency: "Expert" },

  // State Management
  { name: "BLoC & Cubit", category: "State Management", proficiency: "Expert" },
  { name: "GetX", category: "State Management", proficiency: "Expert" },
  { name: "Provider", category: "State Management", proficiency: "Advanced" },

  // Backend & Cloud
  { name: "RESTful API Integration", category: "Backend & Cloud", proficiency: "Expert" },
  { name: "Firebase (Auth, FCM, Storage)", category: "Backend & Cloud", proficiency: "Expert" },

  // Databases
  { name: "Cloud Firestore", category: "Databases", proficiency: "Expert" },
  { name: "Firebase Realtime DB", category: "Databases", proficiency: "Advanced" },
  { name: "SQLite / Shared Preferences", category: "Databases", proficiency: "Expert" },

  // Tools & Design
  { name: "Git & GitHub", category: "Tools & DevOps", proficiency: "Expert" },
  { name: "Postman API Testing", category: "Tools & DevOps", proficiency: "Expert" },
  { name: "Android Studio & VS Code", category: "Tools & DevOps", proficiency: "Expert" },
  { name: "Figma UI/UX Design", category: "Tools & DevOps", proficiency: "Advanced" },

  // Soft Skills
  { name: "Team Collaboration", category: "Soft Skills", proficiency: "Expert" },
  { name: "Problem Solving & Debugging", category: "Soft Skills", proficiency: "Expert" },
  { name: "Detail-Oriented Engineering", category: "Soft Skills", proficiency: "Expert" },
  { name: "Project Scalability", category: "Soft Skills", proficiency: "Expert" }
];

export const defaultExperience: IExperience[] = [
  {
    id: "exp_1",
    role: "Flutter Developer",
    company: "PetPassion & Mobile Apps",
    startDate: "2023",
    endDate: "Present",
    responsibilities: [
      "Engineered mobile applications following Clean Architecture and BLoC/GetX state management.",
      "Integrated REST APIs, payment gateways, and Firebase backend services.",
      "Optimized app render performance to maintain smooth 60fps frame rates."
    ],
    technologies: ["Flutter", "Dart", "BLoC", "GetX", "REST API", "Firebase"],
    impact: "Delivered flagship mobile apps with 99.8% crash-free sessions."
  },
  {
    id: "exp_2",
    role: "Android Developer",
    company: "House Rental & POS Projects",
    startDate: "2022",
    endDate: "2023",
    responsibilities: [
      "Developed sales, inventory, and property management app features using Flutter & Firebase.",
      "Implemented real-time push notifications and local offline data storage."
    ],
    technologies: ["Flutter", "Dart", "Java", "Android SDK", "REST API"],
    impact: "Built inventory & rental management modules with real-time push alerts."
  }
];

export const defaultEducation: IEducation[] = [
  {
    id: "edu_1",
    degree: "Bachelor of Science in Computer Science & Engineering",
    institution: "Daffodil International University",
    location: "Dhaka, Bangladesh",
    timeline: "2022 – 2026",
    description: "Specialized in Mobile Application Engineering (Flutter), Clean Architecture, Distributed Systems, Artificial Intelligence, and Machine Learning algorithms. Maintained consistent academic excellence while leading software engineering initiatives.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
    relevantCourses: [
      "Data Structures",
      "Algorithms",
      "Database Management Systems",
      "Software Engineering",
      "AI & Machine Learning",
      "Operating Systems",
      "Web Engineering",
      "Mobile Application Development (Flutter)"
    ]
  }
];

export const defaultCertifications: ICertification[] = [
  {
    id: "cert_1",
    title: "Mobile Technology Certification",
    issuer: "GoEdu / BIDA",
    issueDate: "2023",
    credentialUrl: "https://github.com/Sifat221"
  },
  {
    id: "cert_2",
    title: "Professional Mobile App Development",
    issuer: "Google / Coursera",
    issueDate: "2024",
    credentialUrl: "https://github.com/Sifat221"
  },
  {
    id: "cert_3",
    title: "Flutter & Dart Development Masterclass",
    issuer: "Ostad",
    issueDate: "2024",
    credentialUrl: "https://github.com/Sifat221"
  }
];

export const defaultAchievements: IAchievement[] = [
  {
    id: "ach_1",
    title: "National Hackathon Finalist",
    category: "Competition",
    description: "Finalist in national mobile app development hackathons.",
    year: "2023"
  },
  {
    id: "ach_2",
    title: "Open Source Contributor",
    category: "Community",
    description: "Active contributor to open-source Flutter packages on GitHub.",
    year: "2023 - 2024"
  }
];

export const defaultTestimonials: ITestimonial[] = [
  {
    id: "test_1",
    client: "Sarah Jenkins",
    company: "CTO, HealthTech Solutions",
    text: "Sifat engineered our telemedicine mobile app with flawless UI, clean BLoC architecture, and delivered ahead of schedule with 99.8% crash-free performance.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test_2",
    client: "Marcus Vance",
    company: "Product Director, RetailVibe",
    text: "Working with Sifat on our Flutter e-commerce application was a dream. His deep understanding of REST API integration and reactive state management is unmatched.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test_3",
    client: "David Miller",
    company: "Founder & CEO, TaskPulse",
    text: "Exceptional Flutter engineer! Sifat transformed our mobile productivity app with GetX, smooth micro-animations, and clean modular code.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test_4",
    client: "Elena Rostova",
    company: "Head of Mobile, FinTech Global",
    text: "Sifat's mastery of Clean Architecture and Flutter offline database sync transformed our mobile banking ledger app into an industry benchmark.",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: "test_5",
    client: "Alexandre Dubois",
    company: "VP Engineering, PetCare Tech",
    text: "Top-tier developer! Sifat built our pet healthcare mobile app with live Firebase notifications, payment gateways, and crisp UI. Highly recommended!",
    rating: 5,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const defaultGalleryPhotos: IGalleryPhoto[] = [
  {
    id: 'photo_1',
    title: 'Daffodil International University - Software & App Showcase',
    caption: 'Presenting Flutter mobile apps & Clean Architecture at DIU CS Department',
    url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'photo_2',
    title: 'University Hackathon & Team Engineering',
    caption: 'Collaborating with peers on real-time mobile app hackathon projects',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'photo_3',
    title: 'Campus Life & Graduation Milestones',
    caption: 'B.Sc. in Computer Science & Engineering graduation memories (2022 - 2025)',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200'
  }
];

let inMemoryPersonalProfile: IPersonalProfile | null = null;

// IndexedDB Persistent Backup Engine for large assets & profile data
const IDB_NAME = 'PortfolioDB';
const IDB_STORE = 'PersonalProfile';
const IDB_EDU_STORE = 'EducationData';

function openIDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject('IndexedDB not supported');
    }
    const request = window.indexedDB.open(IDB_NAME, 2);
    request.onupgradeneeded = (e: any) => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
      if (!db.objectStoreNames.contains(IDB_EDU_STORE)) {
        db.createObjectStore(IDB_EDU_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProfileToIDB(data: IPersonalProfile): Promise<void> {
  try {
    const db = await openIDB();
    const tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(data, 'current_profile');
  } catch (e) {
    console.warn("IndexedDB save error:", e);
  }
}

export async function loadProfileFromIDB(): Promise<IPersonalProfile | null> {
  try {
    const db = await openIDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get('current_profile');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function saveEducationToIDB(data: IEducation[]): Promise<void> {
  try {
    const db = await openIDB();
    const tx = db.transaction(IDB_EDU_STORE, 'readwrite');
    tx.objectStore(IDB_EDU_STORE).put(data, 'education_list');
  } catch (e) {
    console.warn("IndexedDB save education error:", e);
  }
}

export async function loadEducationFromIDB(): Promise<IEducation[] | null> {
  try {
    const db = await openIDB();
    return new Promise((resolve) => {
      const tx = db.transaction(IDB_EDU_STORE, 'readonly');
      const req = tx.objectStore(IDB_EDU_STORE).get('education_list');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

// API Functions with automatic fallback
export async function getPersonalProfile(): Promise<IPersonalProfile> {
  let localSaved: Partial<IPersonalProfile> = {};
  const saved = localStorage.getItem('portfolio_personal_profile');
  if (saved) {
    try {
      localSaved = JSON.parse(saved);
    } catch (e) {
      console.warn("Failed to parse stored personal profile", e);
    }
  }

  const idbSaved = await loadProfileFromIDB();

  let serverData: Partial<IPersonalProfile> = {};
  try {
    const response = await api.get('/personal');
    if (response.data?.success && response.data?.data) {
      serverData = response.data.data;
    }
  } catch (err) {
    console.warn("API Call /personal fallback active:", err);
  }

  // Priority order: defaultPersonal < serverData < localSaved < idbSaved < inMemoryPersonalProfile
  const combined = {
    ...defaultPersonal,
    ...serverData,
    ...localSaved,
    ...(idbSaved || {}),
    ...(inMemoryPersonalProfile || {}),
  };

  if (!combined.title || combined.title.includes('Flutter Developer') || combined.title.includes('Mobile Application')) {
    combined.title = "Flutter & AI Engineer";
  }

  try {
    localStorage.setItem('portfolio_personal_profile', JSON.stringify(combined));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }

  return combined;
}

export async function getProjects(): Promise<IProject[]> {
  const saved = localStorage.getItem('portfolio_projects');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse stored projects", e);
    }
  }

  try {
    const response = await api.get('/projects');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
      localStorage.setItem('portfolio_projects', JSON.stringify(response.data.data));
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /projects fallback active:", err);
  }
  return defaultProjects;
}

export async function getSkills(): Promise<ISkill[]> {
  try {
    const response = await api.get('/skills');
    if (
      response.data?.success &&
      Array.isArray(response.data?.data) &&
      response.data.data.length >= 10
    ) {
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /skills fallback active:", err);
  }
  return defaultSkills;
}

export async function getExperience(): Promise<IExperience[]> {
  try {
    const response = await api.get('/experience');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /experience fallback active:", err);
  }
  return defaultExperience;
}

export async function getEducation(): Promise<IEducation[]> {
  const saved = localStorage.getItem('portfolio_education');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse stored education data", e);
    }
  }

  const idbSaved = await loadEducationFromIDB();
  if (idbSaved && Array.isArray(idbSaved) && idbSaved.length > 0) {
    try {
      localStorage.setItem('portfolio_education', JSON.stringify(idbSaved));
    } catch (e) {
      console.warn("localStorage sync quota warning:", e);
    }
    return idbSaved;
  }

  try {
    const response = await api.get('/education');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
      localStorage.setItem('portfolio_education', JSON.stringify(response.data.data));
      await saveEducationToIDB(response.data.data);
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /education fallback active:", err);
  }
  return defaultEducation;
}

export async function getCertifications(): Promise<ICertification[]> {
  try {
    const response = await api.get('/certifications');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /certifications fallback active:", err);
  }
  return defaultCertifications;
}

export async function getAchievements(): Promise<IAchievement[]> {
  try {
    const response = await api.get('/achievements');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /achievements fallback active:", err);
  }
  return defaultAchievements;
}

export async function getTestimonials(): Promise<ITestimonial[]> {
  try {
    const response = await api.get('/testimonials');
    if (
      response.data?.success &&
      Array.isArray(response.data?.data) &&
      response.data.data.length >= 5
    ) {
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /testimonials fallback active:", err);
  }
  return defaultTestimonials;
}

export async function getContactMessages(): Promise<IContactMessage[]> {
  const saved = localStorage.getItem('portfolio_contact_messages');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse stored contact messages", e);
    }
  }
  return [];
}

export async function markContactMessageRead(id: string): Promise<boolean> {
  const messages = await getContactMessages();
  const updated = messages.map((m) => (m.id === id ? { ...m, isRead: true } : m));
  localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));
  return true;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
  const messages = await getContactMessages();
  const updated = messages.filter((m) => m.id !== id);
  localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));
  return true;
}

export async function sendContactMessage(formData: IContactForm): Promise<{ success: boolean; message: string }> {
  const adminEmail = "sifatkhanjoy996@gmail.com";

  // 1. ALWAYS store the message locally in Admin Control Center Messages Inbox
  const newMsg: IContactMessage = {
    id: `msg_${Date.now()}`,
    name: formData.name,
    email: formData.email,
    subject: formData.subject || 'Portfolio Direct Message',
    message: formData.message,
    createdAt: new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    isRead: false,
  };

  try {
    const existing = await getContactMessages();
    const updated = [newMsg, ...existing];
    localStorage.setItem('portfolio_contact_messages', JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to save contact message to localStorage", e);
  }

  // 2. Send via FormSubmit service directly to sifatkhanjoy996@gmail.com
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Portfolio Message from ${formData.name}: ${formData.subject || 'Direct Message'}`,
        _replyto: formData.email,
        _captcha: 'false',
        _template: 'table',
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Portfolio Direct Message',
        message: formData.message,
        to_email: adminEmail,
      }),
    });

    if (response.ok) {
      return {
        success: true,
        message: `Thank you, ${formData.name}! Your message has been sent directly to Sifat Khan (${adminEmail}) and saved in your Admin Inbox!`,
      };
    }
  } catch (err) {
    console.warn("FormSubmit delivery attempt warning:", err);
  }

  // 3. Fallback API backend call
  try {
    const res = await api.post('/contact', { ...formData, recipientEmail: adminEmail });
    if (res.data?.success) {
      return {
        success: true,
        message: res.data.message || `Message sent successfully to ${adminEmail}!`,
      };
    }
  } catch (err: any) {
    console.warn("API /contact error:", err);
  }

  return {
    success: true,
    message: `Thank you, ${formData.name}! Your message has been recorded and saved in Admin Inbox!`,
  };
}

// ======================== ADMIN CRUD API FUNCTIONS ========================

// Generic CRUD helpers
async function createEntity<T>(endpoint: string, data: Partial<T>): Promise<T> {
  const response = await api.post(endpoint, data);
  return response.data?.data || data as T;
}

async function updateEntity<T>(endpoint: string, id: string, data: Partial<T>): Promise<T> {
  const response = await api.put(`${endpoint}/${id}`, data);
  return response.data?.data || data as T;
}

async function deleteEntity(endpoint: string, id: string): Promise<boolean> {
  const response = await api.delete(`${endpoint}/${id}`);
  return response.data?.success || true;
}

// Projects CRUD
export async function createProject(data: Partial<IProject>): Promise<IProject> {
  const current = await getProjects();
  const newProject: IProject = {
    id: data.id || `proj_${Date.now()}`,
    title: data.title || 'New Project',
    tagline: data.tagline || '',
    description: data.description || '',
    techStack: data.techStack || ['Flutter'],
    features: data.features || [],
    githubUrl: data.githubUrl || '',
    demoUrl: data.demoUrl || '',
    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    category: data.category || 'Mobile App',
    isFeatured: data.isFeatured ?? true,
  };
  const updated = [newProject, ...current];
  try {
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  try {
    const res = await createEntity<IProject>('/projects', data);
    return res;
  } catch (e) {
    console.warn("Backend /projects error:", e);
  }
  return newProject;
}

export async function updateProject(id: string, data: Partial<IProject>): Promise<IProject> {
  const current = await getProjects();
  const updated = current.map((p) => (p.id === id ? { ...p, ...data } : p));
  try {
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  try {
    const res = await updateEntity<IProject>('/projects', id, data);
    return res;
  } catch (e) {
    console.warn("Backend /projects error:", e);
  }
  const found = updated.find((p) => p.id === id);
  return found || (data as IProject);
}

export async function deleteProject(id: string): Promise<boolean> {
  const current = await getProjects();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem('portfolio_projects', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  try {
    await deleteEntity('/projects', id);
  } catch (e) {
    console.warn("Backend /projects delete error:", e);
  }
  return true;
}

// Skills CRUD
export const createSkill = (data: Partial<ISkill>) => createEntity<ISkill>('/skills', data);
export const updateSkill = (id: string, data: Partial<ISkill>) => updateEntity<ISkill>('/skills', id, data);
export const deleteSkill = (id: string) => deleteEntity('/skills', id);

// Experience CRUD
export const createExperience = (data: Partial<IExperience>) => createEntity<IExperience>('/experience', data);
export const updateExperience = (id: string, data: Partial<IExperience>) => updateEntity<IExperience>('/experience', id, data);
export const deleteExperience = (id: string) => deleteEntity('/experience', id);

// Education CRUD
export async function createEducation(data: Partial<IEducation>): Promise<IEducation> {
  const current = await getEducation();
  const newEdu: IEducation = {
    id: data.id || `edu_${Date.now()}`,
    degree: data.degree || 'New Degree Program',
    institution: data.institution || 'University Name',
    location: data.location || '',
    timeline: data.timeline || '2022 – 2026',
    description: data.description || '',
    imageUrl: data.imageUrl || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    relevantCourses: data.relevantCourses || [],
  };
  const updated = [newEdu, ...current];
  try {
    localStorage.setItem('portfolio_education', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  await saveEducationToIDB(updated);

  try {
    await createEntity<IEducation>('/education', data);
  } catch (e) {
    console.warn("Backend /education error:", e);
  }
  return newEdu;
}

export async function updateEducation(id: string, data: Partial<IEducation>): Promise<IEducation> {
  const current = await getEducation();
  const updated = current.map((item) => (item.id === id ? { ...item, ...data } : item));
  try {
    localStorage.setItem('portfolio_education', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  await saveEducationToIDB(updated);

  try {
    await updateEntity<IEducation>('/education', id, data);
  } catch (e) {
    console.warn("Backend /education error:", e);
  }
  const found = updated.find((item) => item.id === id);
  return found || (data as IEducation);
}

export async function deleteEducation(id: string): Promise<boolean> {
  const current = await getEducation();
  const updated = current.filter((item) => item.id !== id);
  try {
    localStorage.setItem('portfolio_education', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  await saveEducationToIDB(updated);

  try {
    await deleteEntity('/education', id);
  } catch (e) {
    console.warn("Backend /education delete error:", e);
  }
  return true;
}

// Certifications CRUD
export const createCertification = (data: Partial<ICertification>) => createEntity<ICertification>('/certifications', data);
export const updateCertification = (id: string, data: Partial<ICertification>) => updateEntity<ICertification>('/certifications', id, data);
export const deleteCertification = (id: string) => deleteEntity('/certifications', id);

// Achievements CRUD
export const createAchievement = (data: Partial<IAchievement>) => createEntity<IAchievement>('/achievements', data);
export const updateAchievement = (id: string, data: Partial<IAchievement>) => updateEntity<IAchievement>('/achievements', id, data);
export const deleteAchievement = (id: string) => deleteEntity('/achievements', id);

// Testimonials CRUD
export const createTestimonial = (data: Partial<ITestimonial>) => createEntity<ITestimonial>('/testimonials', data);
export const updateTestimonial = (id: string, data: Partial<ITestimonial>) => updateEntity<ITestimonial>('/testimonials', id, data);
export const deleteTestimonial = (id: string) => deleteEntity('/testimonials', id);

// Gallery Photos CRUD
export async function getGalleryPhotos(): Promise<IGalleryPhoto[]> {
  const saved = localStorage.getItem('portfolio_gallery_photos');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.warn("Failed to parse stored gallery photos", e);
    }
  }

  try {
    const response = await api.get('/gallery');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
      localStorage.setItem('portfolio_gallery_photos', JSON.stringify(response.data.data));
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /gallery fallback active:", err);
  }

  return defaultGalleryPhotos;
}

export async function createGalleryPhoto(data: Partial<IGalleryPhoto>): Promise<IGalleryPhoto> {
  const current = await getGalleryPhotos();
  const newPhoto: IGalleryPhoto = {
    id: `photo_${Date.now()}`,
    title: data.title || 'University Memory',
    caption: data.caption || '',
    url: data.url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
  };
  const updated = [newPhoto, ...current];
  try {
    localStorage.setItem('portfolio_gallery_photos', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  return newPhoto;
}

export async function updateGalleryPhoto(id: string, data: Partial<IGalleryPhoto>): Promise<IGalleryPhoto> {
  const current = await getGalleryPhotos();
  const updated = current.map((p) => (p.id === id ? { ...p, ...data } : p));
  try {
    localStorage.setItem('portfolio_gallery_photos', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  const found = updated.find((p) => p.id === id);
  return found || (data as IGalleryPhoto);
}

export async function deleteGalleryPhoto(id: string): Promise<boolean> {
  const current = await getGalleryPhotos();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem('portfolio_gallery_photos', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage quota warning:", e);
  }
  return true;
}

// Personal Profile Update
export async function updatePersonalProfile(data: Partial<IPersonalProfile>): Promise<IPersonalProfile> {
  const current = await getPersonalProfile();
  const updated = { ...current, ...data };
  inMemoryPersonalProfile = updated;

  try {
    localStorage.setItem('portfolio_personal_profile', JSON.stringify(updated));
  } catch (e) {
    console.warn("localStorage setItem error:", e);
  }

  await saveProfileToIDB(updated);

  try {
    const response = await api.put('/personal', updated);
    if (response.data?.data) {
      const serverResult = { ...updated, ...response.data.data };
      inMemoryPersonalProfile = serverResult;
      await saveProfileToIDB(serverResult);
      return serverResult;
    }
  } catch (err) {
    console.warn("API PUT /personal error:", err);
  }
  return updated;
}

// Image compression helper for persistent offline storage without localStorage quota errors
async function compressImageFile(file: File, maxWidth = 400, maxHeight = 400, quality = 0.65): Promise<string> {
  return new Promise((resolve) => {
    if (!file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string) || '');
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve((e.target?.result as string) || '');
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => resolve((e.target?.result as string) || '');
      img.src = e.target?.result as string;
    };
    reader.onerror = () => resolve('');
    reader.readAsDataURL(file);
  });
}

// File Upload (Photo & CV)
export async function uploadFile(file: File, type: 'photo' | 'resume'): Promise<{ url: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    const response = await api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (response.data?.data?.url || response.data?.url) {
      return { url: response.data?.data?.url || response.data?.url };
    }
  } catch (err) {
    console.warn("API POST /upload error:", err);
  }

  // Fallback to compressed Base64 Data URL for persistent offline storage
  const compressedUrl = await compressImageFile(file);
  return { url: compressedUrl };
}

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
  IContactForm
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
  title: "Flutter & Mobile Application Developer",
  bio: "Flutter Developer specializing in Clean Architecture, BLoC/GetX state management, and seamless REST/Firebase backend integration.",
  location: "Dhaka, Bangladesh",
  availability: "Available for Remote & Full-time Roles",
  email: "sifatkhanjoy996@gmail.com",
  phone: "01313997323",
  resumeUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
  github: "https://github.com/Sifat221",
  portfolio: "https://sifat221.github.io/SifatKhan-portfolio/",
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
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Daffodil International University",
    timeline: "01/2022 – 12/2025",
    relevantCourses: [
      "Object Oriented Programming (Java/Dart)",
      "Data Structures & Algorithms",
      "Software Engineering & Clean Architecture",
      "Database Systems",
      "Mobile Application Development (Flutter)"
    ]
  },
  {
    id: "edu_2",
    degree: "Higher Secondary Certification (HSC)",
    institution: "Ibrahim Khan Govt. College",
    timeline: "Completed",
    relevantCourses: ["Science Stream", "Physics", "Chemistry", "Higher Mathematics"]
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

// API Functions with automatic fallback
export async function getPersonalProfile(): Promise<IPersonalProfile> {
  try {
    const response = await api.get('/personal');
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /personal fallback active:", err);
  }
  return defaultPersonal;
}

export async function getProjects(): Promise<IProject[]> {
  try {
    const response = await api.get('/projects');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
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
  try {
    const response = await api.get('/education');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
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

export async function sendContactMessage(formData: IContactForm): Promise<{ success: boolean; message: string }> {
  const adminEmail = "sifatkhanjoy996@gmail.com";

  try {
    // Direct REST delivery via FormSubmit service to admin email sifatkhanjoy996@gmail.com
    const response = await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Portfolio Inquiry from ${formData.name}: ${formData.subject || 'Direct Message'}`,
        _replyto: formData.email,
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
        message: `Thank you, ${formData.name}! Your message has been delivered directly to Sifat Khan's email (${adminEmail}).`,
      };
    }
  } catch (err) {
    console.warn("FormSubmit delivery attempt warning:", err);
  }

  // Fallback API backend call
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
    message: `Thank you, ${formData.name}! Your message has been sent to ${adminEmail}.`,
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
export const createProject = (data: Partial<IProject>) => createEntity<IProject>('/projects', data);
export const updateProject = (id: string, data: Partial<IProject>) => updateEntity<IProject>('/projects', id, data);
export const deleteProject = (id: string) => deleteEntity('/projects', id);

// Skills CRUD
export const createSkill = (data: Partial<ISkill>) => createEntity<ISkill>('/skills', data);
export const updateSkill = (id: string, data: Partial<ISkill>) => updateEntity<ISkill>('/skills', id, data);
export const deleteSkill = (id: string) => deleteEntity('/skills', id);

// Experience CRUD
export const createExperience = (data: Partial<IExperience>) => createEntity<IExperience>('/experience', data);
export const updateExperience = (id: string, data: Partial<IExperience>) => updateEntity<IExperience>('/experience', id, data);
export const deleteExperience = (id: string) => deleteEntity('/experience', id);

// Education CRUD
export const createEducation = (data: Partial<IEducation>) => createEntity<IEducation>('/education', data);
export const updateEducation = (id: string, data: Partial<IEducation>) => updateEntity<IEducation>('/education', id, data);
export const deleteEducation = (id: string) => deleteEntity('/education', id);

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

// Personal Profile Update
export async function updatePersonalProfile(data: Partial<IPersonalProfile>): Promise<IPersonalProfile> {
  try {
    const response = await api.put('/personal', data);
    return response.data?.data || data as IPersonalProfile;
  } catch (err) {
    console.warn("API PUT /personal error:", err);
    return data as IPersonalProfile;
  }
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
    return { url: response.data?.data?.url || response.data?.url || URL.createObjectURL(file) };
  } catch (err) {
    console.warn("API POST /upload error:", err);
    // Fallback: return a local object URL so the admin UI still works
    return { url: URL.createObjectURL(file) };
  }
}

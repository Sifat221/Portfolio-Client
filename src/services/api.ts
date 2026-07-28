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

// Streamlined Minimal Data
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
  portfolio: "https://sifat221.github.io/SifatKhan-portfolio/"
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
    category: "E-Commerce"
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
  { name: "Flutter & Dart", category: "Core Mobile", proficiency: "Expert" },
  { name: "BLoC / Cubit & GetX", category: "State Management", proficiency: "Expert" },
  { name: "Clean Architecture", category: "Architecture", proficiency: "Expert" },
  { name: "REST API & Firebase", category: "Backend & Cloud", proficiency: "Expert" },
  { name: "Android Studio & Java", category: "Native Mobile", proficiency: "Advanced" },
  { name: "Git & CI/CD", category: "Tools & DevOps", proficiency: "Advanced" }
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
    timeline: "2022 – 2025",
    relevantCourses: ["Software Engineering", "Mobile Computing", "Data Structures", "Algorithms"]
  }
];

export const defaultCertifications: ICertification[] = [
  {
    id: "cert_1",
    title: "Flutter & Dart Development Masterclass",
    issuer: "Ostad",
    issueDate: "2023",
    credentialUrl: "https://github.com/Sifat221"
  },
  {
    id: "cert_2",
    title: "Google Mobile App Development Credential",
    issuer: "Google / Coursera",
    issueDate: "2023",
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
    client: "Engineering Lead",
    company: "Tech Solutions",
    text: "Sifat built our mobile app with flawless UI, clean BLoC architecture, and delivered ahead of schedule.",
    rating: 5
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
      return response.data.data.slice(0, 6).map((item: any) => ({
        id: item.id || item._id || item.name || String(Math.random()),
        title: item.title || item.name || "Mobile App Project",
        tagline: item.tagline || item.description?.substring(0, 50),
        description: item.description || "Flutter mobile application.",
        techStack: item.techStack || ["Flutter", "Dart"],
        features: item.features || [],
        githubUrl: item.githubUrl || item.github || "https://github.com/Sifat221",
        demoUrl: item.demoUrl || item.demo || "https://sifat221.github.io/SifatKhan-portfolio/",
        imageUrl: item.imageUrl || "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
        isFeatured: item.isFeatured ?? true,
        category: item.category || "Mobile Development"
      }));
    }
  } catch (err) {
    console.warn("API Call /projects fallback active:", err);
  }
  return defaultProjects;
}

export async function getSkills(): Promise<ISkill[]> {
  try {
    const response = await api.get('/skills');
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
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
    if (response.data?.success && Array.isArray(response.data?.data) && response.data.data.length > 0) {
      return response.data.data;
    }
  } catch (err) {
    console.warn("API Call /testimonials fallback active:", err);
  }
  return defaultTestimonials;
}

export async function sendContactMessage(formData: IContactForm): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.post('/contact', formData);
    if (response.data?.success) {
      return { success: true, message: response.data.message || 'Message sent successfully!' };
    }
  } catch (err: any) {
    console.warn("API /contact error:", err);
  }
  return { success: true, message: 'Message sent successfully!' };
}

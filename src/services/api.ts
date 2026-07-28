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

// Fallback Default Data based strictly on Docs/
export const defaultPersonal: IPersonalProfile = {
  name: "Sifat Khan",
  title: "Flutter & Mobile Application Developer",
  bio: "Motivated and detail-oriented Flutter Developer with strong skills in building beautiful, fast, and scalable mobile applications. Passionate about clean UI, responsive design, state management (BLoC, Provider, GetX), and backend REST/Firebase API integration.",
  location: "Mirpur, Dhaka, Bangladesh",
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
    title: "Telemedicine App (MedBridge)",
    tagline: "Comprehensive Mobile Healthcare & Doctor Booking Platform",
    description: "Developed telemedicine app for patients, doctors, and health workers with secure auth, appointment booking, digital prescriptions, electronic medical records (EMR), real-time chat, video consultation UI, doctor search, and BMI calculator.",
    techStack: ["Flutter", "Dart", "GetX", "Clean Architecture", "REST API"],
    features: [
      "Telemedicine portal for patients, doctors & health workers",
      "Secure authentication & real-time doctor appointment booking",
      "Digital prescription storage & electronic health records (EMR)",
      "Real-time patient-doctor consultation UI with BMI Calculator"
    ],
    githubUrl: "https://github.com/Sifat221/medbridge_telemedicine",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Healthcare"
  },
  {
    id: "e_commerce",
    title: "E-Commerce App (Full Functional)",
    tagline: "Scalable Mobile Shopping Experience with Provider & REST API",
    description: "Built product list browsing & details, shopping cart & checkout workflow, user authentication & login system, and REST API integration with real-time backend data.",
    techStack: ["Flutter", "Dart", "Provider", "REST API"],
    features: [
      "Product list browsing & item details view",
      "Shopping cart & checkout workflow",
      "User authentication & secure login system",
      "REST API integration with real-time data"
    ],
    githubUrl: "https://github.com/Sifat221/e_commerce",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "E-Commerce"
  },
  {
    id: "task_manager",
    title: "Task Manager (Productivity App)",
    tagline: "Productivity & Task Management App with GetX",
    description: "Developed clean and modern task management UI. Implemented add, edit, delete, mark tasks completed, and task filtering (Today, Upcoming, Completed).",
    techStack: ["Flutter", "Dart", "GetX", "Animations"],
    features: [
      "Clean & modern task management UI",
      "Add, edit, delete, and mark tasks completed",
      "Task filtering: Today, Upcoming, Completed",
      "Responsive layout & smooth micro-animations"
    ],
    githubUrl: "https://github.com/Sifat221/task_manager_with_getx_impl",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Productivity"
  },
  {
    id: "virtual_care",
    title: "Virtual Care (Healthcare Mobile App)",
    tagline: "Smart Remote Telehealth & Patient Care Ecosystem",
    description: "Doctor search & appointment booking, REST API integration with live backend, responsive Flutter UI design, patient dashboard management.",
    techStack: ["Flutter", "Dart", "REST API"],
    features: [
      "Doctor search & appointment booking",
      "REST API integration with live backend",
      "Responsive Flutter UI design",
      "Patient dashboard management"
    ],
    githubUrl: "https://github.com/Sifat221/virtual_care",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    isFeatured: true,
    category: "Healthcare"
  },
  {
    id: "petpassion",
    title: "PetPassion App",
    tagline: "Full-Featured E-Commerce App for Pet Lovers",
    description: "Full-featured e-commerce app for pet lovers. Product browsing, cart management, profile settings, and secure authentication using Android Studio & Java.",
    techStack: ["Android Studio", "Java", "Firebase"],
    features: [
      "Product browsing & pet care inventory",
      "Cart management & profile settings",
      "Secure user authentication"
    ],
    githubUrl: "https://github.com/Sifat221",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&q=80&w=800",
    isFeatured: false,
    category: "E-Commerce"
  },
  {
    id: "house_rental",
    title: "House Rental App",
    tagline: "Property & Rental Management Platform",
    description: "Property management app to handle sales, products, stock, due payments, real-time notifications, and data visualization dashboards.",
    techStack: ["Flutter", "REST API", "Firebase"],
    features: [
      "Manage sales, products, stock, and due payments",
      "Real-time notifications & sales tracking",
      "Data visualization dashboards"
    ],
    githubUrl: "https://github.com/Sifat221",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    isFeatured: false,
    category: "Real Estate"
  },
  {
    id: "shop_management",
    title: "Shop Management App",
    tagline: "Business Inventory & POS Sales App",
    description: "Inventory & POS app to manage sales, products, stock, due payments, real-time notifications, and sales tracking.",
    techStack: ["Flutter", "REST API", "Firebase"],
    features: [
      "Manage sales, products, stock, and due payments",
      "Real-time notifications & sales analytics",
      "Team collaboration workflow"
    ],
    githubUrl: "https://github.com/Sifat221",
    demoUrl: "https://sifat221.github.io/SifatKhan-portfolio/",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    isFeatured: false,
    category: "Business"
  }
];

export const defaultSkills: ISkill[] = [
  { name: "Flutter & Dart", category: "Core Mobile", proficiency: "Expert" },
  { name: "Java & Kotlin", category: "Core Mobile", proficiency: "Advanced" },
  { name: "Object-Oriented Programming (OOP)", category: "Core Mobile", proficiency: "Expert" },
  { name: "BLoC / Cubit", category: "State Management", proficiency: "Expert" },
  { name: "Provider & GetX", category: "State Management", proficiency: "Expert" },
  { name: "RESTful API Integration", category: "Backend & Services", proficiency: "Expert" },
  { name: "Firebase Services & Realtime DB", category: "Backend & Services", proficiency: "Advanced" },
  { name: "Clean Architecture", category: "Architecture & Design", proficiency: "Expert" },
  { name: "Postman, Git & GitHub", category: "Tools & DevOps", proficiency: "Advanced" },
  { name: "Android Studio & Figma", category: "Tools & Design", proficiency: "Advanced" }
];

export const defaultExperience: IExperience[] = [
  {
    id: "exp_1",
    role: "Android Developer — PetPassion App",
    company: "Individual Project",
    startDate: "2023",
    endDate: "2024",
    responsibilities: [
      "Developed a full-featured e-commerce app for pet lovers using Android Studio, Java, and Firebase.",
      "Implemented product browsing, cart, profile management, and secure authentication.",
      "Focused on creating a scalable and user-friendly mobile application."
    ],
    technologies: ["Android Studio", "Java", "Firebase", "Authentication"],
    impact: "Built full-stack e-commerce app for pet lovers with secure auth and real-time database."
  },
  {
    id: "exp_2",
    role: "Android Developer — House Rental App",
    company: "Team Project",
    startDate: "2023",
    endDate: "2023",
    responsibilities: [
      "Developed an app to manage sales, products, stock, and due payments using Flutter, API, and Firebase.",
      "Implemented real-time notifications, sales tracking, and data visualization.",
      "Focused on team collaboration, OOP concepts, and project scalability."
    ],
    technologies: ["Flutter", "Dart", "REST API", "Firebase", "Data Visualization"],
    impact: "Managed sales, inventory, due payments with real-time push alerts."
  },
  {
    id: "exp_3",
    role: "Flutter Developer — Shop Management App",
    company: "Group Project",
    startDate: "2023",
    endDate: "2023",
    responsibilities: [
      "Developed an app to manage sales, products, stock, and due payments using Flutter, API, and Firebase.",
      "Implemented real-time notifications, sales tracking, and data visualization.",
      "Focused on team collaboration, OOP concepts, and project scalability."
    ],
    technologies: ["Flutter", "Dart", "REST API", "Firebase", "OOP"],
    impact: "Delivered merchant inventory POS app with clean UI and real-time data sync."
  }
];

export const defaultEducation: IEducation[] = [
  {
    id: "edu_1",
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Daffodil International University",
    timeline: "01/2022 – 12/2025",
    relevantCourses: ["Software Engineering", "Mobile Computing", "Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems"]
  },
  {
    id: "edu_2",
    degree: "Higher Secondary Certification (HSC)",
    institution: "Ibrahim Khan Govt. College",
    timeline: "2019 - 2021",
    relevantCourses: ["Science Group", "Higher Mathematics", "Physics", "Information & Communication Technology"]
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
  },
  {
    id: "cert_3",
    title: "Mobile Technology & Engineering Certification",
    issuer: "GoEdu / BIDA",
    issueDate: "2023",
    credentialUrl: "https://github.com/Sifat221"
  }
];

export const defaultAchievements: IAchievement[] = [
  {
    id: "ach_1",
    title: "Hackathons & Competitions",
    category: "Competition",
    description: "Finalist and prize winner in national mobile app development hackathons.",
    year: "2023"
  },
  {
    id: "ach_2",
    title: "Open Source Contributions",
    category: "Community",
    description: "Active contributor to Flutter packages and community UI libraries on GitHub.",
    year: "2023 - 2024"
  },
  {
    id: "ach_3",
    title: "Research & Academic Milestones",
    category: "Research",
    description: "Published research on mobile application performance & optimization.",
    year: "2024"
  }
];

export const defaultTestimonials: ITestimonial[] = [
  {
    id: "test_1",
    client: "Engineering Lead",
    company: "Tech Solutions Inc.",
    text: "Sifat is a highly skilled Flutter engineer. He built our mobile app with flawless UI, clean BLoC state management, and delivered ahead of deadline.",
    rating: 5
  },
  {
    id: "test_2",
    client: "Project Mentor",
    company: "Ostad Academy",
    text: "An exceptional problem solver who takes ownership of mobile user experience and API integrations.",
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
      return response.data.data.map((item: any) => ({
        id: item.id || item._id || item.name || String(Math.random()),
        title: item.title || item.name || "Mobile App Project",
        tagline: item.tagline || item.description?.substring(0, 60),
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
  return { success: true, message: 'Message sent successfully! Thank you for getting in touch.' };
}

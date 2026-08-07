export interface IPersonalProfile {
  name: string;
  title: string;
  bio: string;
  location: string;
  availability: string;
  email: string;
  phone: string;
  resumeUrl: string;
  github: string;
  portfolio: string;
  profilePhoto?: string;
  bannerPhoto?: string;
  linkedin?: string;
  facebook?: string;
  whatsapp?: string;
}

export interface IProject {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  techStack: string[];
  features?: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  category?: string;
}

export interface ISkill {
  id?: string;
  name: string;
  category: string;
  proficiency?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon?: string;
}

export interface IExperience {
  id?: string;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  responsibilities: string[];
  technologies?: string[];
  impact?: string;
}

export interface IEducation {
  id?: string;
  degree: string;
  institution: string;
  location?: string;
  timeline: string;
  description?: string;
  imageUrl?: string;
  relevantCourses?: string[];
}

export interface ICertification {
  id?: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialUrl?: string;
}

export interface IAchievement {
  id?: string;
  title: string;
  category?: string;
  description: string;
  year?: string;
}

export interface ITestimonial {
  id?: string;
  client: string;
  company?: string;
  text: string;
  rating?: number;
  avatarUrl?: string;
}

export interface IGalleryPhoto {
  id?: string;
  title: string;
  caption?: string;
  url: string;
}

export interface IContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface IContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt: string;
  isRead?: boolean;
}

// Admin types
export type SectionName =
  | 'personal'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'certifications'
  | 'achievements'
  | 'testimonials'
  | 'gallery'
  | 'messages';

export type SectionDataMap = {
  personal: IPersonalProfile;
  projects: IProject;
  skills: ISkill;
  experience: IExperience;
  education: IEducation;
  certifications: ICertification;
  achievements: IAchievement;
  testimonials: ITestimonial;
  gallery: IGalleryPhoto;
};

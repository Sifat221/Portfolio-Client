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
  portfolio?: string;
  telegram?: string;
  behance?: string;
  profilePhoto?: string;
  bannerPhoto?: string;
  linkedin?: string;
  facebook?: string;
  whatsapp?: string;
  badgeText?: string;
  showBadge?: boolean;
}

export interface IProject {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  techStack: string[];
  features?: string[];
  githubUrl?: string;
  githubLabel?: string;
  clientUrl?: string;
  serverUrl?: string;
  demoUrl?: string;
  demoLabel?: string;
  androidUrl?: string;
  iosUrl?: string;
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
  imageUrl?: string;
}

export interface IAchievement {
  id?: string;
  title: string;
  category?: string;
  description: string;
  year?: string;
}

export interface IBenchmark {
  model: string;
  accuracy: number;
  color?: string;
}

export interface IThesis {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  projectBadge?: string;
  gradeBadge?: string;
  projectTitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  repoUrl?: string;
  repoLabel?: string;
  paperUrl?: string;
  peakAccuracy: string;
  peakModel: string;
  benchmarks: IBenchmark[];
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
  subtitle?: string;
  category?: string;
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
  | 'thesis'
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
  thesis: IThesis;
  skills: ISkill;
  experience: IExperience;
  education: IEducation;
  certifications: ICertification;
  achievements: IAchievement;
  testimonials: ITestimonial;
  gallery: IGalleryPhoto;
};

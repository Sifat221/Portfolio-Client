import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getPersonalProfile,
  getProjects,
  getThesis,
  getSkills,
  getExperience,
  getEducation,
  getCertifications,
  getAchievements,
  getTestimonials,
  getGalleryPhotos,
  getContactMessages,
  sendContactMessage,
  readCachedJSON,
  defaultPersonal,
  defaultProjects,
  defaultThesis,
  defaultSkills,
  defaultExperience,
  defaultEducation,
  defaultCertifications,
  defaultAchievements,
  defaultTestimonials,
  defaultGalleryPhotos,
} from '../services/api';
import { IContactForm } from '../types/portfolio';

const CACHE_STALE_TIME = 1000 * 60 * 5; // 5 minutes (Admin saves invalidate immediately)

// TanStack Query Hooks with instant cached placeholderData for zero-wait initial paint
export function usePersonalProfile() {
  return useQuery({
    queryKey: ['personalProfile'],
    queryFn: getPersonalProfile,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_personal_profile', defaultPersonal),
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_projects', defaultProjects),
  });
}

export function useThesis() {
  return useQuery({
    queryKey: ['thesis'],
    queryFn: getThesis,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_thesis', defaultThesis),
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_skills', defaultSkills),
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: getExperience,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_experience', defaultExperience),
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: getEducation,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_education', defaultEducation),
  });
}

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_certifications', defaultCertifications),
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: getAchievements,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_achievements', defaultAchievements),
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => defaultTestimonials,
  });
}

export function useGalleryPhotos() {
  return useQuery({
    queryKey: ['galleryPhotos'],
    queryFn: getGalleryPhotos,
    staleTime: CACHE_STALE_TIME,
    placeholderData: () => readCachedJSON('portfolio_gallery_photos', defaultGalleryPhotos),
  });
}

export function useContactMessages() {
  return useQuery({
    queryKey: ['contactMessages'],
    queryFn: getContactMessages,
    staleTime: 0,
  });
}

// Contact Form Mutation Hook
export function useSendContactMessage() {
  return useMutation({
    mutationFn: (formData: IContactForm) => sendContactMessage(formData),
  });
}

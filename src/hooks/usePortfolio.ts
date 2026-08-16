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
  sendContactMessage
} from '../services/api';
import { IContactForm } from '../types/portfolio';

// TanStack Query Hooks for Portfolio Data
export function usePersonalProfile() {
  return useQuery({
    queryKey: ['personalProfile'],
    queryFn: getPersonalProfile,
    staleTime: 0,
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 0,
  });
}

export function useThesis() {
  return useQuery({
    queryKey: ['thesis'],
    queryFn: getThesis,
    staleTime: 0,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    staleTime: 0,
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: getExperience,
    staleTime: 0,
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: getEducation,
    staleTime: 0,
  });
}

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
    staleTime: 0,
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: getAchievements,
    staleTime: 0,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 0,
  });
}

export function useGalleryPhotos() {
  return useQuery({
    queryKey: ['galleryPhotos'],
    queryFn: getGalleryPhotos,
    staleTime: 0,
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

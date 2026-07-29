import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getPersonalProfile,
  getProjects,
  getSkills,
  getExperience,
  getEducation,
  getCertifications,
  getAchievements,
  getTestimonials,
  sendContactMessage
} from '../services/api';
import { IContactForm } from '../types/portfolio';

// TanStack Query Hooks for Portfolio Data
export function usePersonalProfile() {
  return useQuery({
    queryKey: ['personalProfile'],
    queryFn: getPersonalProfile,
    staleTime: 1000 * 5, // 5 seconds for instant reactivity
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
    staleTime: 1000 * 60 * 5,
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: getSkills,
    staleTime: 1000 * 60 * 5,
  });
}

export function useExperience() {
  return useQuery({
    queryKey: ['experience'],
    queryFn: getExperience,
    staleTime: 1000 * 60 * 5,
  });
}

export function useEducation() {
  return useQuery({
    queryKey: ['education'],
    queryFn: getEducation,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCertifications() {
  return useQuery({
    queryKey: ['certifications'],
    queryFn: getCertifications,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAchievements() {
  return useQuery({
    queryKey: ['achievements'],
    queryFn: getAchievements,
    staleTime: 1000 * 60 * 5,
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: getTestimonials,
    staleTime: 1000 * 60 * 5,
  });
}

// Contact Form Mutation Hook
export function useSendContactMessage() {
  return useMutation({
    mutationFn: (formData: IContactForm) => sendContactMessage(formData),
  });
}

import { create } from 'zustand';
import { annotations } from '../api/mockData';
import { AnnotationType } from '../types/enums';
import type { Annotation } from '../types';

interface AnnotationState {
  annotations: Annotation[];
  filter: AnnotationType | 'All';
  setFilter: (filter: AnnotationType | 'All') => void;
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (id: string, content: string) => void;
  deleteAnnotation: (id: string) => void;
}

export const useAnnotationStore = create<AnnotationState>((set) => ({
  annotations,
  filter: 'All',
  setFilter: (filter) => set({ filter }),
  addAnnotation: (annotation) =>
    set((state) => ({ annotations: [annotation, ...state.annotations] })),
  updateAnnotation: (id, content) =>
    set((state) => ({
      annotations: state.annotations.map((annotation) =>
        annotation.id === id ? { ...annotation, content } : annotation
      )
    })),
  deleteAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((annotation) => annotation.id !== id)
    }))
}));

import { create } from 'zustand';
import { annotations as seedAnnotations } from '../api/mockData';
import { AnnotationType, AnnotationStatus } from '../types/enums';
import type { Annotation } from '../types';

function ensureAnnotationStatus(annotation: Annotation): Annotation {
  if (!annotation.status) {
    return { ...annotation, status: AnnotationStatus.Pending };
  }
  return annotation;
}

const initialAnnotations = seedAnnotations.map(ensureAnnotationStatus);

interface AnnotationState {
  annotations: Annotation[];
  filter: AnnotationType | 'All';
  setFilter: (filter: AnnotationType | 'All') => void;
  addAnnotation: (annotation: Annotation) => void;
  updateAnnotation: (id: string, content: string, status?: AnnotationStatus) => void;
  deleteAnnotation: (id: string) => void;
}

export const useAnnotationStore = create<AnnotationState>((set) => ({
  annotations: initialAnnotations,
  filter: 'All',
  setFilter: (filter) => set({ filter }),
  addAnnotation: (annotation) =>
    set((state) => ({
      annotations: [ensureAnnotationStatus(annotation), ...state.annotations]
    })),
  updateAnnotation: (id, content, status) =>
    set((state) => ({
      annotations: state.annotations.map((annotation) =>
        annotation.id === id
          ? { ...annotation, content, ...(status !== undefined && { status }) }
          : annotation
      )
    })),
  deleteAnnotation: (id) =>
    set((state) => ({
      annotations: state.annotations.filter((annotation) => annotation.id !== id)
    }))
}));

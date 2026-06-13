import { create } from 'zustand';
import { sectionPlanes } from '../api/mockData';
import type { SectionPlane } from '../types';

interface SectionState {
  sections: SectionPlane[];
  toggleSection: (id: string) => void;
  setSectionConstant: (id: string, constant: number) => void;
  addSection: (section: SectionPlane) => void;
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: sectionPlanes,
  toggleSection: (id) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, active: !section.active } : section
      )
    })),
  setSectionConstant: (id, constant) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, constant } : section
      )
    })),
  addSection: (section) =>
    set((state) => ({ sections: [section, ...state.sections] }))
}));

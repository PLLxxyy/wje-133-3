import { create } from 'zustand';
import { buildingElements } from '../api/mockData';
import type { BuildingElement } from '../types';

interface ElementState {
  elements: BuildingElement[];
  selectedElementId: string | null;
  searchTerm: string;
  selectElement: (id: string | null) => void;
  setSearchTerm: (term: string) => void;
}

export const useElementStore = create<ElementState>((set) => ({
  elements: buildingElements,
  selectedElementId: buildingElements[2]?.id ?? null,
  searchTerm: '',
  selectElement: (id) => set({ selectedElementId: id }),
  setSearchTerm: (term) => set({ searchTerm: term })
}));

import { create } from 'zustand';
import { viewpointSeeds } from '../api/mockData';
import type { Viewpoint } from '../types';

interface ViewpointState {
  viewpoints: Viewpoint[];
  activeViewpointId: string;
  setActiveViewpoint: (id: string) => void;
  addViewpoint: (viewpoint: Viewpoint) => void;
  deleteViewpoint: (id: string) => void;
  setDefaultViewpoint: (id: string) => void;
}

export const useViewpointStore = create<ViewpointState>((set) => ({
  viewpoints: viewpointSeeds,
  activeViewpointId: viewpointSeeds[3].id,
  setActiveViewpoint: (id) => set({ activeViewpointId: id }),
  addViewpoint: (viewpoint) =>
    set((state) => ({ viewpoints: [viewpoint, ...state.viewpoints] })),
  deleteViewpoint: (id) =>
    set((state) => ({
      viewpoints: state.viewpoints.filter((viewpoint) => viewpoint.id !== id),
      activeViewpointId:
        state.activeViewpointId === id
          ? state.viewpoints.find((viewpoint) => viewpoint.id !== id)?.id ?? ''
          : state.activeViewpointId
    })),
  setDefaultViewpoint: (id) =>
    set((state) => ({
      viewpoints: state.viewpoints.map((viewpoint) => ({
        ...viewpoint,
        isDefault: viewpoint.id === id
      }))
    }))
}));

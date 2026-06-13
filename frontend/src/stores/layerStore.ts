import { create } from 'zustand';
import { modelLayers } from '../api/mockData';
import type { ModelLayer } from '../types';

interface LayerState {
  layers: ModelLayer[];
  focusedLayerId: string | null;
  toggleVisibility: (id: string) => void;
  setOpacity: (id: string, opacity: number) => void;
  focusLayer: (id: string) => void;
}

export const useLayerStore = create<LayerState>((set) => ({
  layers: modelLayers,
  focusedLayerId: null,
  toggleVisibility: (id) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    })),
  setOpacity: (id, opacity) =>
    set((state) => ({
      layers: state.layers.map((layer) =>
        layer.id === id ? { ...layer, opacity: Number(opacity.toFixed(2)) } : layer
      )
    })),
  focusLayer: (id) => set({ focusedLayerId: id })
}));

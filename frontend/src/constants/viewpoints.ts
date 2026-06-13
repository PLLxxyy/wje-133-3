import type { Viewpoint } from '../types/viewpoint';

const now = new Date('2026-06-12T09:00:00+08:00').toISOString();

export const DEFAULT_VIEWPOINTS: Viewpoint[] = [
  {
    id: 'vp-top',
    name: '俯视',
    cameraPosition: { x: 0, y: 28, z: 0.01 },
    target: { x: 0, y: 0, z: 0 },
    fov: 48,
    isDefault: true,
    createdAt: now
  },
  {
    id: 'vp-front',
    name: '正面',
    cameraPosition: { x: 0, y: 9, z: 24 },
    target: { x: 0, y: 3, z: 0 },
    fov: 45,
    isDefault: false,
    createdAt: now
  },
  {
    id: 'vp-side',
    name: '侧面',
    cameraPosition: { x: 25, y: 10, z: 0 },
    target: { x: 0, y: 3, z: 0 },
    fov: 45,
    isDefault: false,
    createdAt: now
  },
  {
    id: 'vp-perspective',
    name: '透视',
    cameraPosition: { x: 18, y: 14, z: 18 },
    target: { x: 0, y: 3, z: 0 },
    fov: 42,
    isDefault: false,
    createdAt: now
  }
];

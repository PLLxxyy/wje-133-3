import * as THREE from 'three';
import { ELEMENT_COLORS } from '../../constants/elementColors';
import type { BuildingElement, ModelLayer } from '../../types';

export function createElementMaterial(
  element: BuildingElement,
  layer: ModelLayer | undefined,
  selected: boolean
) {
  const baseColor = layer?.color ?? ELEMENT_COLORS[element.type];

  return new THREE.MeshStandardMaterial({
    color: selected ? '#f2c063' : baseColor,
    roughness: 0.58,
    metalness: element.material.includes('钢') || element.material.includes('铝') ? 0.22 : 0.04,
    transparent: true,
    opacity: selected ? 1 : layer?.opacity ?? 0.88
  });
}

export function createGhostMaterial(color = '#6f8a85') {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.18,
    depthWrite: false,
    side: THREE.DoubleSide
  });
}

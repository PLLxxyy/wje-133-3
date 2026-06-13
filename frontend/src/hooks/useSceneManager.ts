import { useEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ModelLayer, SectionPlane, Viewpoint } from '../types';
import { toVector3 } from '../utils/threeUtils';

interface UseSceneManagerOptions {
  activeViewpoint: Viewpoint | undefined;
  layers: ModelLayer[];
  sections: SectionPlane[];
  theme: 'light' | 'dark';
}

export function useSceneManager({
  activeViewpoint,
  layers,
  sections,
  theme
}: UseSceneManagerOptions) {
  const { camera, scene, gl } = useThree();
  const clippingPlanes = useMemo(
    () =>
      sections
        .filter((section) => section.active)
        .map((section) => new THREE.Plane(toVector3(section.normal).normalize(), section.constant)),
    [sections]
  );

  useEffect(() => {
    scene.background = new THREE.Color(theme === 'dark' ? '#17201d' : '#efe6d6');
    scene.fog = new THREE.Fog(theme === 'dark' ? '#17201d' : '#efe6d6', 24, 62);
  }, [scene, theme]);

  useEffect(() => {
    gl.localClippingEnabled = true;
    gl.clippingPlanes = clippingPlanes;
  }, [clippingPlanes, gl]);

  useEffect(() => {
    if (!activeViewpoint) {
      return;
    }
    camera.position.copy(toVector3(activeViewpoint.cameraPosition));
    if ('fov' in camera && typeof activeViewpoint.fov === 'number') {
      camera.fov = activeViewpoint.fov;
      camera.updateProjectionMatrix();
    }
  }, [activeViewpoint, camera]);

  const visibleLayerIds = useMemo(
    () => new Set(layers.filter((layer) => layer.visible).map((layer) => layer.id)),
    [layers]
  );

  return { clippingPlanes, visibleLayerIds };
}

import { useCallback, useRef } from 'react';
import * as THREE from 'three';
import { createNormalizedPointer, pickFirstIntersect } from '../utils/threeUtils';

export function useRaycaster() {
  const objectsRef = useRef<THREE.Object3D[]>([]);

  const registerObject = useCallback((object: THREE.Object3D) => {
    objectsRef.current = [...objectsRef.current, object];
    return () => {
      objectsRef.current = objectsRef.current.filter((item) => item !== object);
    };
  }, []);

  const pick = useCallback(
    (event: PointerEvent | MouseEvent, camera: THREE.Camera, bounds: DOMRect) => {
      const pointer = createNormalizedPointer(event, bounds);
      return pickFirstIntersect(pointer, camera, objectsRef.current);
    },
    []
  );

  return { registerObject, pick };
}

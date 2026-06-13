import * as THREE from 'three';

export function createNormalizedPointer(
  event: PointerEvent | MouseEvent,
  bounds: DOMRect
) {
  return new THREE.Vector2(
    ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
    -(((event.clientY - bounds.top) / bounds.height) * 2 - 1)
  );
}

export function pickFirstIntersect(
  pointer: THREE.Vector2,
  camera: THREE.Camera,
  objects: THREE.Object3D[]
) {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(pointer, camera);
  return raycaster.intersectObjects(objects, true)[0] ?? null;
}

import * as THREE from 'three';
import type { Vector3Tuple } from '../../types/element';

export function toVector3(tuple: Vector3Tuple) {
  return new THREE.Vector3(tuple.x, tuple.y, tuple.z);
}

export function formatVector(tuple: Vector3Tuple) {
  return `${tuple.x.toFixed(2)}, ${tuple.y.toFixed(2)}, ${tuple.z.toFixed(2)}`;
}

export function fromVector3(vector: THREE.Vector3): Vector3Tuple {
  return { x: vector.x, y: vector.y, z: vector.z };
}

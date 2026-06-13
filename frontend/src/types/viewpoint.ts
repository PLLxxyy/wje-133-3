import type { Vector3Tuple } from './element';

export interface Viewpoint {
  id: string;
  name: string;
  cameraPosition: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
  isDefault: boolean;
  createdAt: string;
}

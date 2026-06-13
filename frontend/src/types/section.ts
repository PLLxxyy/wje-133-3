import type { Vector3Tuple } from './element';

export interface SectionPlane {
  id: string;
  name: string;
  normal: Vector3Tuple;
  constant: number;
  active: boolean;
}

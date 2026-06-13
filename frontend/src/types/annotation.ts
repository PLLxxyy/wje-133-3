import { AnnotationType } from './enums';
import type { Vector3Tuple } from './element';

export interface Annotation {
  id: string;
  elementId: string;
  worldPosition: Vector3Tuple;
  content: string;
  type: AnnotationType;
  color: string;
  author: string;
  createdAt: string;
}

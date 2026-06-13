import { AnnotationType, AnnotationStatus } from './enums';
import type { Vector3Tuple } from './element';

export interface Annotation {
  id: string;
  elementId: string;
  worldPosition: Vector3Tuple;
  content: string;
  type: AnnotationType;
  status: AnnotationStatus;
  color: string;
  author: string;
  createdAt: string;
}

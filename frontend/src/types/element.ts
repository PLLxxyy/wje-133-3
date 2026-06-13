import { ElementType } from './enums';

export interface Vector3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface ElementDimensions {
  length: number;
  width: number;
  height: number;
}

export interface BuildingElement {
  id: string;
  layerId: string;
  name: string;
  type: ElementType;
  material: string;
  dimensions: ElementDimensions;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  properties: Record<string, string | number | boolean>;
}

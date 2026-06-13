import { ElementType } from '../types/enums';

export const ELEMENT_COLORS: Record<ElementType, string> = {
  [ElementType.Wall]: '#c9b18f',
  [ElementType.Column]: '#8aa9a5',
  [ElementType.Beam]: '#946b57',
  [ElementType.Slab]: '#a8b0a2',
  [ElementType.Door]: '#7c5139',
  [ElementType.Window]: '#6fa9c7',
  [ElementType.Other]: '#9c8f79'
};

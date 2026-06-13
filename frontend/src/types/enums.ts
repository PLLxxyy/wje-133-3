export enum ElementType {
  Wall = 'Wall',
  Column = 'Column',
  Beam = 'Beam',
  Slab = 'Slab',
  Door = 'Door',
  Window = 'Window',
  Other = 'Other'
}

export enum AnnotationType {
  Issue = 'Issue',
  Description = 'Description',
  Change = 'Change'
}

export type ThemeMode = 'light' | 'dark';

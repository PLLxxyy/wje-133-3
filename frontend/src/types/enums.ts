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

export enum AnnotationStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Resolved = 'Resolved'
}

export type ThemeMode = 'light' | 'dark';

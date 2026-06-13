import Dexie, { type Table } from 'dexie';
import type {
  Annotation,
  BuildingElement,
  ModelLayer,
  SectionPlane,
  Viewpoint
} from '../types';

export class BimViewerDatabase extends Dexie {
  layers!: Table<ModelLayer, string>;
  elements!: Table<BuildingElement, string>;
  viewpoints!: Table<Viewpoint, string>;
  annotations!: Table<Annotation, string>;
  sections!: Table<SectionPlane, string>;

  constructor() {
    super('wje-133-bim-viewer');
    this.version(1).stores({
      layers: 'id,name,visible',
      elements: 'id,layerId,type,name',
      viewpoints: 'id,name,isDefault,createdAt',
      annotations: 'id,elementId,type,createdAt',
      sections: 'id,name,active'
    });
  }
}

export const db = new BimViewerDatabase();

export async function persistCollection<T extends { id: string }>(
  table: Table<T, string>,
  items: T[],
  fallbackKey: string
) {
  try {
    await table.bulkPut(items);
  } catch (error) {
    console.warn(`IndexedDB 写入失败，已降级到 localStorage：${fallbackKey}`, error);
    window.localStorage.setItem(fallbackKey, JSON.stringify(items));
  }
}

export async function loadCollection<T>(
  table: Table<T, string>,
  fallbackKey: string,
  seed: T[]
) {
  try {
    const items = await table.toArray();
    return items.length > 0 ? items : seed;
  } catch (error) {
    console.warn(`IndexedDB 读取失败，已尝试 localStorage fallback：${fallbackKey}`, error);
    const raw = window.localStorage.getItem(fallbackKey);
    return raw ? (JSON.parse(raw) as T[]) : seed;
  }
}

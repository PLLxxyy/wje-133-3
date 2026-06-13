import { AnnotationType, ElementType } from '../types/enums';
import type {
  Annotation,
  BuildingElement,
  ModelLayer,
  SectionPlane
} from '../types';
import { DEFAULT_VIEWPOINTS } from '../constants/viewpoints';

export const modelLayers: ModelLayer[] = [
  {
    id: 'layer-foundation',
    name: '地基',
    visible: true,
    opacity: 0.78,
    elementCount: 6,
    color: '#7d6a58'
  },
  {
    id: 'layer-1f',
    name: '1F',
    visible: true,
    opacity: 0.96,
    elementCount: 14,
    color: '#b48b66'
  },
  {
    id: 'layer-2f',
    name: '2F',
    visible: true,
    opacity: 0.9,
    elementCount: 11,
    color: '#9aa57b'
  },
  {
    id: 'layer-roof',
    name: '屋顶',
    visible: true,
    opacity: 0.86,
    elementCount: 4,
    color: '#6f756f'
  },
  {
    id: 'layer-facade',
    name: '外立面',
    visible: true,
    opacity: 0.48,
    elementCount: 8,
    color: '#78a7b1'
  }
];

const baseProps = {
  fireRating: '二级',
  phase: '施工图审阅',
  discipline: '建筑'
};

export const buildingElements: BuildingElement[] = [
  {
    id: 'fd-slab-01',
    layerId: 'layer-foundation',
    name: '筏板基础 A 区',
    type: ElementType.Slab,
    material: 'C35 钢筋混凝土',
    dimensions: { length: 15.8, width: 10.2, height: 0.55 },
    position: { x: 0, y: -0.32, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, rebar: 'HRB400', pourBatch: 'F-2026-03' }
  },
  {
    id: 'fd-wall-01',
    layerId: 'layer-foundation',
    name: '地下挡土墙 北侧',
    type: ElementType.Wall,
    material: '防水混凝土',
    dimensions: { length: 16.4, width: 0.28, height: 1.4 },
    position: { x: 0, y: 0.42, z: -5.3 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, waterproof: 'P6', inspection: '需复核' }
  },
  {
    id: 'f1-wall-north',
    layerId: 'layer-1f',
    name: '一层北侧承重墙',
    type: ElementType.Wall,
    material: '加气混凝土砌块',
    dimensions: { length: 14.6, width: 0.24, height: 3.2 },
    position: { x: 0, y: 1.75, z: -4.9 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, acoustic: 'Rw45', code: 'W-1F-N' }
  },
  {
    id: 'f1-wall-south',
    layerId: 'layer-1f',
    name: '一层南侧幕墙基座',
    type: ElementType.Wall,
    material: '玻璃幕墙龙骨',
    dimensions: { length: 14.6, width: 0.22, height: 2.6 },
    position: { x: 0, y: 1.45, z: 4.9 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, mullionSpacing: '1.2m', code: 'F-GL-01' }
  },
  {
    id: 'f1-column-a1',
    layerId: 'layer-1f',
    name: '一层 A1 柱',
    type: ElementType.Column,
    material: 'C40 混凝土',
    dimensions: { length: 0.55, width: 0.55, height: 3.4 },
    position: { x: -6.6, y: 1.7, z: -4.2 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, axialForce: '820kN', code: 'C-A1' }
  },
  {
    id: 'f1-column-b3',
    layerId: 'layer-1f',
    name: '一层 B3 柱',
    type: ElementType.Column,
    material: 'C40 混凝土',
    dimensions: { length: 0.55, width: 0.55, height: 3.4 },
    position: { x: 6.6, y: 1.7, z: 4.2 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, axialForce: '790kN', code: 'C-B3' }
  },
  {
    id: 'f1-beam-main',
    layerId: 'layer-1f',
    name: '一层主梁 L1',
    type: ElementType.Beam,
    material: '预应力混凝土',
    dimensions: { length: 14.2, width: 0.42, height: 0.62 },
    position: { x: 0, y: 3.22, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, span: '14.2m', camber: '18mm' }
  },
  {
    id: 'f1-door-main',
    layerId: 'layer-1f',
    name: '主入口防火门',
    type: ElementType.Door,
    material: '钢质防火门',
    dimensions: { length: 1.6, width: 0.16, height: 2.25 },
    position: { x: -2.4, y: 1.1, z: 5.05 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, fireRating: '甲级', swing: '外开' }
  },
  {
    id: 'f1-window-east',
    layerId: 'layer-1f',
    name: '东侧采光窗组',
    type: ElementType.Window,
    material: 'Low-E 夹胶玻璃',
    dimensions: { length: 0.16, width: 3.8, height: 1.5 },
    position: { x: 7.42, y: 1.95, z: 1.4 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, uValue: '1.8W/(m²K)', openable: true }
  },
  {
    id: 'f2-slab-01',
    layerId: 'layer-2f',
    name: '二层楼板',
    type: ElementType.Slab,
    material: '叠合楼板',
    dimensions: { length: 15.2, width: 9.8, height: 0.32 },
    position: { x: 0, y: 3.55, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, topping: '80mm', code: 'SL-2F' }
  },
  {
    id: 'f2-wall-west',
    layerId: 'layer-2f',
    name: '二层西侧隔墙',
    type: ElementType.Wall,
    material: '轻钢龙骨隔墙',
    dimensions: { length: 8.6, width: 0.18, height: 2.9 },
    position: { x: -7.2, y: 4.9, z: 0 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    properties: { ...baseProps, acoustic: 'Rw42', code: 'W-2F-W' }
  },
  {
    id: 'f2-beam-east',
    layerId: 'layer-2f',
    name: '二层东侧连梁',
    type: ElementType.Beam,
    material: '钢梁 Q355B',
    dimensions: { length: 8.8, width: 0.32, height: 0.5 },
    position: { x: 7.1, y: 6.25, z: 0 },
    rotation: { x: 0, y: Math.PI / 2, z: 0 },
    properties: { ...baseProps, coating: '防火涂料 1.5h', code: 'B-2F-E' }
  },
  {
    id: 'rf-canopy',
    layerId: 'layer-roof',
    name: '屋顶雨棚',
    type: ElementType.Other,
    material: '铝镁锰板',
    dimensions: { length: 9.8, width: 4.2, height: 0.22 },
    position: { x: 0, y: 7.2, z: 3.2 },
    rotation: { x: -0.08, y: 0, z: 0 },
    properties: { ...baseProps, slope: '2%', drainage: '内排水' }
  },
  {
    id: 'facade-screen',
    layerId: 'layer-facade',
    name: '南侧外立面百叶',
    type: ElementType.Other,
    material: '阳极氧化铝',
    dimensions: { length: 15.0, width: 0.12, height: 5.8 },
    position: { x: 0, y: 3.8, z: 5.24 },
    rotation: { x: 0, y: 0, z: 0 },
    properties: { ...baseProps, spacing: '180mm', finish: '香槟色' }
  }
];

export const annotations: Annotation[] = [
  {
    id: 'ann-001',
    elementId: 'fd-wall-01',
    worldPosition: { x: -4.6, y: 1.1, z: -5.45 },
    content: '防水节点与施工图 A-203 详图不一致',
    type: AnnotationType.Issue,
    color: '#d7564b',
    author: '结构审阅组',
    createdAt: '2026-06-12T10:15:00+08:00'
  },
  {
    id: 'ann-002',
    elementId: 'f1-window-east',
    worldPosition: { x: 7.55, y: 2.7, z: 1.4 },
    content: '窗组开启扇数量已按节能反馈调整',
    type: AnnotationType.Change,
    color: '#4f8f6f',
    author: '建筑专业',
    createdAt: '2026-06-12T10:28:00+08:00'
  },
  {
    id: 'ann-003',
    elementId: 'f2-beam-east',
    worldPosition: { x: 7.1, y: 6.62, z: -1.6 },
    content: '连梁底标高需与机电桥架净高联合复核',
    type: AnnotationType.Description,
    color: '#c18a3d',
    author: 'BIM 协调员',
    createdAt: '2026-06-12T10:42:00+08:00'
  }
];

export const sectionPlanes: SectionPlane[] = [
  {
    id: 'sec-x',
    name: 'X 向中庭剖切',
    normal: { x: 1, y: 0, z: 0 },
    constant: 0,
    active: false
  },
  {
    id: 'sec-z',
    name: 'Z 向南立面剖切',
    normal: { x: 0, y: 0, z: 1 },
    constant: -1.2,
    active: true
  }
];

export const viewpointSeeds = DEFAULT_VIEWPOINTS;

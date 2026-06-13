import { Box, MapPin } from 'lucide-react';
import type { BuildingElement, ModelLayer } from '../../types';
import { formatVector } from '../../utils/threeUtils';

interface PropertyPanelProps {
  element: BuildingElement | null;
  layer?: ModelLayer;
}

export function PropertyPanel({ element, layer }: PropertyPanelProps) {
  if (!element) {
    return (
      <aside className="panel p-5">
        <p className="text-sm font-semibold text-[color:var(--text-primary)]">未选中构件</p>
        <p className="mt-2 text-sm text-[color:var(--text-muted)]">
          在 3D 模型或构件列表中选择构件后显示属性。
        </p>
      </aside>
    );
  }

  return (
    <aside className="panel p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            {element.type}
          </p>
          <h2 className="mt-1 text-xl font-semibold text-[color:var(--text-primary)]">
            {element.name}
          </h2>
        </div>
        <span
          className="inline-flex h-10 w-10 items-center justify-center border border-[color:var(--border)]"
          style={{ background: layer?.color }}
        >
          <Box className="h-5 w-5 text-white" />
        </span>
      </div>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="property-row">
          <dt>所属楼层</dt>
          <dd>{layer?.name ?? element.layerId}</dd>
        </div>
        <div className="property-row">
          <dt>材质</dt>
          <dd>{element.material}</dd>
        </div>
        <div className="property-row">
          <dt>尺寸</dt>
          <dd>
            {element.dimensions.length}m × {element.dimensions.width}m ×{' '}
            {element.dimensions.height}m
          </dd>
        </div>
        <div className="property-row">
          <dt className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> 坐标
          </dt>
          <dd>{formatVector(element.position)}</dd>
        </div>
      </dl>

      <div className="mt-5 border-t border-[color:var(--border)] pt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
          属性集
        </p>
        <dl className="mt-3 grid gap-2 text-sm">
          {Object.entries(element.properties).map(([key, value]) => (
            <div key={key} className="property-row">
              <dt>{key}</dt>
              <dd>{String(value)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}

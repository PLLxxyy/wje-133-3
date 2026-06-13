import { Camera, Check, Star, Trash2 } from 'lucide-react';
import type { Viewpoint } from '../../types';
import { formatVector } from '../../utils/threeUtils';

interface ViewpointCardProps {
  viewpoint: Viewpoint;
  active: boolean;
  onActivate: (id: string) => void;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ViewpointCard({
  viewpoint,
  active,
  onActivate,
  onSetDefault,
  onDelete
}: ViewpointCardProps) {
  return (
    <article className="panel flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
            <Camera className="h-3.5 w-3.5" /> Viewpoint
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[color:var(--text-primary)]">
            {viewpoint.name}
          </h2>
        </div>
        {viewpoint.isDefault && (
          <span className="badge">
            <Star className="h-3.5 w-3.5" /> 默认
          </span>
        )}
      </div>
      <dl className="grid gap-2 text-sm text-[color:var(--text-muted)]">
        <div className="property-row">
          <dt>相机</dt>
          <dd>{formatVector(viewpoint.cameraPosition)}</dd>
        </div>
        <div className="property-row">
          <dt>目标</dt>
          <dd>{formatVector(viewpoint.target)}</dd>
        </div>
        <div className="property-row">
          <dt>FOV</dt>
          <dd>{viewpoint.fov}°</dd>
        </div>
      </dl>
      <div className="mt-auto flex flex-wrap gap-2">
        <button className="secondary-button" onClick={() => onActivate(viewpoint.id)} type="button">
          {active ? <Check className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
          {active ? '当前视角' : '切换'}
        </button>
        <button className="ghost-button" onClick={() => onSetDefault(viewpoint.id)} type="button">
          <Star className="h-4 w-4" />
          设为默认
        </button>
        <button className="ghost-button" onClick={() => onDelete(viewpoint.id)} type="button">
          <Trash2 className="h-4 w-4" />
          删除
        </button>
      </div>
    </article>
  );
}

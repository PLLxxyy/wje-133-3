import { Eye, EyeOff, LocateFixed } from 'lucide-react';
import type { ModelLayer } from '../../types';

interface LayerTreeProps {
  layers: ModelLayer[];
  focusedLayerId: string | null;
  onToggle: (id: string) => void;
  onOpacityChange: (id: string, opacity: number) => void;
  onFocus: (id: string) => void;
}

export function LayerTree({
  layers,
  focusedLayerId,
  onToggle,
  onOpacityChange,
  onFocus
}: LayerTreeProps) {
  return (
    <div className="space-y-3">
      {layers.map((layer) => (
        <section
          key={layer.id}
          className="border border-[color:var(--border)] bg-[color:var(--surface)] p-3"
          data-focused={focusedLayerId === layer.id}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="h-3 w-3 shrink-0"
                style={{ background: layer.color }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[color:var(--text-primary)]">
                  {layer.name}
                </p>
                <p className="text-xs text-[color:var(--text-muted)]">
                  {layer.elementCount} 个构件 · 透明度 {Math.round(layer.opacity * 100)}%
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                className="icon-button"
                onClick={() => onFocus(layer.id)}
                title={`聚焦${layer.name}`}
                aria-label={`聚焦${layer.name}`}
              >
                <LocateFixed className="h-4 w-4" />
              </button>
              <button
                className="icon-button"
                onClick={() => onToggle(layer.id)}
                title={layer.visible ? `隐藏${layer.name}` : `显示${layer.name}`}
                aria-label={layer.visible ? `隐藏${layer.name}` : `显示${layer.name}`}
              >
                {layer.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <label className="mt-3 grid gap-1 text-xs text-[color:var(--text-muted)]">
            透明度
            <input
              type="range"
              min={0.15}
              max={1}
              step={0.05}
              value={layer.opacity}
              onChange={(event) => onOpacityChange(layer.id, Number(event.target.value))}
              aria-label={`${layer.name}透明度`}
            />
          </label>
        </section>
      ))}
    </div>
  );
}

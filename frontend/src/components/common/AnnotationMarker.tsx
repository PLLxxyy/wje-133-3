import { AlertTriangle, FileText, GitCommitVertical } from 'lucide-react';
import { AnnotationType, AnnotationStatus } from '../../types/enums';
import type { Annotation } from '../../types';

interface AnnotationMarkerProps {
  annotation: Annotation;
  compact?: boolean;
  onClick?: () => void;
}

const iconByType = {
  [AnnotationType.Issue]: AlertTriangle,
  [AnnotationType.Description]: FileText,
  [AnnotationType.Change]: GitCommitVertical
};

const labelByType = {
  [AnnotationType.Issue]: '问题',
  [AnnotationType.Description]: '说明',
  [AnnotationType.Change]: '变更'
};

const labelByStatus = {
  [AnnotationStatus.Pending]: '待处理',
  [AnnotationStatus.InProgress]: '处理中',
  [AnnotationStatus.Resolved]: '已解决'
};

const colorByStatus = {
  [AnnotationStatus.Pending]: '#c18a3d',
  [AnnotationStatus.InProgress]: '#4a7db8',
  [AnnotationStatus.Resolved]: '#4f8f6f'
};

export function AnnotationMarker({ annotation, compact = false, onClick }: AnnotationMarkerProps) {
  const Icon = iconByType[annotation.type];

  return (
    <button
      className="group flex w-full items-start gap-3 border border-[color:var(--border)] bg-[color:var(--surface)] p-3 text-left transition hover:border-[color:var(--accent)]"
      onClick={onClick}
      type="button"
    >
      <span
        className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center"
        style={{ background: annotation.color }}
      >
        <Icon className="h-4 w-4 text-white" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[color:var(--text-muted)]">
            {labelByType[annotation.type]} · {annotation.author}
          </span>
          <span
            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
            style={{ background: colorByStatus[annotation.status] }}
          >
            {labelByStatus[annotation.status]}
          </span>
        </span>
        <span
          className={
            compact
              ? 'line-clamp-1 text-sm font-medium text-[color:var(--text-primary)]'
              : 'text-sm font-medium text-[color:var(--text-primary)]'
          }
        >
          {annotation.content}
        </span>
      </span>
    </button>
  );
}

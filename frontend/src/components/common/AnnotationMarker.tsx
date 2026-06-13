import { AlertTriangle, FileText, GitCommitVertical } from 'lucide-react';
import { AnnotationType, AnnotationStatus } from '../../types/enums';
import type { Annotation } from '../../types';

interface AnnotationMarkerProps {
  annotation: Annotation;
  compact?: boolean;
  onClick?: () => void;
}

const iconByType: Record<AnnotationType, React.ComponentType<{ className?: string }>> = {
  [AnnotationType.Issue]: AlertTriangle,
  [AnnotationType.Description]: FileText,
  [AnnotationType.Change]: GitCommitVertical
};

const labelByType: Record<AnnotationType, string> = {
  [AnnotationType.Issue]: '问题',
  [AnnotationType.Description]: '说明',
  [AnnotationType.Change]: '变更'
};

const labelByStatus: Record<AnnotationStatus, string> = {
  [AnnotationStatus.Pending]: '待处理',
  [AnnotationStatus.InProgress]: '处理中',
  [AnnotationStatus.Resolved]: '已解决'
};

const colorByStatus: Record<AnnotationStatus, string> = {
  [AnnotationStatus.Pending]: '#c18a3d',
  [AnnotationStatus.InProgress]: '#4a7db8',
  [AnnotationStatus.Resolved]: '#4f8f6f'
};

function resolveStatus(status: AnnotationStatus | undefined): AnnotationStatus {
  switch (status) {
    case AnnotationStatus.InProgress:
    case AnnotationStatus.Resolved:
      return status;
    default:
      return AnnotationStatus.Pending;
  }
}

export function AnnotationMarker({ annotation, compact = false, onClick }: AnnotationMarkerProps) {
  const Icon = iconByType[annotation.type];
  const status = resolveStatus(annotation.status);

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
            style={{ background: colorByStatus[status] }}
          >
            {labelByStatus[status]}
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

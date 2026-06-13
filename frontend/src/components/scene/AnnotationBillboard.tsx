import { Html } from '@react-three/drei';
import type { Annotation } from '../../types';
import { AnnotationType, AnnotationStatus } from '../../types/enums';

interface AnnotationBillboardProps {
  annotation: Annotation;
  onSelect: (elementId: string) => void;
}

const shortType: Record<AnnotationType, string> = {
  [AnnotationType.Issue]: '!',
  [AnnotationType.Description]: 'i',
  [AnnotationType.Change]: '↺'
};

const statusLabel: Record<AnnotationStatus, string> = {
  [AnnotationStatus.Pending]: '待处理',
  [AnnotationStatus.InProgress]: '处理中',
  [AnnotationStatus.Resolved]: '已解决'
};

const statusColor: Record<AnnotationStatus, string> = {
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

export function AnnotationBillboard({ annotation, onSelect }: AnnotationBillboardProps) {
  const status = resolveStatus(annotation.status);
  const label = statusLabel[status];

  return (
    <Html
      position={[
        annotation.worldPosition.x,
        annotation.worldPosition.y,
        annotation.worldPosition.z
      ]}
      center
      distanceFactor={12}
      transform
    >
      <div className="flex flex-col items-center gap-1">
        <div className="relative">
          <button
            className="annotation-pin"
            style={{ background: annotation.color }}
            onClick={() => onSelect(annotation.elementId)}
            type="button"
            title={annotation.content}
          >
            {shortType[annotation.type]}
          </button>
          <span
            className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm"
            style={{ background: statusColor[status] }}
          />
        </div>
        <span
          className="whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-semibold text-white shadow-sm"
          style={{ background: statusColor[status] }}
        >
          {label}
        </span>
      </div>
    </Html>
  );
}

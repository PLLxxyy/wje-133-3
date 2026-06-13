import { Html } from '@react-three/drei';
import type { Annotation } from '../../types';
import { AnnotationType, AnnotationStatus } from '../../types/enums';

interface AnnotationBillboardProps {
  annotation: Annotation;
  onSelect: (elementId: string) => void;
}

const shortType = {
  [AnnotationType.Issue]: '!',
  [AnnotationType.Description]: 'i',
  [AnnotationType.Change]: '↺'
};

const statusDotColor = {
  [AnnotationStatus.Pending]: '#c18a3d',
  [AnnotationStatus.InProgress]: '#4a7db8',
  [AnnotationStatus.Resolved]: '#4f8f6f'
};

export function AnnotationBillboard({ annotation, onSelect }: AnnotationBillboardProps) {
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
          style={{ background: statusDotColor[annotation.status] }}
        />
      </div>
    </Html>
  );
}

import { Html } from '@react-three/drei';
import type { Annotation } from '../../types';
import { AnnotationType } from '../../types/enums';

interface AnnotationBillboardProps {
  annotation: Annotation;
  onSelect: (elementId: string) => void;
}

const shortType = {
  [AnnotationType.Issue]: '!',
  [AnnotationType.Description]: 'i',
  [AnnotationType.Change]: '↺'
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
      <button
        className="annotation-pin"
        style={{ background: annotation.color }}
        onClick={() => onSelect(annotation.elementId)}
        type="button"
        title={annotation.content}
      >
        {shortType[annotation.type]}
      </button>
    </Html>
  );
}

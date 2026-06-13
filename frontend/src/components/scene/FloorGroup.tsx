import type { BuildingElement, ModelLayer } from '../../types';
import { ElementMesh } from './ElementMesh';

interface FloorGroupProps {
  layer: ModelLayer;
  elements: BuildingElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
}

export function FloorGroup({
  layer,
  elements,
  selectedElementId,
  onSelectElement
}: FloorGroupProps) {
  if (!layer.visible) {
    return null;
  }

  return (
    <group name={`floor-${layer.id}`}>
      {elements.map((element) => (
        <ElementMesh
          key={element.id}
          element={element}
          layer={layer}
          selected={selectedElementId === element.id}
          onSelect={onSelectElement}
        />
      ))}
    </group>
  );
}

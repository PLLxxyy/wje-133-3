import { useMemo } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import type { BuildingElement, ModelLayer } from '../../types';
import { createElementMaterial } from '../../utils/threeUtils';

interface ElementMeshProps {
  element: BuildingElement;
  layer?: ModelLayer;
  selected: boolean;
  onSelect: (id: string) => void;
}

export function ElementMesh({ element, layer, selected, onSelect }: ElementMeshProps) {
  const material = useMemo(
    () => createElementMaterial(element, layer, selected),
    [element, layer, selected]
  );

  const position = useMemo(
    () => new THREE.Vector3(element.position.x, element.position.y, element.position.z),
    [element.position.x, element.position.y, element.position.z]
  );

  const rotation: [number, number, number] = [
    element.rotation.x,
    element.rotation.y,
    element.rotation.z
  ];

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(element.id);
  };

  return (
    <mesh
      name={element.id}
      position={position}
      rotation={rotation}
      castShadow
      receiveShadow
      onClick={handleClick}
      userData={{ elementId: element.id }}
    >
      <boxGeometry args={[element.dimensions.length, element.dimensions.height, element.dimensions.width]} />
      <primitive attach="material" object={material} />
      {selected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(element.dimensions.length, element.dimensions.height, element.dimensions.width)]} />
          <lineBasicMaterial color="#f6d484" linewidth={2} />
        </lineSegments>
      )}
    </mesh>
  );
}

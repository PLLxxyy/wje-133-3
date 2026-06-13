import { useMemo } from 'react';
import * as THREE from 'three';
import type { SectionPlane } from '../../types';
import { createGhostMaterial, toVector3 } from '../../utils/threeUtils';

interface SectionGizmoProps {
  sections: SectionPlane[];
}

export function SectionGizmo({ sections }: SectionGizmoProps) {
  const activeSections = sections.filter((section) => section.active);
  const material = useMemo(() => createGhostMaterial('#d0a35d'), []);

  return (
    <group name="section-gizmos">
      {activeSections.map((section) => {
        const normal = toVector3(section.normal).normalize();
        const position = normal.clone().multiplyScalar(-section.constant);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          normal
        );

        return (
          <mesh
            key={section.id}
            position={position}
            quaternion={quaternion}
            name={`section-${section.id}`}
          >
            <planeGeometry args={[18, 18, 10, 10]} />
            <primitive attach="material" object={material} />
          </mesh>
        );
      })}
    </group>
  );
}

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, ContactShadows, Grid, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import type {
  Annotation,
  BuildingElement,
  ModelLayer,
  SectionPlane,
  Viewpoint
} from '../../types';
import { useSceneManager } from '../../hooks/useSceneManager';
import { FloorGroup } from './FloorGroup';
import { AnnotationBillboard } from './AnnotationBillboard';
import { SectionGizmo } from './SectionGizmo';

interface SceneContainerProps {
  layers: ModelLayer[];
  elements: BuildingElement[];
  annotations: Annotation[];
  sections: SectionPlane[];
  selectedElementId: string | null;
  activeViewpoint?: Viewpoint;
  theme: 'light' | 'dark';
  onSelectElement: (id: string) => void;
}

function SceneContent({
  layers,
  elements,
  annotations,
  sections,
  selectedElementId,
  activeViewpoint,
  theme,
  onSelectElement
}: SceneContainerProps) {
  useSceneManager({ activeViewpoint, layers, sections, theme });

  return (
    <>
      <PerspectiveCamera makeDefault position={[18, 14, 18]} fov={42} />
      <ambientLight intensity={0.58} />
      <directionalLight
        position={[12, 18, 10]}
        intensity={2.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Grid
        args={[30, 30]}
        position={[0, -0.62, 0]}
        cellColor={theme === 'dark' ? '#40534c' : '#b5aa99'}
        sectionColor={theme === 'dark' ? '#789182' : '#8d806d'}
        fadeDistance={35}
        fadeStrength={1.4}
      />
      <Bounds fit clip observe margin={1.15}>
        {layers.map((layer) => (
          <FloorGroup
            key={layer.id}
            layer={layer}
            elements={elements.filter((element) => element.layerId === layer.id)}
            selectedElementId={selectedElementId}
            onSelectElement={onSelectElement}
          />
        ))}
        {annotations.map((annotation) => (
          <AnnotationBillboard
            key={annotation.id}
            annotation={annotation}
            onSelect={onSelectElement}
          />
        ))}
        <SectionGizmo sections={sections} />
      </Bounds>
      <ContactShadows opacity={0.25} scale={28} blur={2.8} far={12} position={[0, -0.63, 0]} />
      <OrbitControls makeDefault target={activeViewpoint ? [
        activeViewpoint.target.x,
        activeViewpoint.target.y,
        activeViewpoint.target.z
      ] : [0, 3, 0]} />
    </>
  );
}

export function SceneContainer(props: SceneContainerProps) {
  return (
    <div className="h-full min-h-[520px] overflow-hidden border border-[color:var(--border)] bg-[color:var(--scene-bg)]">
      <Canvas
        shadows
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.setClearColor(props.theme === 'dark' ? '#17201d' : '#efe6d6');
        }}
      >
        <Suspense fallback={null}>
          <SceneContent {...props} />
        </Suspense>
      </Canvas>
    </div>
  );
}

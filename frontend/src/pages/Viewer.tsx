import { Layers3, MessageSquare, PanelRight, Scissors } from 'lucide-react';
import { LayerTree } from '../components/common/LayerTree';
import { PropertyPanel } from '../components/common/PropertyPanel';
import { AnnotationMarker } from '../components/common/AnnotationMarker';
import { SceneContainer } from '../components/scene/SceneContainer';
import { useAnnotationStore } from '../stores/annotationStore';
import { useElementStore } from '../stores/elementStore';
import { useLayerStore } from '../stores/layerStore';
import { useSectionStore } from '../stores/sectionStore';
import { useThemeStore } from '../stores/themeStore';
import { useViewpointStore } from '../stores/viewpointStore';

export function Viewer() {
  const { layers, focusedLayerId, toggleVisibility, setOpacity, focusLayer } = useLayerStore();
  const { elements, selectedElementId, selectElement } = useElementStore();
  const { annotations } = useAnnotationStore();
  const { sections } = useSectionStore();
  const { theme } = useThemeStore();
  const { viewpoints, activeViewpointId } = useViewpointStore();
  const selectedElement = elements.find((element) => element.id === selectedElementId) ?? null;
  const selectedLayer = layers.find((layer) => layer.id === selectedElement?.layerId);
  const activeViewpoint = viewpoints.find((viewpoint) => viewpoint.id === activeViewpointId);
  const activeSections = sections.filter((section) => section.active);

  return (
    <div className="viewer-grid">
      <section className="panel p-4">
        <div className="section-heading">
          <Layers3 className="h-4 w-4" />
          楼层树
        </div>
        <LayerTree
          layers={layers}
          focusedLayerId={focusedLayerId}
          onToggle={toggleVisibility}
          onOpacityChange={setOpacity}
          onFocus={focusLayer}
        />
      </section>

      <section className="min-w-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="page-title">BIM 3D 主视图</h1>
            <p className="page-subtitle">
              {elements.length} 个构件 · {annotations.length} 条标注 · {activeSections.length} 个剖切激活
            </p>
          </div>
          <div className="status-strip">
            <span>
              <Scissors className="h-3.5 w-3.5" /> 剖切 {activeSections.length}
            </span>
            <span>
              <MessageSquare className="h-3.5 w-3.5" /> 标注 {annotations.length}
            </span>
          </div>
        </div>
        <SceneContainer
          layers={layers}
          elements={elements}
          annotations={annotations}
          sections={sections}
          selectedElementId={selectedElementId}
          activeViewpoint={activeViewpoint}
          theme={theme}
          onSelectElement={selectElement}
        />
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {annotations.map((annotation) => (
            <AnnotationMarker
              key={annotation.id}
              annotation={annotation}
              compact
              onClick={() => selectElement(annotation.elementId)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[color:var(--text-muted)]">
          <PanelRight className="h-4 w-4" />
          构件属性
        </div>
        <PropertyPanel element={selectedElement} layer={selectedLayer} />
      </section>
    </div>
  );
}

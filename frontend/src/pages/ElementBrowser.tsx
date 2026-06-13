import { Search } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PropertyPanel } from '../components/common/PropertyPanel';
import { EmptyState } from '../components/common/EmptyState';
import { useElementStore } from '../stores/elementStore';
import { useLayerStore } from '../stores/layerStore';

export function ElementBrowser() {
  const { elements, selectedElementId, selectElement, searchTerm, setSearchTerm } =
    useElementStore();
  const { layers } = useLayerStore();
  const selectedElement = elements.find((element) => element.id === selectedElementId) ?? null;
  const selectedLayer = layers.find((layer) => layer.id === selectedElement?.layerId);

  const grouped = useMemo(
    () =>
      layers.map((layer) => ({
        layer,
        elements: elements.filter(
          (element) =>
            element.layerId === layer.id &&
            `${element.name} ${element.type} ${element.material}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      })),
    [elements, layers, searchTerm]
  );

  const hasResult = grouped.some((group) => group.elements.length > 0);

  return (
    <div className="split-page">
      <section className="page-stack min-w-0">
        <header className="page-header">
          <div>
            <h1 className="page-title">构件浏览器</h1>
            <p className="page-subtitle">按楼层分组检索构件，定位后可跳转到 3D 主视图。</p>
          </div>
          <label className="search-box">
            <Search className="h-4 w-4" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="搜索构件、类型或材质"
              aria-label="搜索构件"
            />
          </label>
        </header>

        {!hasResult && (
          <EmptyState title="未找到构件" description="换一个构件名称、类型或材质关键词。" />
        )}

        <div className="grid gap-4">
          {grouped.map(
            (group) =>
              group.elements.length > 0 && (
                <section key={group.layer.id} className="panel p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-base font-semibold text-[color:var(--text-primary)]">
                      {group.layer.name}
                    </h2>
                    <span className="badge">{group.elements.length} 个</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    {group.elements.map((element) => (
                      <button
                        key={element.id}
                        className="element-list-item"
                        data-selected={selectedElementId === element.id}
                        onClick={() => selectElement(element.id)}
                        type="button"
                      >
                        <span>
                          <span className="block font-semibold">{element.name}</span>
                          <span className="text-xs text-[color:var(--text-muted)]">
                            {element.type} · {element.material}
                          </span>
                        </span>
                        <Link
                          className="text-xs font-semibold text-[color:var(--accent)]"
                          to="/viewer"
                          onClick={(event) => {
                            event.stopPropagation();
                            selectElement(element.id);
                          }}
                        >
                          定位
                        </Link>
                      </button>
                    ))}
                  </div>
                </section>
              )
          )}
        </div>
      </section>
      <PropertyPanel element={selectedElement} layer={selectedLayer} />
    </div>
  );
}

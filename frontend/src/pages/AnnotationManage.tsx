import { Plus } from 'lucide-react';
import { AnnotationMarker } from '../components/common/AnnotationMarker';
import { EmptyState } from '../components/common/EmptyState';
import { useAnnotationStore } from '../stores/annotationStore';
import { useElementStore } from '../stores/elementStore';
import { AnnotationType } from '../types/enums';
import type { Annotation } from '../types';

const filters: Array<AnnotationType | 'All'> = [
  'All',
  AnnotationType.Issue,
  AnnotationType.Description,
  AnnotationType.Change
];

const filterLabels: Record<AnnotationType | 'All', string> = {
  All: '全部',
  [AnnotationType.Issue]: '问题',
  [AnnotationType.Description]: '说明',
  [AnnotationType.Change]: '变更'
};

export function AnnotationManage() {
  const { annotations, filter, setFilter, addAnnotation, deleteAnnotation } =
    useAnnotationStore();
  const { elements, selectElement } = useElementStore();
  const filtered =
    filter === 'All'
      ? annotations
      : annotations.filter((annotation) => annotation.type === filter);

  const handleCreate = () => {
    const element = elements[0];
    if (!element) {
      return;
    }
    const next: Annotation = {
      id: `ann-${Date.now()}`,
      elementId: element.id,
      worldPosition: element.position,
      content: '新增协调记录，等待专业负责人确认。',
      type: AnnotationType.Description,
      color: '#bf8f46',
      author: '审阅员',
      createdAt: new Date().toISOString()
    };
    addAnnotation(next);
    selectElement(element.id);
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <h1 className="page-title">标注管理</h1>
          <p className="page-subtitle">按类型筛选 BIM 协同标注，点击条目定位关联构件。</p>
        </div>
        <button className="primary-button" onClick={handleCreate} type="button">
          <Plus className="h-4 w-4" />
          添加标注
        </button>
      </header>

      <div className="segmented-control" role="tablist" aria-label="标注类型筛选">
        {filters.map((item) => (
          <button
            key={item}
            data-active={filter === item}
            onClick={() => setFilter(item)}
            type="button"
          >
            {filterLabels[item]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="没有匹配的标注" description="切换筛选条件或添加新的协同标注。" />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((annotation) => {
            const element = elements.find((item) => item.id === annotation.elementId);
            return (
              <article key={annotation.id} className="panel p-4">
                <AnnotationMarker
                  annotation={annotation}
                  onClick={() => selectElement(annotation.elementId)}
                />
                <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                  <span className="text-[color:var(--text-muted)]">
                    关联：{element?.name ?? annotation.elementId}
                  </span>
                  <button
                    className="text-sm font-semibold text-[color:var(--danger)]"
                    onClick={() => deleteAnnotation(annotation.id)}
                    type="button"
                  >
                    删除
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

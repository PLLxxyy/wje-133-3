import { Plus, Scissors } from 'lucide-react';
import { useSectionStore } from '../stores/sectionStore';
import type { SectionPlane } from '../types';
import { formatVector } from '../utils/threeUtils';

export function SectionAnalysis() {
  const { sections, toggleSection, setSectionConstant, addSection } = useSectionStore();

  const handleCreate = () => {
    const next: SectionPlane = {
      id: `sec-${Date.now()}`,
      name: `自定义剖面 ${sections.length + 1}`,
      normal: { x: 0, y: 1, z: 0 },
      constant: -3.2,
      active: true
    };
    addSection(next);
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <h1 className="page-title">剖面分析</h1>
          <p className="page-subtitle">创建、激活和调整剖切面，辅助查看建筑内部构造。</p>
        </div>
        <button className="primary-button" onClick={handleCreate} type="button">
          <Plus className="h-4 w-4" />
          新建剖面
        </button>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <article key={section.id} className="panel p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                  <Scissors className="h-3.5 w-3.5" /> Section Plane
                </p>
                <h2 className="mt-2 text-xl font-semibold text-[color:var(--text-primary)]">
                  {section.name}
                </h2>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={section.active}
                  onChange={() => toggleSection(section.id)}
                  aria-label={`${section.name}激活状态`}
                />
                <span />
              </label>
            </div>

            <dl className="mt-5 grid gap-3 text-sm">
              <div className="property-row">
                <dt>法向量</dt>
                <dd>{formatVector(section.normal)}</dd>
              </div>
              <div className="property-row">
                <dt>距离原点</dt>
                <dd>{section.constant.toFixed(2)}</dd>
              </div>
            </dl>

            <label className="mt-5 grid gap-2 text-sm font-medium text-[color:var(--text-muted)]">
              剖切位置
              <input
                type="range"
                min={-8}
                max={8}
                step={0.1}
                value={section.constant}
                onChange={(event) => setSectionConstant(section.id, Number(event.target.value))}
              />
            </label>
          </article>
        ))}
      </div>
    </div>
  );
}
